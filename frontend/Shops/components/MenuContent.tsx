import React from 'react';
import { View, TouchableOpacity, ScrollView, Image, Switch, Alert, StyleSheet } from 'react-native';
import { SpecialItem } from '../../dailySpecialsStore';
import { Text, TextInput } from '../../components/GlobalComponents';

// Function to get online food image based on item name
const getFoodImage = (itemName: string) => {
  const name = itemName.toLowerCase();
  
  if (name.includes('burger') || name.includes('hamburger')) {
    return 'https://images.unsplash.com/photo-1568901346375-23c9450c58de?w=400&h=300&fit=crop';
  } else if (name.includes('pizza')) {
    return 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop';
  } else if (name.includes('sandwich') || name.includes('sub')) {
    return 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop';
  } else if (name.includes('coffee') || name.includes('cappuccino') || name.includes('espresso')) {
    return 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop';
  } else if (name.includes('tea') || name.includes('chai')) {
    return 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cda9?w=400&h=300&fit=crop';
  } else if (name.includes('fries') || name.includes('french fries')) {
    return 'https://images.unsplash.com/photo-1576107232684-1279f3d1a40d?w=400&h=300&fit=crop';
  } else if (name.includes('drink') || name.includes('juice') || name.includes('cold drink')) {
    return 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop';
  } else if (name.includes('biryani') || name.includes('rice')) {
    return 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop';
  } else if (name.includes('noodles') || name.includes('pasta')) {
    return 'https://images.unsplash.com/photo-1563379091339-03246922d5ea?w=400&h=300&fit=crop';
  } else if (name.includes('soup')) {
    return 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop';
  } else if (name.includes('salad')) {
    return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop';
  } else if (name.includes('cake') || name.includes('dessert')) {
    return 'https://images.unsplash.com/photo-1578985545062-69928f1f3930?w=400&h=300&fit=crop';
  } else if (name.includes('ice cream') || name.includes('icecream')) {
    return 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&h=300&fit=crop';
  } else if (name.includes('breakfast') || name.includes('pancake') || name.includes('waffle')) {
    return 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop';
  } else {
    // Default food image for other items
    return 'https://images.unsplash.com/photo-1504674900249-08745da9b8e9?w=400&h=300&fit=crop';
  }
};

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
              {item.imageUri?.trim() ? (
                <Image
                  source={{ uri: item.imageUri.trim() }}
                  style={styles.itemImageNew}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={{ uri: getFoodImage(item.name) }}
                  style={styles.itemImageNew}
                  resizeMode="cover"
                  defaultSource={require('../../assets/food_home_user.png')}
                />
              )}
              
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
    fontWeight: '100',
    color: '#4a1e0c86',
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
    height: 160,
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
});
