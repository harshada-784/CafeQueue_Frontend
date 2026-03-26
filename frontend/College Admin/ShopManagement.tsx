import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Text as GlobalText } from '../components/GlobalComponents';
import { shopManagementStyles as styles } from '../../css style/ShopManagement.styles';

interface Shop {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  shopId: string;
  isActive: boolean;
  establishedDate: string;
  category: string;
}

interface Props {
  shops: Shop[];
  onBack: () => void;
  onAddShop: (shop: Shop) => void;
  onEditShop: (shop: Shop) => void;
  onDeleteShop: (shopId: string) => void;
  onToggleShopStatus: (shopId: string) => void;
  onViewChange?: (isFormMode: boolean) => void;
}

export default function ShopManagement({ shops, onBack, onAddShop, onEditShop, onDeleteShop, onToggleShopStatus, onViewChange }: Props) {
  const [currentView, setCurrentView] = useState<'list' | 'add' | 'edit'>('list');
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  // Notify parent when view changes
  const updateView = (newView: 'list' | 'add' | 'edit') => {
    setCurrentView(newView);
    if (onViewChange) {
      onViewChange(newView !== 'list');
    }
  };

  // Form state for add/edit
  const [formData, setFormData] = useState({
    name: '',
    ownerName: '',
    phone: '',
    email: '',
    address: '',
    category: '',
    establishedDate: '',
  });

  const handleAddShop = () => {
    if (!formData.name.trim() || !formData.ownerName.trim() || !formData.phone.trim()) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const newShop: Shop = {
      ...formData,
      id: Date.now().toString(), // Generate unique ID
      shopId: `SHOP${Date.now()}`, // Generate unique shop ID
      isActive: true,
    };

    onAddShop(newShop);
    resetForm();
    updateView('list');
  };

  const handleEditShop = () => {
    if (!selectedShop) return;

    const updatedShop = {
      ...selectedShop,
      ...formData,
    };

    onEditShop(updatedShop);
    resetForm();
    updateView('list');
    setSelectedShop(null);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      ownerName: '',
      phone: '',
      email: '',
      address: '',
      category: '',
      establishedDate: '',
    });
  };

  const startEdit = (shop: Shop) => {
    setSelectedShop(shop);
    setFormData({
      name: shop.name,
      ownerName: shop.ownerName,
      phone: shop.phone,
      email: shop.email,
      address: shop.address,
      category: shop.category,
      establishedDate: shop.establishedDate,
    });
    updateView('edit');
  };

  const cancelEdit = () => {
    resetForm();
    updateView('list');
    setSelectedShop(null);
  };

  if (currentView === 'add' || currentView === 'edit') {
    return (
      <View>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={cancelEdit} style={styles.backButton}>
            <GlobalText style={styles.backIcon}>←</GlobalText>
          </TouchableOpacity>
          <View style={styles.headerRightPlaceholder} />
        </View>

        <GlobalText style={styles.formTitle}>
          {currentView === 'add' ? 'Add New Shop' : 'Edit Shop'}
        </GlobalText>

        <View style={styles.profileSection}>
          <View style={styles.inputGroup}>
            <GlobalText style={styles.inputLabel}>Shop Name *</GlobalText>
            <TextInput
              style={styles.input}
              placeholder="Enter shop name (e.g., Bharti Cafe)"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <GlobalText style={styles.inputLabel}>Owner Name *</GlobalText>
            <TextInput
              style={styles.input}
              placeholder="Enter owner's full name"
              value={formData.ownerName}
              onChangeText={(text) => setFormData({ ...formData, ownerName: text })}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <GlobalText style={styles.inputLabel}>Phone Number *</GlobalText>
            <TextInput
              style={styles.input}
              placeholder="Enter 10-digit phone number"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
              maxLength={10}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <GlobalText style={styles.inputLabel}>Email Address</GlobalText>
            <TextInput
              style={styles.input}
              placeholder="Enter email address (optional)"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <GlobalText style={styles.inputLabel}>Shop Address</GlobalText>
            <TextInput
              style={styles.input}
              placeholder="Enter complete shop address"
              value={formData.address}
              onChangeText={(text) => setFormData({ ...formData, address: text })}
              placeholderTextColor="#999"
              multiline
            />
          </View>

          <View style={styles.inputGroup}>
            <GlobalText style={styles.inputLabel}>Category</GlobalText>
            <TextInput
              style={styles.input}
              placeholder="e.g., Food, Beverages, Snacks, Stationery"
              value={formData.category}
              onChangeText={(text) => setFormData({ ...formData, category: text })}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <GlobalText style={styles.inputLabel}>Established Date</GlobalText>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD (optional)"
              value={formData.establishedDate}
              onChangeText={(text) => setFormData({ ...formData, establishedDate: text })}
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={currentView === 'add' ? handleAddShop : handleEditShop}>
            <GlobalText style={styles.buttonText}>
              {currentView === 'add' ? 'Add Shop' : 'Update Shop'}
            </GlobalText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.formContainer}>
      <GlobalText style={styles.formTitle}>Shop Management</GlobalText>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <GlobalText style={styles.statNumber}>{shops.length}</GlobalText>
          <GlobalText style={styles.statLabel}>Total</GlobalText>
        </View>
        <View style={styles.statCard}>
          <GlobalText style={styles.statNumber}>{shops.filter(s => s.isActive).length}</GlobalText>
          <GlobalText style={styles.statLabel}>Open</GlobalText>
        </View>
        <View style={styles.statCard}>
          <GlobalText style={styles.statNumber}>{shops.filter(s => !s.isActive).length}</GlobalText>
          <GlobalText style={styles.statLabel}>Close</GlobalText>
        </View>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => updateView('add')}>
        <GlobalText style={styles.addButtonText}>+ Add New Shop</GlobalText>
      </TouchableOpacity>

      <View style={styles.profileSection}>
        <View style={styles.sectionHeader}>
          <GlobalText style={styles.sectionTitle}>🏪 Registered Shops</GlobalText>
          <GlobalText style={styles.shopCount}>{shops.length} shops</GlobalText>
        </View>

        {shops.length === 0 ? (
          <View style={styles.emptyState}>
            <GlobalText style={styles.emptyText}>No shops added yet</GlobalText>
          </View>
        ) : (
          <View style={styles.shopList}>
            {shops.map((shop) => (
              <View key={shop.id} style={styles.shopItem}>
                <View style={styles.shopInfo}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                    <GlobalText style={styles.shopName}>{shop.name}</GlobalText>
                    <View style={[
                      styles.statusBadge,
                      shop.isActive ? styles.statusOpen : styles.statusClosed,
                      { marginLeft: 8 }
                    ]}>
                      {/* Removed text - now just a small colored dot */}
                    </View>
                  </View>
                  <GlobalText style={styles.shopDetails}>Owner: {shop.ownerName}</GlobalText>
                  <GlobalText style={styles.shopDetails}>Phone: {shop.phone}</GlobalText>
                  {shop.email && <GlobalText style={styles.shopDetails}>Email: {shop.email}</GlobalText>}
                  {shop.address && <GlobalText style={styles.shopDetails}>Address: {shop.address}</GlobalText>}
                  {shop.category && <GlobalText style={styles.shopDetails}>Category: {shop.category}</GlobalText>}
                  <GlobalText style={styles.shopId}>ID: {shop.shopId}</GlobalText>
                </View>
                <View style={styles.shopActions}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => startEdit(shop)}
                  >
                    <GlobalText style={styles.editButtonText}>Edit</GlobalText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[shop.isActive ? styles.closeButton : styles.openButton]}
                    onPress={() => onToggleShopStatus(shop.id)}
                  >
                    <GlobalText style={shop.isActive ? styles.closeButtonText : styles.openButtonText}>
                      {shop.isActive ? 'Close' : 'Open'}
                    </GlobalText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => onDeleteShop(shop.id)}
                  >
                    <GlobalText style={styles.deleteButtonText}>Delete</GlobalText>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
