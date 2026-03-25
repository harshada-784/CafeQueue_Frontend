import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Platform, StatusBar, FlatList, Animated } from 'react-native';
import Background from './Background';
import { getMenuForShop, MenuItem as ShopMenuItem } from './shopsStore';
import { addToCart, getCount, subscribe as subscribeCart } from './cartStore';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  imageUri?: string;
  category?: string;
  rating?: number;
  prepTime?: string;
  isVeg?: boolean;
  isBestseller?: boolean;
  description?: string;
}

// Simple Timeslot Display Component
const SimpleTimeslotDisplay = ({ shopName }: { shopName: string }) => {
  return (
    <View style={styles.timeslotContainer}>
      <View style={styles.timeslotHeader}>
        <Text style={styles.timeslotIcon}>⏰</Text>
        <Text style={styles.timeslotText}>Queue Management</Text>
      </View>
      <View style={styles.timeslotStatus}>
        <Text style={styles.statusText}>🟢 Order Now</Text>
        <Text style={styles.statusSubtext}>10 slots available</Text>
      </View>
    </View>
  );
};

interface Category {
  id: string;
  name: string;
  icon?: string;
}

const categories: Category[] = [
  { id: '1', name: '🍔 Burgers', icon: '🍔' },
  { id: '2', name: '🍕 Pizza', icon: '🍕' },
  { id: '3', name: '🥤 Beverages', icon: '🥤' },
  { id: '4', name: '🍜 Desserts', icon: '🍜' },
  { id: '5', name: '🥗 Combos', icon: '🥗' },
  { id: '6', name: '🥗 Snacks', icon: '🥗' },
];

interface Props {
  shopName: string;
  onBack: () => void;
  onOpenCart: () => void;
}

