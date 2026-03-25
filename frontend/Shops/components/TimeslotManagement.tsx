import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Modal, TextInput } from 'react-native';
import { 
  getTimeslotsForShop, 
  getCurrentTimeslot, 
  getNextAvailableTimeslot, 
  getTimeUntilNextTimeslot,
  addTimeslot,
  updateTimeslotConfig,
  deleteTimeslot,
  Timeslot 
} from '../../timeslotStore';

interface TimeslotManagementProps {
  shopName: string;
}

export default function TimeslotManagement({ shopName }: TimeslotManagementProps) {
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
  const [currentTimeslot, setCurrentTimeslot] = useState<Timeslot | null>(null);
  const [nextTimeslot, setNextTimeslot] = useState<Timeslot | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTimeslot, setEditingTimeslot] = useState<Timeslot | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Form state
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [maxOrders, setMaxOrders] = useState('10');

  // Helper function to format time input
  const formatTimeInput = (input: string): string => {
    // Remove any non-digit characters
    let cleaned = input.replace(/\D/g, '');
    
    // Limit to 4 digits (HHMM)
    if (cleaned.length > 4) {
      cleaned = cleaned.slice(0, 4);
    }
    
    // Format as HH:MM
    if (cleaned.length >= 3) {
      const hours = cleaned.slice(0, 2);
      const minutes = cleaned.slice(2, 4);
      return `${hours}:${minutes}`;
    } else if (cleaned.length === 2) {
      return `${cleaned}:`;
    }
    
    return cleaned;
  };

  const handleStartTimeChange = (text: string) => {
    const formatted = formatTimeInput(text);
    setStartTime(formatted);
  };

  const handleEndTimeChange = (text: string) => {
    const formatted = formatTimeInput(text);
    setEndTime(formatted);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const shopTimeslots = getTimeslotsForShop(shopName);
    setTimeslots(shopTimeslots);
    setCurrentTimeslot(getCurrentTimeslot(shopName));
    setNextTimeslot(getNextAvailableTimeslot(shopName));
  }, [shopName]);

  const handleAddTimeslot = () => {
    if (!startTime || !endTime || !maxOrders) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validate time format (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      Alert.alert('Error', 'Please enter time in HH:MM format (e.g., 09:00)');
      return;
    }

    // Validate max orders
    const maxOrdersNum = parseInt(maxOrders);
    if (isNaN(maxOrdersNum) || maxOrdersNum < 1 || maxOrdersNum > 50) {
      Alert.alert('Error', 'Max orders must be between 1 and 50');
      return;
    }

    const success = addTimeslot(shopName, {
      startTime,
      endTime,
      maxOrders: maxOrdersNum,
      currentOrders: 0,
      isActive: true,
      shopName
    });

    if (success) {
      Alert.alert('Success', 'Timeslot added successfully');
      setTimeslots(getTimeslotsForShop(shopName));
      resetForm();
      setShowAddModal(false);
    } else {
      Alert.alert('Error', 'Failed to add timeslot');
    }
  };

  const handleUpdateTimeslot = () => {
    if (!editingTimeslot || !startTime || !endTime || !maxOrders) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validate time format (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      Alert.alert('Error', 'Please enter time in HH:MM format (e.g., 09:00)');
      return;
    }

    // Validate max orders
    const maxOrdersNum = parseInt(maxOrders);
    if (isNaN(maxOrdersNum) || maxOrdersNum < 1 || maxOrdersNum > 50) {
      Alert.alert('Error', 'Max orders must be between 1 and 50');
      return;
    }

    const success = updateTimeslotConfig(shopName, editingTimeslot.id, {
      startTime,
      endTime,
      maxOrders: maxOrdersNum,
      isActive: true
    });

    if (success) {
      Alert.alert('Success', 'Timeslot updated successfully');
      setTimeslots(getTimeslotsForShop(shopName));
      resetForm();
      setEditingTimeslot(null);
    } else {
      Alert.alert('Error', 'Failed to update timeslot');
    }
  };

  const handleDeleteTimeslot = (timeslotId: string) => {
    Alert.alert(
      'Delete Timeslot',
      'Are you sure you want to delete this timeslot?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const success = deleteTimeslot(shopName, timeslotId);
            if (success) {
              Alert.alert('Success', 'Timeslot deleted successfully');
              setTimeslots(getTimeslotsForShop(shopName));
            } else {
              Alert.alert('Error', 'Failed to delete timeslot');
            }
          },
        },
      ]
    );
  };

  const resetForm = () => {
    setStartTime('');
    setEndTime('');
    setMaxOrders('10');
  };

  const openEditModal = (timeslot: Timeslot) => {
    setEditingTimeslot(timeslot);
    setStartTime(timeslot.startTime);
    setEndTime(timeslot.endTime);
    setMaxOrders(timeslot.maxOrders.toString());
  };

  const getRemainingSlots = (timeslot: Timeslot) => {
    return Math.max(0, timeslot.maxOrders - timeslot.currentOrders);
  };

  const getSlotStatus = (timeslot: Timeslot) => {
    const remaining = getRemainingSlots(timeslot);
    if (remaining === 0) return { text: 'Full', color: '#dc3545' };
    if (remaining <= 2) return { text: 'Filling Fast', color: '#ff9800' };
    return { text: 'Available', color: '#28a745' };
  };

  const renderTimeslotCard = (timeslot: Timeslot) => {
    const remaining = getRemainingSlots(timeslot);
    const status = getSlotStatus(timeslot);
    const isCurrent = currentTimeslot?.id === timeslot.id;
    const isNext = nextTimeslot?.id === timeslot.id;
    const fillPercentage = (timeslot.currentOrders / timeslot.maxOrders) * 100;

    return (
      <View key={timeslot.id} style={[styles.timeslotCard, isCurrent && styles.currentTimeslot]}>
        {/* Header with Status */}
        <View style={styles.cardHeader}>
          <View style={styles.timeInfo}>
            <Text style={styles.timeText}>{timeslot.startTime}</Text>
            <Text style={styles.timeSeparator}>→</Text>
            <Text style={styles.timeText}>{timeslot.endTime}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: status.color }]}>
            <Text style={styles.statusText}>{status.text}</Text>
          </View>
        </View>

        {/* Live/Next Indicators */}
        {isCurrent && (
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>🔴 LIVE NOW</Text>
          </View>
        )}
        {isNext && !isCurrent && (
          <View style={styles.nextIndicator}>
            <Text style={styles.nextText}>⏰ NEXT SLOT</Text>
          </View>
        )}

        {/* Capacity Visualization */}
        <View style={styles.capacitySection}>
          <View style={styles.capacityHeader}>
            <Text style={styles.capacityText}>Capacity</Text>
            <Text style={styles.capacityNumbers}>{remaining}/{timeslot.maxOrders} slots</Text>
          </View>
          <View style={styles.capacityBar}>
            <View style={[styles.capacityFill, { width: `${fillPercentage}%`, backgroundColor: status.color }]} />
          </View>
          <Text style={styles.capacityPercentage}>{Math.round(fillPercentage)}% filled</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{timeslot.currentOrders}</Text>
            <Text style={styles.statLabel}>Current</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{remaining}</Text>
            <Text style={styles.statLabel}>Available</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{timeslot.maxOrders}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.editButton]}
            onPress={() => openEditModal(timeslot)}
          >
            <Text style={styles.editButtonText}>✏️ Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDeleteTimeslot(timeslot.id)}
          >
            <Text style={styles.deleteButtonText}>🗑️ Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderAddModal = () => (
    <Modal visible={showAddModal || editingTimeslot !== null} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {editingTimeslot ? '✏️ Edit Timeslot' : '➕ Add New Timeslot'}
            </Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => {
                setShowAddModal(false);
                setEditingTimeslot(null);
                resetForm();
              }}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionLabel}>⏰ Time Settings</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Start Time</Text>
              <Text style={styles.inputHint}>Type: 0900 → auto-formats to 09:00</Text>
              <TextInput
                style={styles.timeInputEditable}
                value={startTime}
                onChangeText={handleStartTimeChange}
                placeholder="09:00"
                placeholderTextColor="#999"
                maxLength={5} // HH:MM format
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>End Time</Text>
              <Text style={styles.inputHint}>Type: 0930 → auto-formats to 09:30</Text>
              <TextInput
                style={styles.timeInputEditable}
                value={endTime}
                onChangeText={handleEndTimeChange}
                placeholder="09:30"
                placeholderTextColor="#999"
                maxLength={5} // HH:MM format
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>📊 Max Orders</Text>
              <Text style={styles.inputHint}>Maximum orders per slot (1-50)</Text>
              <TextInput
                style={styles.timeInputEditable}
                value={maxOrders}
                onChangeText={setMaxOrders}
                placeholder="10"
                placeholderTextColor="#999"
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => {
                setShowAddModal(false);
                setEditingTimeslot(null);
                resetForm();
              }}
            >
              <Text style={styles.cancelButtonText}>❌ Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.saveButton]}
              onPress={editingTimeslot ? handleUpdateTimeslot : handleAddTimeslot}
            >
              <Text style={styles.saveButtonText}>
                {editingTimeslot ? '💾 Update' : '✅ Add'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Enhanced Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>⏰ Timeslot Management</Text>
          <Text style={styles.subtitle}>Manage your queue slots efficiently</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => {
            resetForm();
            setShowAddModal(true);
          }}
        >
          <Text style={styles.addButtonText}>➕ Add Slot</Text>
        </TouchableOpacity>
      </View>

      {/* Enhanced Current Status */}
      {currentTimeslot && (
        <View style={[styles.statusCard, styles.currentStatusCard]}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusTitle}>🔴 Current Timeslot</Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveBadgeText}>LIVE</Text>
            </View>
          </View>
          <View style={styles.statusDetails}>
            <Text style={styles.statusTime}>
              {currentTimeslot.startTime} - {currentTimeslot.endTime}
            </Text>
            <View style={styles.statusRow}>
              <Text style={styles.statusOrders}>
                {currentTimeslot.currentOrders}/{currentTimeslot.maxOrders} orders
              </Text>
              <Text style={styles.statusRemaining}>
                {getRemainingSlots(currentTimeslot)} slots left
              </Text>
            </View>
            <View style={styles.miniProgress}>
              <View style={styles.miniProgressBar}>
                <View 
                  style={[
                    styles.miniProgressFill, 
                    { 
                      width: `${(currentTimeslot.currentOrders / currentTimeslot.maxOrders) * 100}%`,
                      backgroundColor: getRemainingSlots(currentTimeslot) <= 2 ? '#ff9800' : '#4CAF50'
                    }
                  ]} 
                />
              </View>
              <Text style={styles.miniProgressText}>
                {Math.round((currentTimeslot.currentOrders / currentTimeslot.maxOrders) * 100)}% filled
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Enhanced Next Timeslot */}
      {nextTimeslot && !currentTimeslot && (
        <View style={[styles.statusCard, styles.nextStatusCard]}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusTitle}>⏰ Next Available Timeslot</Text>
            <View style={styles.nextBadge}>
              <Text style={styles.nextBadgeText}>NEXT</Text>
            </View>
          </View>
          <View style={styles.statusDetails}>
            <Text style={styles.statusTime}>
              {nextTimeslot.startTime} - {nextTimeslot.endTime}
            </Text>
            <View style={styles.statusRow}>
              <Text style={styles.statusOrders}>
                {getRemainingSlots(nextTimeslot)} slots available
              </Text>
            </View>
            <Text style={styles.statusTime}>
              {getTimeUntilNextTimeslot(shopName)}
            </Text>
          </View>
        </View>
      )}

      {/* Timeslots List */}
      <View style={styles.timeslotsContainer}>
        <Text style={styles.sectionTitle}>All Timeslots</Text>
        {timeslots.map(renderTimeslotCard)}
      </View>

      {/* Add/Edit Modal */}
      {renderAddModal()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    left: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  // Status Cards
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  currentStatusCard: {
    borderLeftColor: '#dc3545',
    backgroundColor: '#fff8f8',
  },
  nextStatusCard: {
    borderLeftColor: '#1976d2',
    backgroundColor: '#f8f9ff',
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc3545',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 4,
  },
  nextBadge: {
    backgroundColor: '#1976d2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  nextBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  miniProgress: {
    marginTop: 8,
  },
  miniProgressBar: {
    height: 6,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  miniProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  miniProgressText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  statusDetails: {
    gap: 6,
  },
  statusTime: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  statusOrders: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  statusRemaining: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '700',
  },

  // Timeslots Container
  timeslotsContainer: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 20,
  },

  // Enhanced Timeslot Card
  timeslotCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  currentTimeslot: {
    borderLeftWidth: 4,
    borderLeftColor: '#dc3545',
    backgroundColor: '#fff8f8',
  },
  
  // Card Header
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  timeSeparator: {
    fontSize: 20,
    fontWeight: '800',
    color: '#999',
    marginHorizontal: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },

  // Live/Next Indicators
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#dc3545',
    marginRight: 8,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#dc3545',
  },
  nextIndicator: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  nextText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1976d2',
  },

  // Capacity Section
  capacitySection: {
    marginBottom: 16,
  },
  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  capacityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  capacityNumbers: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  capacityBar: {
    height: 12,
    backgroundColor: '#e9ecef',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 6,
  },
  capacityFill: {
    height: '100%',
    borderRadius: 6,
  },
  capacityPercentage: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },

  // Stats Row
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },

  // Action Buttons
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#e3f2fd',
    borderWidth: 1,
    borderColor: '#1976d2',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1976d2',
  },
  deleteButton: {
    backgroundColor: '#ffebee',
    borderWidth: 1,
    borderColor: '#dc3545',
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#dc3545',
  },

  // Enhanced Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 0,
    width: '90%',
    maxWidth: 450,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#666',
  },
  formSection: {
    padding: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  inputHint: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  timeInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  timeInputText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  timeInputEditable: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e9ecef',
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
});
