import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Image, Switch, Alert, StyleSheet, Platform } from 'react-native';
import { launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';
import { SpecialItem } from '../../dailySpecialsStore';
import { Text, TextInput } from '../../components/GlobalComponents';

interface MenuContentProps {
  items: SpecialItem[];
  menuSearch: string;
  setMenuSearch: (search: string) => void;
  setShowAddItem: (show: boolean) => void;
  setEditId: (id: number | null) => void;
  setShowEditItem: (show: boolean) => void;
  setAvailable: (id: number, available: boolean) => void;
  deleteItem: (id: number) => void;
}

export default function MenuContent({ 
  items, 
  menuSearch, 
  setMenuSearch, 
  setShowAddItem, 
  setEditId, 
  setShowEditItem, 
  setAvailable, 
  deleteItem 
}: MenuContentProps) {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleImagePicker = (itemId: number) => {
    setSelectedItemId(itemId);
    
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8 as any,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) {
        setSelectedItemId(null);
        return;
      }

      if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          // Here you would typically update the item's image in your store
          // For now, we'll just show an alert
          Alert.alert(
            'Image Selected',
            `Image selected for item ${itemId}. You would need to implement the update logic in your store.`,
            [{ text: 'OK' }]
          );
        }
      }
      setSelectedItemId(null);
    });
  };

  const filteredItems = items.filter(i => i.name.toLowerCase().includes(menuSearch.trim().toLowerCase()));

  return (
    <>
      {/* Menu Header with Search */}
      <View style={styles.menuHeader}>
        <View style={styles.menuHeaderTop}>
          <Text style={styles.menuTitle}>Manage Menu</Text>
          <TouchableOpacity onPress={() => setShowAddItem(true)} style={styles.addNewItemBtn}>
            <Text style={styles.addNewItemBtnText}>+ Add Item</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchIconWrapper}>
            <Text style={styles.searchIcon}>🔍</Text>
          </View>
          <TextInput
            placeholder="Search menu items..."
            placeholderTextColor="#834747ff"
            style={styles.searchInputNew}
            value={menuSearch}
            onChangeText={setMenuSearch}
          />
        </View>
      </View>

      {/* Menu Stats Cards */}
      <View style={styles.menuStatsContainer}>
        <View style={styles.menuStatCard}>
          <Text style={styles.menuStatIcon}>📦</Text>
          <Text style={styles.menuStatNumber}>{filteredItems.length}</Text>
          <Text style={styles.menuStatLabel}>Total Items</Text>
        </View>
        <View style={styles.menuStatCard}>
          <Text style={styles.menuStatIcon}>✅</Text>
          <Text style={styles.menuStatNumber}>{filteredItems.filter(i => i.available).length}</Text>
          <Text style={styles.menuStatLabel}>Available</Text>
        </View>
        <View style={styles.menuStatCard}>
          <Text style={styles.menuStatIcon}>⏸️</Text>
          <Text style={styles.menuStatNumber}>{filteredItems.filter(i => !i.available).length}</Text>
          <Text style={styles.menuStatLabel}>Unavailable</Text>
        </View>
      </View>

      {/* Menu Items List */}
      <ScrollView
        style={styles.menuScrollContainer}
        contentContainerStyle={styles.menuScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredItems.length === 0 ? (
          <View style={styles.emptyMenuState}>
            <Text style={styles.emptyMenuIcon}>🍽️</Text>
            <Text style={styles.emptyMenuText}>No menu items found</Text>
            <Text style={styles.emptyMenuSubtext}>
              {menuSearch.trim() ? 'Try adjusting your search' : 'Add your first item to get started'}
            </Text>
            {!menuSearch.trim() && (
              <TouchableOpacity onPress={() => setShowAddItem(true)} style={styles.emptyAddBtn}>
                <Text style={styles.emptyAddBtnText}>Add First Item</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          filteredItems.map(item => (
            <View key={item.id} style={styles.menuCardNew}>
              {/* Item Image */}
              <View style={styles.imageContainer}>
                {item.imageUri?.trim() ? (
                  <View>
                    <Image
                      source={{ uri: item.imageUri.trim() }}
                      style={styles.itemImageNew}
                      resizeMode="cover"
                    />
                    <TouchableOpacity 
                      style={styles.changeImageBtn}
                      onPress={() => handleImagePicker(item.id)}
                    >
                      <Text style={styles.changeImageBtnText}>📷 Change</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.itemImagePlaceholder}>
                    <Text style={styles.itemImagePlaceholderIcon}>🍴</Text>
                    <TouchableOpacity 
                      style={styles.addImageBtn}
                      onPress={() => handleImagePicker(item.id)}
                    >
                      <Text style={styles.addImageBtnText}>📷 Add Image</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              
              {/* Item Content */}
              <View style={styles.itemContent}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemNameContainer}>
                    <Text style={styles.itemNameNew} numberOfLines={1}>{item.name}</Text>
                    <View style={[styles.availabilityBadge, { 
                      backgroundColor: item.available ? '#10B981' : '#EF4444' 
                    }]}>
                      <Text style={styles.availabilityBadgeText}>
                        {item.available ? 'Available' : 'Unavailable'}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.itemPriceNew}>₹{item.price}</Text>
                </View>
                
                <View style={styles.itemActions}>
                  <TouchableOpacity 
                    style={styles.editBtnNew} 
                    onPress={() => { setEditId(item.id); setShowEditItem(true); }}
                  >
                    <Text style={styles.editBtnText}>✏️ Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteBtnNew}
                    onPress={() => {
                      Alert.alert(
                        'Delete item',
                        `Are you sure you want to delete "${item.name}"?`,
                        [
                          { text: 'Cancel', style: 'cancel' },
                          {
                            text: 'Delete',
                            style: 'destructive',
                            onPress: () => deleteItem(item.id),
                          },
                        ],
                        { cancelable: true }
                      );
                    }}
                  >
                    <Text style={styles.deleteBtnText}>🗑️ Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              {/* Availability Toggle */}
              <View style={styles.toggleContainer}>
                <Text style={styles.toggleLabel}>Available</Text>
                <Switch
                  value={item.available}
                  onValueChange={(val) => setAvailable(item.id, val)}
                  trackColor={{ false: '#E5E7EB', true: '#D1FAE5' }}
                  thumbColor={item.available ? '#10B981' : '#9CA3AF'}
                  ios_backgroundColor="#E5E7EB"
                />
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  menuHeader: {
    marginBottom: 20,
  },
  menuHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  menuTitle: {
    fontSize: 28,
    fontWeight: '200',
    color: '#111',
  },
  addNewItemBtn: {
    backgroundColor: '#4a1e0cf7',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  addNewItemBtnText: {
    color: '#fff',
    fontWeight: '100',
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c09a7eff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 4,
  },
  searchIconWrapper: {
    padding: 12,
  },
  searchIcon: {
    fontSize: 18,
  },
  searchInputNew: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#111',
    paddingRight: 16,
  },
  menuStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  menuStatCard: {
    flex: 1,
    backgroundColor: '#4a1e0cc3',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
  },
  menuStatIcon: {
    fontSize: 12,
    marginBottom: 8,
  },
  menuStatNumber: {
    fontSize: 20,
    fontWeight: '100',
    color: '#FF9800',
    marginBottom: 4,
  },
  menuStatLabel: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '100',
  },
  emptyMenuState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyMenuIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyMenuText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  emptyMenuSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyAddBtn: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyAddBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  menuScrollContainer: {
    flex: 1,
  },
  menuScrollContent: {
    gap: 14,
    paddingBottom: 100,
  },
  menuCardNew: {
    backgroundColor: '#c09a7eff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  itemImageNew: {
    width: '100%',
    height: 60,
    backgroundColor: '#F3F4F6',
  },
  itemImagePlaceholder: {
    width: '100%',
    height: 80,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImagePlaceholderIcon: {
    fontSize: 40,
    opacity: 0.5,
  },
  itemContent: {
    padding: 20,
  },
  itemHeader: {
    marginBottom: 5,
  },
  itemNameContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemNameNew: {
    fontSize: 20,
    color: '#111',
    flex: 1,
  },
  availabilityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  availabilityBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  itemPriceNew: {
    fontSize: 24,
    fontWeight: '800',
    color: '#4a1e0cf7',
  },
  itemActions: {
    flexDirection: 'row',
    gap: 12,
  },
  editBtnNew: {
    flex: 1,
    backgroundColor: '#EBF8FF',
    borderWidth: 1,
    borderColor: '#3B82F6',
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  editBtnText: {
    color: '#3B82F6',
    fontWeight: '600',
    fontSize: 14,
  },
  deleteBtnNew: {
    flex: 1,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#EF4444',
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteBtnText: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 14,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingBottom: 10,
    padding: 20,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  imageContainer: {
    position: 'relative',
  },
  changeImageBtn: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  changeImageBtnText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  addImageBtn: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  addImageBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