export default function ShopMenu({ shopName, onBack, onOpenCart }: Props) {
  const [search, setSearch] = useState('');
  const [cartCount, setCartCount] = useState(getCount());
  const [warn, setWarn] = useState(false);
  const [warnTimer, setWarnTimer] = useState<number | null>(null);

  useEffect(() => {
    const unsub = subscribeCart(() => setCartCount(getCount()));
    return unsub;
  }, []);

  useEffect(() => {
    return () => {
      if (warnTimer) clearTimeout(warnTimer);
    };
  }, [warnTimer]);

  const items = useMemo<ShopMenuItem[]>(() => getMenuForShop(shopName), [shopName]);
  const filtered = items.filter(i => i.name.toLowerCase().includes(search.trim().toLowerCase()));
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'time'>('rating');
  
  const filteredItems = useMemo(() => {
    let filteredByCategory = selectedCategory === 'all' 
      ? filtered 
      : filtered.filter((item: any) => (item as MenuItem).category === selectedCategory);
    
    return filteredByCategory.sort((a: any, b: any) => {
      const itemA = a as MenuItem;
      const itemB = b as MenuItem;
      switch (sortBy) {
        case 'rating':
          return (itemB.rating || 0) - (itemA.rating || 0);
        case 'price':
          return itemA.price - itemB.price;
        case 'time':
          return (itemA.prepTime || '').localeCompare(itemB.prepTime || '');
        default:
          return 0;
      }
    });
  }, [filtered, selectedCategory, sortBy]);

  const enhancedItems = useMemo(() => {
    return filteredItems.map((item: any, index) => ({
      ...item,
      isVeg: Math.random() > 0.5,
      isBestseller: index < 3,
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
      prepTime: `${15 + Math.floor(Math.random() * 20)} min`,
      description: `Delicious ${(item as MenuItem).name} made with fresh ingredients`,
    }));
  }, [filteredItems]);

  return (
    <Background>
      {/* Enhanced Header */}
      <View style={{ paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 16) + 56 : 56 }}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack} style={styles.backButton} hitSlop={{ top: 14, right: 14, bottom: 14, left: 14 }}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.shopName}>{shopName}</Text>
            <View style={styles.shopMeta}>
              <Text style={styles.rating}>⭐ {((Math.random() * 1 + 4).toFixed(1))}</Text>
              <Text style={styles.deliveryTime}>🚚 {20 + Math.floor(Math.random() * 10)} min</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onOpenCart} style={styles.cartBtn} hitSlop={{ top: 14, right: 14, bottom: 14, left: 14 }}>
            <Text style={styles.cartIcon}>🛒</Text>
            {!!cartCount && (
              <View style={styles.badge}><Text style={styles.badgeText}>{cartCount}</Text></View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              placeholder="Search for dishes..."
              placeholderTextColor="#999"
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        {/* Categories Horizontal Scroll */}
        <View style={styles.categoriesContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          >
            <TouchableOpacity 
              style={[styles.categoryChip, selectedCategory === 'all' && styles.selectedCategory]}
              onPress={() => setSelectedCategory('all')}
            >
              <Text style={styles.categoryText}>All</Text>
            </TouchableOpacity>
            {categories.map(category => (
              <TouchableOpacity 
                key={category.id}
                style={[styles.categoryChip, selectedCategory === category.id && styles.selectedCategory]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryText}>{category.icon} {category.name.split(' ')[1]}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Sort Options */}
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <View style={styles.sortOptions}>
            {[
              { key: 'rating', label: 'Rating', icon: '⭐' },
              { key: 'price', label: 'Price', icon: '💰' },
              { key: 'time', label: 'Time', icon: '⏱️' },
            ].map(option => (
              <TouchableOpacity 
                key={option.key}
                style={[styles.sortOption, sortBy === option.key && styles.selectedSort]}
                onPress={() => setSortBy(option.key as any)}
              >
                <Text style={styles.sortOptionText}>{option.icon} {option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Timeslot Display */}
        <SimpleTimeslotDisplay shopName={shopName} />

        {/* Menu Items Grid */}
        <View style={styles.menuContainer}>
          {enhancedItems.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🍽</Text>
              <Text style={styles.emptyText}>No items found</Text>
              <Text style={styles.emptySubtext}>Try searching for something else</Text>
            </View>
          ) : (
            <FlatList
              data={enhancedItems}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.row}
              renderItem={({ item }: { item: MenuItem }) => (
                <TouchableOpacity style={styles.menuCard} activeOpacity={0.9}>
                  {/* Item Image */}
                  <Image 
                    source={{ uri: item.imageUri || `https://picsum.photos/200/150?random=${item.id}` }} 
                    style={styles.menuItemImage} 
                  />
                  
                  {/* Veg/Non-veg Badge */}
                  <View style={[styles.vegBadge, item.isVeg ? styles.vegBadgeGreen : styles.vegBadgeRed]}>
                    <Text style={styles.vegBadgeText}>{item.isVeg ? '🟢' : '🔴'}</Text>
                  </View>

                  {/* Bestseller Badge */}
                  {item.isBestseller && (
                    <View style={styles.bestsellerBadge}>
                      <Text style={styles.bestsellerText}>⭐ Bestseller</Text>
                    </View>
                  )}

                  {/* Item Details */}
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                    {item.description && (
                      <Text style={styles.itemDescription} numberOfLines={2}>{item.description}</Text>
                    )}
                    
                    <View style={styles.itemMeta}>
                      <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>⭐</Text>
                        <Text style={styles.ratingValue}>{item.rating}</Text>
                      </View>
                      <View style={styles.timeContainer}>
                        <Text style={styles.timeText}>⏱️</Text>
                        <Text style={styles.timeValue}>{item.prepTime}</Text>
                      </View>
                    </View>
                  </View>

                  {/* Price and Add Button */}
                  <View style={styles.itemFooter}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.itemPrice}>₹{item.price}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => {
                        const ok = addToCart(shopName, item.id, item.name, item.price, item.imageUri);
                        if (!ok) {
                          if (warnTimer) clearTimeout(warnTimer);
                          setWarn(true);
                          const t = setTimeout(() => setWarn(false), 2500) as unknown as number;
                          setWarnTimer(t);
                        }
                      }}
                    >
                      <Text style={styles.addButtonText}>ADD</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.menuList}
            />
          )}
        </View>
      </ScrollView>

      {/* Bottom toast warning */}
      {warn && (
        <View style={styles.toastWrap} pointerEvents="none">
          <View style={styles.toast}>
            <Text style={styles.toastIcon}>⚠️</Text>
            <Text style={styles.toastText}>Only add items from the same shop</Text>
          </View>
        </View>
      )}
    </Background>
  );
}

const styles = StyleSheet.create({
  // Header Styles
  headerRow: { 
    position: 'relative', 
    height: 60, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  backButton: { 
    paddingHorizontal: 8, 
    paddingVertical: 8, 
    zIndex: 2, 
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
  },
  backIcon: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#111' 
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  shopName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111',
    marginBottom: 4,
  },
  shopMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  deliveryTime: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  cartBtn: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    backgroundColor: '#28a745', 
    alignItems: 'center', 
    justifyContent: 'center', 
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  cartIcon: { 
    fontSize: 20, 
    color: '#fff' 
  },
  badge: { 
    position: 'absolute', 
    top: -6, 
    right: -6, 
    backgroundColor: '#ff4444', 
    borderRadius: 10, 
    paddingHorizontal: 6, 
    paddingVertical: 2,
  },
  badgeText: { 
    color: '#fff', 
    fontSize: 10, 
    fontWeight: '700' 
  },

  // Search Styles
  searchContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111',
  },

  // Categories Styles
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoriesList: {
    gap: 8,
  },
  categoryChip: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  selectedCategory: {
    backgroundColor: '#28a745',
    borderWidth: 1,
    borderColor: '#28a745',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },

  // Sort Styles
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  sortOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  sortOption: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  selectedSort: {
    backgroundColor: '#28a745',
    borderWidth: 1,
    borderColor: '#28a745',
  },
  sortOptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111',
  },

  // Menu Grid Styles
  menuContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  menuList: {
    gap: 12,
  },
  row: {
    justifyContent: 'space-between',
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '48%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    overflow: 'hidden',
  },
  menuItemImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#f5f5f5',
  },
  vegBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vegBadgeGreen: {
    backgroundColor: '#28a745',
    borderWidth: 2,
    borderColor: '#fff',
  },
  vegBadgeRed: {
    backgroundColor: '#dc3545',
    borderWidth: 2,
    borderColor: '#fff',
  },
  vegBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  bestsellerBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  bestsellerText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  itemDetails: {
    padding: 12,
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
    marginBottom: 4,
    lineHeight: 20,
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    lineHeight: 16,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    marginRight: 4,
  },
  ratingValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    marginRight: 4,
  },
  timeValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111',
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  priceContainer: {
    flex: 1,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111',
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },

  // Empty State
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },

  // Toast Styles
  toastWrap: { 
    position: 'absolute', 
    left: 16, 
    right: 16, 
    bottom: 40, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  toast: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toastIcon: {
    fontSize: 16,
  color: '#fff',
  },
  toastText: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 14 
  },

  // Timeslot Display Styles
  timeslotContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  timeslotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeslotIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  timeslotText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  timeslotStatus: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#28a745',
    marginBottom: 4,
  },
  statusSubtext: {
    fontSize: 12,
    color: '#666',
  },
});
