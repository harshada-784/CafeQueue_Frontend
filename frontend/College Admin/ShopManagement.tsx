import React, { useState } from 'react';
import { View, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';
import { Text, TextInput } from '../components/GlobalComponents';
import { styles } from '../../css style/CollegeAdminOfficeHP.styles';

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
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerRightPlaceholder} />
        </View>

        <Text style={styles.formTitle}>
          {currentView === 'add' ? 'Add New Shop' : 'Edit Shop'}
        </Text>

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
            <Text style={styles.buttonText}>
              {currentView === 'add' ? 'Add Shop' : 'Update Shop'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.formContainer}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <Text style={styles.formTitle}>Shop Management</Text>

      <TouchableOpacity style={styles.addButton} onPress={() => setCurrentView('add')}>
        <Text style={styles.addButtonText}>Add New Shop</Text>
      </TouchableOpacity>

      <View style={styles.profileSection}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#111' }}>Current Shops</Text>
          <Text style={{ fontSize: 14, color: '#666' }}>Total: {shops.length}</Text>
        </View>

        {shops.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No shops added yet</Text>
          </View>
        ) : (
          <View style={styles.shopList}>
            {shops.map((shop) => (
              <View key={shop.id} style={styles.shopItem}>
                <View style={styles.shopInfo}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                    <Text style={styles.shopName}>{shop.name}</Text>
                    <View style={[
                      styles.statusBadge,
                      shop.isActive ? styles.statusActive : styles.statusInactive,
                      { marginLeft: 8 }
                    ]}>
                      <Text style={[
                        shop.isActive ? { color: '#4CAF50' } : { color: '#F44336' }
                      ]}>
                        {shop.isActive ? 'Active' : 'Inactive'}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.shopDetails}>Owner: {shop.ownerName}</Text>
                  <Text style={styles.shopDetails}>Phone: {shop.phone}</Text>
                  {shop.email && <Text style={styles.shopDetails}>Email: {shop.email}</Text>}
                  {shop.address && <Text style={styles.shopDetails}>Address: {shop.address}</Text>}
                  {shop.category && <Text style={styles.shopDetails}>Category: {shop.category}</Text>}
                  <Text style={styles.shopId}>ID: {shop.shopId}</Text>
                </View>
                <View style={styles.shopActions}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => startEdit(shop)}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[shop.isActive ? styles.deactivateButton : styles.cardButton]}
                    onPress={() => onToggleShopStatus(shop.id)}
                  >
                    <Text style={shop.isActive ? styles.deactivateButtonText : styles.cardButtonText}>
                      {shop.isActive ? 'Deactivate' : 'Activate'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => onDeleteShop(shop.id)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
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
