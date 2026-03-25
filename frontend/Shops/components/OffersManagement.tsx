import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Modal, TextInput, Image } from 'react-native';

interface Offer {
  id: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  validity: string;
  applicableSlots: number;
  applicableItems: number;
  imageUri?: string;
  isActive: boolean;
  createdAt: string;
}

interface OffersManagementProps {
  shopName: string;
}

export default function OffersManagement({ shopName }: OffersManagementProps) {
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: '1',
      title: 'Happy Hour Discount',
      description: 'Get 20% off on all items during evening hours',
      discountType: 'percentage',
      discountValue: 20,
      minOrderAmount: 100,
      maxDiscountAmount: 50,
      validity: '30',
      applicableSlots: 5,
      applicableItems: 0,
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Weekend Special',
      description: 'Flat ₹50 off on orders above ₹200',
      discountType: 'fixed',
      discountValue: 50,
      minOrderAmount: 200,
      validity: '15',
      applicableSlots: 10,
      applicableItems: 0,
      isActive: true,
      createdAt: '2024-01-10'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [minOrderAmount, setMinOrderAmount] = useState('');
  const [maxDiscountAmount, setMaxDiscountAmount] = useState('');
  const [validity, setValidity] = useState('');
  const [applicableSlots, setApplicableSlots] = useState('');
  const [applicableItems, setApplicableItems] = useState('');

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDiscountType('percentage');
    setDiscountValue('');
    setMinOrderAmount('');
    setMaxDiscountAmount('');
    setValidity('');
    setApplicableSlots('');
    setApplicableItems('');
    setSelectedImage(null);
  };

  const handleAddOffer = () => {
    if (!title || !description || !discountValue || !validity) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const newOffer: Offer = {
      id: Date.now().toString(),
      title,
      description,
      discountType,
      discountValue: parseInt(discountValue),
      minOrderAmount: minOrderAmount ? parseInt(minOrderAmount) : undefined,
      maxDiscountAmount: maxDiscountAmount ? parseInt(maxDiscountAmount) : undefined,
      validity,
      applicableSlots: parseInt(applicableSlots) || 0,
      applicableItems: parseInt(applicableItems) || 0,
      imageUri: selectedImage || undefined,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setOffers([...offers, newOffer]);
    Alert.alert('Success', 'Offer added successfully');
    resetForm();
    setShowAddModal(false);
  };

  const handleUpdateOffer = () => {
    if (!editingOffer || !title || !description || !discountValue || !validity) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const updatedOffers = offers.map(offer => 
      offer.id === editingOffer.id 
        ? {
            ...offer,
            title,
            description,
            discountType,
            discountValue: parseInt(discountValue),
            minOrderAmount: minOrderAmount ? parseInt(minOrderAmount) : undefined,
            maxDiscountAmount: maxDiscountAmount ? parseInt(maxDiscountAmount) : undefined,
            validity,
            applicableSlots: parseInt(applicableSlots) || 0,
            applicableItems: parseInt(applicableItems) || 0,
            imageUri: selectedImage || offer.imageUri,
          }
        : offer
    );

    setOffers(updatedOffers);
    Alert.alert('Success', 'Offer updated successfully');
    resetForm();
    setEditingOffer(null);
  };

  const handleDeleteOffer = (offerId: string) => {
    Alert.alert(
      'Delete Offer',
      'Are you sure you want to delete this offer?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setOffers(offers.filter(offer => offer.id !== offerId));
            Alert.alert('Success', 'Offer deleted successfully');
          },
        },
      ]
    );
  };

  const toggleOfferStatus = (offerId: string) => {
    const updatedOffers = offers.map(offer =>
      offer.id === offerId ? { ...offer, isActive: !offer.isActive } : offer
    );
    setOffers(updatedOffers);
  };

  const openEditModal = (offer: Offer) => {
    setEditingOffer(offer);
    setTitle(offer.title);
    setDescription(offer.description);
    setDiscountType(offer.discountType);
    setDiscountValue(offer.discountValue.toString());
    setMinOrderAmount(offer.minOrderAmount?.toString() || '');
    setMaxDiscountAmount(offer.maxDiscountAmount?.toString() || '');
    setValidity(offer.validity);
    setApplicableSlots(offer.applicableSlots.toString());
    setApplicableItems(offer.applicableItems.toString());
    setSelectedImage(offer.imageUri || null);
  };

  const handleImageSelect = () => {
    // In a real app, this would open image picker
    Alert.alert('Image Selection', 'Image picker would open here. For demo, using placeholder.');
    setSelectedImage('https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Offer+Image');
  };

  const renderOfferCard = (offer: Offer) => (
    <View key={offer.id} style={[styles.offerCard, !offer.isActive && styles.inactiveOffer]}>
      {/* Offer Header */}
      <View style={styles.offerHeader}>
        <View style={styles.offerTitleSection}>
          <Text style={styles.offerTitle}>{offer.title}</Text>
          <Text style={styles.offerDate}>Created: {offer.createdAt}</Text>
        </View>
        <View style={styles.offerStatus}>
          <TouchableOpacity 
            style={[styles.statusToggle, offer.isActive ? styles.activeToggle : styles.inactiveToggle]}
            onPress={() => toggleOfferStatus(offer.id)}
          >
            <Text style={[styles.statusText, offer.isActive ? styles.activeText : styles.inactiveText]}>
              {offer.isActive ? 'ACTIVE' : 'INACTIVE'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Offer Image */}
      {offer.imageUri && (
        <Image source={{ uri: offer.imageUri }} style={styles.offerImage} />
      )}

      {/* Offer Description */}
      <Text style={styles.offerDescription}>{offer.description}</Text>

      {/* Discount Details */}
      <View style={styles.discountSection}>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            {offer.discountType === 'percentage' ? `${offer.discountValue}% OFF` : `₹${offer.discountValue} OFF`}
          </Text>
        </View>
        {offer.minOrderAmount && (
          <Text style={styles.minOrderText}>Min order: ₹{offer.minOrderAmount}</Text>
        )}
        {offer.maxDiscountAmount && (
          <Text style={styles.maxDiscountText}>Max discount: ₹{offer.maxDiscountAmount}</Text>
        )}
      </View>

      {/* Validity and Applicability */}
      <View style={styles.validitySection}>
        <View style={styles.validityRow}>
          <Text style={styles.validityLabel}>📅 Validity:</Text>
          <Text style={styles.validityValue}>{offer.validity} days</Text>
        </View>
        <View style={styles.validityRow}>
          <Text style={styles.validityLabel}>⏰ Applicable Slots:</Text>
          <Text style={styles.validityValue}>
            {offer.applicableSlots === 0 ? 'All slots' : `${offer.applicableSlots} slots`}
          </Text>
        </View>
        <View style={styles.validityRow}>
          <Text style={styles.validityLabel}>🍔 Applicable Items:</Text>
          <Text style={styles.validityValue}>
            {offer.applicableItems === 0 ? 'All items' : `${offer.applicableItems} items`}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.offerActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={() => openEditModal(offer)}
        >
          <Text style={styles.editButtonText}>✏️ Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteOffer(offer.id)}
        >
          <Text style={styles.deleteButtonText}>🗑️ Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAddModal = () => (
    <Modal visible={showAddModal || editingOffer !== null} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {editingOffer ? '✏️ Edit Offer' : '➕ Add New Offer'}
            </Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => {
                setShowAddModal(false);
                setEditingOffer(null);
                resetForm();
              }}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formScroll}>
            <View style={styles.formSection}>
              <Text style={styles.sectionLabel}>🎯 Basic Information</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Offer Title *</Text>
                <TextInput
                  style={styles.textInput}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="e.g., Happy Hour Discount"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Description *</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Describe your offer..."
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Offer Image</Text>
                <TouchableOpacity style={styles.imageUploadButton} onPress={handleImageSelect}>
                  {selectedImage ? (
                    <Image source={{ uri: selectedImage }} style={styles.previewImage} />
                  ) : (
                    <View style={styles.imagePlaceholder}>
                      <Text style={styles.imagePlaceholderText}>📷 Add Image</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.formSection}>
              <Text style={styles.sectionLabel}>💰 Discount Details</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Discount Type</Text>
                <View style={styles.discountTypeRow}>
                  <TouchableOpacity 
                    style={[styles.discountTypeButton, discountType === 'percentage' && styles.selectedDiscountType]}
                    onPress={() => setDiscountType('percentage')}
                  >
                    <Text style={[styles.discountTypeText, discountType === 'percentage' && styles.selectedDiscountTypeText]}>
                      Percentage %
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.discountTypeButton, discountType === 'fixed' && styles.selectedDiscountType]}
                    onPress={() => setDiscountType('fixed')}
                  >
                    <Text style={[styles.discountTypeText, discountType === 'fixed' && styles.selectedDiscountTypeText]}>
                      Fixed Amount ₹
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  Discount Value * ({discountType === 'percentage' ? '%' : '₹'})
                </Text>
                <TextInput
                  style={styles.textInput}
                  value={discountValue}
                  onChangeText={setDiscountValue}
                  placeholder={discountType === 'percentage' ? 'e.g., 20' : 'e.g., 50'}
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Minimum Order Amount (₹)</Text>
                <TextInput
                  style={styles.textInput}
                  value={minOrderAmount}
                  onChangeText={setMinOrderAmount}
                  placeholder="e.g., 100"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>

              {discountType === 'percentage' && (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Maximum Discount Amount (₹)</Text>
                  <TextInput
                    style={styles.textInput}
                    value={maxDiscountAmount}
                    onChangeText={setMaxDiscountAmount}
                    placeholder="e.g., 50"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                  />
                </View>
              )}
            </View>

            <View style={styles.formSection}>
              <Text style={styles.sectionLabel}>⚙️ Offer Settings</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Validity (days) *</Text>
                <TextInput
                  style={styles.textInput}
                  value={validity}
                  onChangeText={setValidity}
                  placeholder="e.g., 30"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Applicable Slots (0 = all slots)</Text>
                <TextInput
                  style={styles.textInput}
                  value={applicableSlots}
                  onChangeText={setApplicableSlots}
                  placeholder="e.g., 5"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Applicable Items (0 = all items)</Text>
                <TextInput
                  style={styles.textInput}
                  value={applicableItems}
                  onChangeText={setApplicableItems}
                  placeholder="e.g., 10"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => {
                setShowAddModal(false);
                setEditingOffer(null);
                resetForm();
              }}
            >
              <Text style={styles.cancelButtonText}>❌ Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.saveButton]}
              onPress={editingOffer ? handleUpdateOffer : handleAddOffer}
            >
              <Text style={styles.saveButtonText}>
                {editingOffer ? '💾 Update' : '✅ Add'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>🎉 Offers & Discounts</Text>
          <Text style={styles.subtitle}>Manage your promotional offers</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => {
            resetForm();
            setShowAddModal(true);
          }}
        >
          <Text style={styles.addButtonText}>➕ Add Offer</Text>
        </TouchableOpacity>
      </View>

      {/* Offers List */}
      <ScrollView style={styles.offersList} showsVerticalScrollIndicator={false}>
        {offers.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No offers created yet</Text>
            <Text style={styles.emptyStateSubtext}>Create your first offer to attract customers!</Text>
          </View>
        ) : (
          offers.map(renderOfferCard)
        )}
      </ScrollView>

      {/* Add/Edit Modal */}
      {renderAddModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingTop: 16,
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
    backgroundColor: '#FF6B35',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  // Offers List
  offersList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },

  // Offer Card
  offerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  inactiveOffer: {
    opacity: 0.6,
    backgroundColor: '#f8f9fa',
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  offerTitleSection: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  offerDate: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  offerStatus: {
    marginLeft: 16,
  },
  statusToggle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeToggle: {
    backgroundColor: '#4CAF50',
  },
  inactiveToggle: {
    backgroundColor: '#999',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  activeText: {
    color: '#fff',
  },
  inactiveText: {
    color: '#fff',
  },
  offerImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  offerDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  discountSection: {
    marginBottom: 16,
  },
  discountBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  discountText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  minOrderText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  maxDiscountText: {
    fontSize: 12,
    color: '#666',
  },
  validitySection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  validityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  validityLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  validityValue: {
    fontSize: 12,
    color: '#1a1a1a',
    fontWeight: '700',
  },
  offerActions: {
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

  // Modal
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
    width: '95%',
    maxHeight: '90%',
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
  formScroll: {
    flex: 1,
  },
  formSection: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
  textInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e9ecef',
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  imageUploadButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    backgroundColor: '#f8f9fa',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 12,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
  },
  discountTypeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  discountTypeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: '#e9ecef',
    alignItems: 'center',
  },
  selectedDiscountType: {
    backgroundColor: '#e3f2fd',
    borderColor: '#1976d2',
  },
  discountTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  selectedDiscountTypeText: {
    color: '#1976d2',
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
