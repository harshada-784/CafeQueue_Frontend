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
  onAddShop: (shop: Omit<Shop, 'id' | 'shopId'>) => void;
  onEditShop: (shop: Shop) => void;
  onDeleteShop: (shopId: string) => void;
  onToggleShopStatus: (shopId: string) => void;
}

export default function ShopManagement({ shops, onBack, onAddShop, onEditShop, onDeleteShop, onToggleShopStatus }: Props) {
  const [currentView, setCurrentView] = useState<'list' | 'add' | 'edit'>('list');
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

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

    onAddShop({ ...formData, isActive: true });
    resetForm();
    setCurrentView('list');
  };

  const handleEditShop = () => {
    if (!selectedShop) return;

    const updatedShop = {
      ...selectedShop,
      ...formData,
    };

    onEditShop(updatedShop);
    resetForm();
    setCurrentView('list');
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
    setCurrentView('edit');
  };

  const cancelEdit = () => {
    resetForm();
    setCurrentView('list');
    setSelectedShop(null);
  };

  if (currentView === 'add' || currentView === 'edit') {
    return (
      <View style={styles.formContainer}>
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
          <TextInput
            style={styles.input}
            placeholder="Shop Name *"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Owner Name *"
            value={formData.ownerName}
            onChangeText={(text) => setFormData({ ...formData, ownerName: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Phone Number *"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
            maxLength={10}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Address"
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Category (e.g., Food, Beverages, Snacks)"
            value={formData.category}
            onChangeText={(text) => setFormData({ ...formData, category: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Established Date (YYYY-MM-DD)"
            value={formData.establishedDate}
            onChangeText={(text) => setFormData({ ...formData, establishedDate: text })}
            placeholderTextColor="#999"
          />

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

      <TouchableOpacity style={styles.addButton} onPress={() => setCurrentView('add')}>
        <GlobalText style={styles.addButtonText}>Add New Shop</GlobalText>
      </TouchableOpacity>

      <View style={styles.profileSection}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <GlobalText style={{ fontSize: 16, fontWeight: '700', color: '#111' }}>Current Shops</GlobalText>
          <GlobalText style={{ fontSize: 14, color: '#666' }}>Total: {shops.length}</GlobalText>
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
                      shop.isActive ? styles.statusActive : styles.statusInactive,
                      { marginLeft: 8 }
                    ]}>
                      <GlobalText style={[
                        shop.isActive ? { color: '#4CAF50' } : { color: '#F44336' }
                      ]}>
                        {shop.isActive ? 'Active' : 'Inactive'}
                      </GlobalText>
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
                    style={[shop.isActive ? styles.deactivateButton : styles.cardButton]}
                    onPress={() => onToggleShopStatus(shop.id)}
                  >
                    <GlobalText style={shop.isActive ? styles.deactivateButtonText : styles.cardButtonText}>
                      {shop.isActive ? 'Deactivate' : 'Activate'}
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
