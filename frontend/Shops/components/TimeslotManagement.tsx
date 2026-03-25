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
import OffersManagement from './OffersManagement';

interface TimeslotManagementProps {
  shopName: string;
}

export default function TimeslotManagement({ shopName }: TimeslotManagementProps) {
  const [activeTab, setActiveTab] = useState<'timeslots' | 'offers'>('timeslots');
  const [currentTimeslot, setCurrentTimeslot] = useState<Timeslot | null>(null);
  const [nextTimeslot, setNextTimeslot] = useState<Timeslot | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);

  // Form state for single timeslot
  const [duration, setDuration] = useState('10');
  const [maxOrders, setMaxOrders] = useState('10');
  const [isEnabled, setIsEnabled] = useState(true);

  // Duration options in minutes
  const durationOptions = ['5', '10', '15', '20', '30', '45', '60'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentTimeslot(getCurrentTimeslot(shopName));
    setNextTimeslot(getNextAvailableTimeslot(shopName));
  }, [shopName]);

  const handleUpdateTimeslot = () => {
    if (!duration || !maxOrders) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validate max orders
    const maxOrdersNum = parseInt(maxOrders);
    if (isNaN(maxOrdersNum) || maxOrdersNum < 1 || maxOrdersNum > 50) {
      Alert.alert('Error', 'Max orders must be between 1 and 50');
      return;
    }

    Alert.alert('Success', 'Timeslot updated successfully');
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
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

  const renderSingleTimeslot = () => {
    // For demo, create a sample current timeslot
    const sampleTimeslot: Timeslot = {
      id: '1',
      startTime: '09:00',
      endTime: '09:10',
      maxOrders: parseInt(maxOrders),
      currentOrders: 5,
      isActive: isEnabled,
      shopName
    };

    const remaining = getRemainingSlots(sampleTimeslot);
    const status = getSlotStatus(sampleTimeslot);
    const fillPercentage = (sampleTimeslot.currentOrders / sampleTimeslot.maxOrders) * 100;

    return (
      <View style={styles.modernContainer}>
        {/* Main Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusLeft}>
              <View style={[styles.statusIndicator, { backgroundColor: isEnabled ? '#4CAF50' : '#999' }]} />
              <View>
                <Text style={styles.statusTitle}>Timeslot Status</Text>
                <Text style={styles.statusSubtitle}>
                  {isEnabled ? 'Currently Active' : 'Currently Paused'}
                </Text>
              </View>
            </View>
            <View style={styles.statusRight}>
              <Text style={styles.statusText}>{isEnabled ? 'ACTIVE' : 'PAUSED'}</Text>
            </View>
          </View>

          {/* Quick Stats */}
          <View style={styles.quickStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{duration}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{maxOrders}</Text>
              <Text style={styles.statLabel}>Capacity</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{remaining}</Text>
              <Text style={styles.statLabel}>Available</Text>
            </View>
          </View>

          {/* Progress Ring */}
          <View style={styles.progressContainer}>
            <View style={styles.progressRing}>
              <View style={styles.progressCircle}>
                <Text style={styles.progressPercentage}>{Math.round(fillPercentage)}%</Text>
                <Text style={styles.progressLabel}>Filled</Text>
              </View>
              <View style={[styles.progressFill, { 
                transform: [{ rotate: `${(fillPercentage * 3.6) - 90}deg` }],
                borderColor: status.color 
              }]} />
            </View>
          </View>
        </View>

        {/* Configuration Card */}
        <View style={styles.configCard}>
          <View style={styles.configHeader}>
            <Text style={styles.configTitle}>Configuration</Text>
            {!isEditing && (
              <TouchableOpacity 
                style={styles.editIconButton}
                onPress={handleEdit}
              >
                <Text style={styles.editIconText}>✏️</Text>
              </TouchableOpacity>
            )}
          </View>

          {isEditing ? (
            <View style={styles.editForm}>
              {/* Duration Selector */}
              <View style={styles.configSection}>
                <Text style={styles.configLabel}>⏱️ Duration</Text>
                <View style={styles.durationGrid}>
                  {durationOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[styles.durationChip, duration === option && styles.durationChipActive]}
                      onPress={() => setDuration(option)}
                    >
                      <Text style={[styles.durationChipText, duration === option && styles.durationChipTextActive]}>
                        {option}m
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Capacity Input */}
              <View style={styles.configSection}>
                <Text style={styles.configLabel}>📊 Max Orders</Text>
                <View style={styles.capacityInputContainer}>
                  <TextInput
                    style={styles.capacityInput}
                    value={maxOrders}
                    onChangeText={setMaxOrders}
                    placeholder="Enter capacity"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    maxLength={2}
                  />
                  <Text style={styles.capacitySuffix}>orders</Text>
                </View>
              </View>

              {/* Toggle Switch */}
              <View style={styles.configSection}>
                <View style={styles.toggleRow}>
                  <View style={styles.toggleInfo}>
                    <Text style={styles.toggleTitle}>Enable Timeslot</Text>
                    <Text style={styles.toggleSubtitle}>
                      {isEnabled ? 'Customers can place orders' : 'Timeslot is disabled'}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={[styles.modernToggle, isEnabled && styles.modernToggleActive]}
                    onPress={() => setIsEnabled(!isEnabled)}
                  >
                    <View style={[styles.modernToggleKnob, isEnabled && styles.modernToggleKnobActive]} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={handleCancelEdit}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.saveButton}
                  onPress={handleUpdateTimeslot}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.configDisplay}>
              <View style={styles.configRow}>
                <Text style={styles.configDisplayLabel}>Duration</Text>
                <Text style={styles.configDisplayValue}>{duration} minutes</Text>
              </View>
              <View style={styles.configRow}>
                <Text style={styles.configDisplayLabel}>Max Orders</Text>
                <Text style={styles.configDisplayValue}>{maxOrders} orders</Text>
              </View>
              <View style={styles.configRow}>
                <Text style={styles.configDisplayLabel}>Status</Text>
                <View style={[styles.statusChip, { backgroundColor: isEnabled ? '#4CAF50' : '#999' }]}>
                  <Text style={styles.statusChipText}>{isEnabled ? 'Enabled' : 'Disabled'}</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'timeslots' && styles.activeTab]}
          onPress={() => setActiveTab('timeslots')}
        >
          <Text style={[styles.tabText, activeTab === 'timeslots' && styles.activeTabText]}>
            ⏰ Timeslots
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'offers' && styles.activeTab]}
          onPress={() => setActiveTab('offers')}
        >
          <Text style={[styles.tabText, activeTab === 'offers' && styles.activeTabText]}>
            🎉 Offers
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === 'timeslots' ? (
        <ScrollView style={styles.content} contentContainerStyle={styles.timeslotContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.title}>⏰ Timeslot Management</Text>
              <Text style={styles.subtitle}>Configure your single timeslot settings</Text>
            </View>
          </View>

          {/* Single Timeslot Card */}
          {renderSingleTimeslot()}
        </ScrollView>
      ) : (
        <OffersManagement shopName={shopName} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#FF6B35',
    backgroundColor: '#fff8f8',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#FF6B35',
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  timeslotContent: {
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
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginTop: 4,
  },

  // Modern Container
  modernContainer: {
    gap: 20,
  },

  // Status Card
  statusCard: {
    backgroundColor: '#b1856dff',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 6,
  },
  statusTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 1,
  },
  statusSubtitle: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.8)',
  },
  statusRight: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#fff',
  },

  // Quick Stats
  quickStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 8,
    marginBottom: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 8,
  },

  // Progress Ring
  progressContainer: {
    alignItems: 'center',
  },
  progressRing: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: '800',
    color: '#fff',
  },
  progressLabel: {
    fontSize: 7,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  progressFill: {
    position: 'absolute',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 4,
    borderColor: '#4CAF50',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  },

  // Configuration Card
  configCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  configHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  configTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  editIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconText: {
    fontSize: 16,
  },

  // Edit Form
  editForm: {
    gap: 24,
  },
  configSection: {
    gap: 12,
  },
  configLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },

  // Duration Grid
  durationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  durationChip: {
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  durationChipActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  durationChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  durationChipTextActive: {
    color: '#fff',
  },

  // Capacity Input
  capacityInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e9ecef',
    paddingHorizontal: 16,
  },
  capacityInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  capacitySuffix: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },

  // Modern Toggle
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleInfo: {
    flex: 1,
    marginRight: 16,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  toggleSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  modernToggle: {
    width: 56,
    height: 32,
    backgroundColor: '#e9ecef',
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  modernToggleActive: {
    backgroundColor: '#4CAF50',
  },
  modernToggleKnob: {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  modernToggleKnobActive: {
    alignSelf: 'flex-end',
  },

  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: '#e9ecef',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },

  // Config Display
  configDisplay: {
    gap: 16,
  },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  configDisplayLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  configDisplayValue: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
});
