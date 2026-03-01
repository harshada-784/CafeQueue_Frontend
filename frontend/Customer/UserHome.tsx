import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Text, TextInput } from '../components/GlobalComponents';
import Background from '../Background';
import { getShopsForCollege, Shop } from '../shopsStore';
import Login from '../Login';
import ShopMenu from '../ShopMenu';
import CartScreen from './CartScreen';
import PaymentScreen from './PaymentScreen';
import OrderConfirmed from './OrderConfirmed';
import Orders from '../Orders';
import ECanteenCard from '../ECanteenCard';
import { getCount, subscribe as subscribeCart } from '../cartStore';

interface Props {
  userName: string;
  collegeName: string;
}

export default function UserHome({ userName, collegeName }: Props) {
  const [search, setSearch] = useState('');
  const shops = useMemo<Shop[]>(() => getShopsForCollege(collegeName), [collegeName]);
  const filtered = shops.filter(s => s.name.toLowerCase().includes(search.trim().toLowerCase()));
  const [showSidebar, setShowSidebar] = useState(false);
  const [doLogout, setDoLogout] = useState(false);
  const [view, setView] = useState<'home' | 'shop' | 'cart' | 'payment' | 'order_confirmed' | 'orders' | 'ecanteen_card'>('home');
  const [pendingAmount, setPendingAmount] = useState<number>(0);
  const [activeShopName, setActiveShopName] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(getCount());

  useEffect(() => {
    const unsub = subscribeCart(() => setCartCount(getCount()));
    return unsub;
  }, []);

  if (doLogout) return <Login />;

  // Nested routing
  if (view === 'shop' && activeShopName) {
    return (
      <ShopMenu
        shopName={activeShopName}
        onBack={() => setView('home')}
        onOpenCart={() => setView('cart')}
      />
    );
  }
  if (view === 'cart') {
    return (
      <CartScreen
        onBack={() => setView('home')}
        onProceed={(total) => { setPendingAmount(total); setView('payment'); }}
      />
    );
  }
  if (view === 'orders') {
    return (
      <Orders
        onBack={() => setView('home')}
      />
    );
  }
  if (view === 'ecanteen_card') {
    return (
      <ECanteenCard
        onBack={() => setView('home')}
        userName={userName}
        collegeName={collegeName}
      />
    );
  }

  return (
    <Background>
      {/* Sidebar overlay */}
      {showSidebar && (
        <>
          {/* Backdrop */}
          <TouchableOpacity
            style={styles.sidebarBackdrop}
            activeOpacity={1}
            onPress={() => setShowSidebar(false)}
          />
          {/* Sidebar */}
          <View style={styles.sidebar}>
            <View style={styles.userInfo}>
              <Text style={styles.username}>{userName}</Text>
              <Text style={styles.userRole}>Student</Text>
            </View>

            <TouchableOpacity style={styles.sidebarItem} onPress={() => { setShowSidebar(false); setView('cart'); }}>
              <Text style={styles.sidebarItemText}>🛒 My Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarItem} onPress={() => { setShowSidebar(false); setView('orders'); }}>
              <Text style={styles.sidebarItemText}>📋 My Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarItem} onPress={() => { setShowSidebar(false); setView('ecanteen_card'); }}>
              <Text style={styles.sidebarItemText}>💳 My E-canteen card</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarItem} onPress={() => { setShowSidebar(false); setDoLogout(true); }}>
              <Text style={styles.sidebarItemText}>🚪 Logout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <ScrollView contentContainerStyle={styles.container}>
        {/* Header with hamburger menu, greeting, and cart */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.hamburgerBtn} onPress={() => setShowSidebar(true)}>
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
          </TouchableOpacity>

          <View style={styles.headerGreeting}>
            <Text style={styles.greeting}>Hello!!</Text>
            <Text style={styles.userName}>{userName}</Text>
          </View>

          <TouchableOpacity style={styles.cartBtn} onPress={() => setView('cart')}>
            <Text style={styles.cartIcon}>🛒</Text>
            {!!cartCount && (
              <View style={styles.badge}><Text style={styles.badgeText}>{cartCount}</Text></View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search */}
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#666"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />

        {/* Banner tile (image with overlaid text) */}
        <ImageBackground
          source={require('../assets/food_home_user.png')}
          style={styles.banner}
          imageStyle={styles.bannerImage}
          resizeMode="cover"
        >
          <Text style={styles.bannerTitle}>Faster food on your Campus Way!</Text>
        </ImageBackground>

        {/* Welcome */}
        <Text style={styles.welcomeText}>Welcome to {collegeName}!</Text>

        {/* Available Shops */}
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>Available Shops</Text>
        </View>

        <View style={{ gap: 12, marginBottom: 24 }}>
          {filtered.map(shop => (
            <TouchableOpacity key={shop.id} style={styles.card} activeOpacity={0.9}
              onPress={() => { setActiveShopName(shop.name); setView('shop'); }}>
              {!!shop.imageUri?.trim() && (
                <Image source={{ uri: shop.imageUri }} style={styles.shopImage} />
              )}
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.shopName}>{shop.name}</Text>
                  <Text style={styles.shopMeta}>Items starts from ₹{shop.minPrice}</Text>
                </View>
                <TouchableOpacity style={styles.wishlistBtn} onPress={() => { setActiveShopName(shop.name); setView('shop'); }}>
                  <Text style={styles.wishlistIcon}>♡</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
          {filtered.length === 0 && (
            <Text style={{ color: '#555' }}>No shops found.</Text>
          )}
        </View>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 40, paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  hamburgerBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#e3e3e3' },
  hamburgerLine: { width: 16, height: 2, backgroundColor: '#111', marginVertical: 1 },
  headerGreeting: { flex: 1, marginLeft: 12 },
  // Sidebar styles
  sidebarBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 2000,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 280,
    backgroundColor: 'white',
    zIndex: 3000,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 2, height: 0 },
    paddingTop: 50,
  },
  userInfo: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  username: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  sidebarItem: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sidebarItemText: {
    fontSize: 16,
    color: '#111',
    fontWeight: '600',
  },
  greeting: { fontSize: 12, color: '#666' },
  userName: { fontSize: 16, fontWeight: '800', color: '#111' },
  cartBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#e3e3e3' },
  cartIcon: { fontSize: 18 },
  searchInput: { height: 42, borderRadius: 10, paddingHorizontal: 14, backgroundColor: 'rgba(255,255,255,0.92)', borderWidth: 1, borderColor: '#e3e3e3', marginBottom: 12 },
  banner: { position: 'relative', borderRadius: 22, overflow: 'hidden', paddingHorizontal: 20, paddingVertical: 20, marginBottom: 0, backgroundColor: 'transparent', height: 180, justifyContent: 'center', width: '92%', alignSelf: 'center' },
  bannerTitle: { fontWeight: '900', color: '#fff', fontSize: 22, lineHeight: 28, maxWidth: '76%', textShadowColor: 'rgba(0,0,0,0.25)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 },
  bannerImage: { width: '100%', height: '100%', borderRadius: 22 },
  bannerBgImg: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: '100%', height: '100%' },
  welcomeText: { fontSize: 16, fontWeight: '700', marginVertical: 8, color: '#111' },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 8 },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: '#111' },
  seeAll: { color: '#16A34A', fontWeight: '700' },
  card: { backgroundColor: 'rgba(255,255,255,0.94)', borderRadius: 12, borderWidth: 1, borderColor: '#e2e2e2' },
  shopImage: { width: '100%', height: 140, borderTopLeftRadius: 12, borderTopRightRadius: 12, backgroundColor: '#f2f2f2' },
  cardContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12 },
  shopName: { fontSize: 16, fontWeight: '800', color: '#111' },
  shopMeta: { fontSize: 12, color: '#666', marginTop: 2 },
  wishlistBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#e3e3e3' },
  wishlistIcon: { fontSize: 18, color: '#666' },
  badge: { position: 'absolute', top: -4, right: -6, backgroundColor: '#16A34A', borderRadius: 8, paddingHorizontal: 5, paddingVertical: 1 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
});
