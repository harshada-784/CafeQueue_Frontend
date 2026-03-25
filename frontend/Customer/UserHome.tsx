import React, { useEffect, useMemo, useState, useRef } from 'react';
import { View, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView, FlatList, Animated, Dimensions } from 'react-native';
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
import { styles } from './UserHome.styles';

interface Props {
  userName: string;
  collegeName: string;
}

interface Offer {
  id: string;
  shopName: string;
  title: string;
  description: string;
  discount: string;
  backgroundColor?: string;
  icon?: string;
  urgency?: string;
  originalPrice?: string;
  newPrice?: string;
  imageUri: string;
  shopLogo?: string;
  rating?: number;
  deliveryTime?: string;
  offerType?: 'PERCENTAGE' | 'FLAT' | 'BOGO' | 'FREE_DELIVERY' | 'COMBO';
  validUntil?: string;
}

const sampleOffers: Offer[] = [
  {
    id: '1',
    shopName: 'Bharti Cafe',
    title: '20% OFF on All Items',
    description: 'On vadapav, sandwiches, burgers and more',
    discount: '20% OFF',
    imageUri: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=200&fit=crop', // Cafe
    shopLogo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=50&h=50&fit=crop&crop=face',
    rating: 4.3,
    deliveryTime: '10-15 min',
    offerType: 'PERCENTAGE',
    urgency: 'TODAY ONLY!',
    validUntil: '11:59 PM',
    originalPrice: '₹79',
    newPrice: '₹63',
  },
  {
    id: '2',
    shopName: 'Dosa Cafeteria',
    title: 'Combo Special',
    description: 'Dosa + Coffee combo at just ₹79',
    discount: 'COMBO',
    imageUri: 'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?w=400&h=200&fit=crop', // Dosa
    shopLogo: 'https://images.unsplash.com/photo-1560272564-9f3df5c7a7b5?w=50&h=50&fit=crop&crop=face',
    rating: 4.5,
    deliveryTime: '15-20 min',
    offerType: 'COMBO',
    urgency: 'LIMITED TIME',
    validUntil: 'Today',
    originalPrice: '₹109',
    newPrice: '₹79',
  },
  {
    id: '3',
    shopName: 'Cafe Coffee Day',
    title: '50% OFF on All Beverages',
    description: 'On cold coffee, tea, and more',
    discount: '50% OFF',
    imageUri: 'https://images.unsplash.com/photo-1511920182045-b4e2c4c69c2e?w=400&h=200&fit=crop', // Coffee
    shopLogo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=50&h=50&fit=crop&crop=face',
    rating: 4.2,
    deliveryTime: '20-25 min',
    offerType: 'PERCENTAGE',
    urgency: 'FLASH SALE',
    validUntil: '6 PM',
    originalPrice: '₹199',
    newPrice: '₹99',
  },
  {
    id: '4',
    shopName: 'Pizza Hub',
    title: 'Buy 1 Get 1 Free',
    description: 'On medium and large pizzas',
    discount: 'BOGO',
    imageUri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=200&fit=crop', // Pizza
    shopLogo: 'https://images.unsplash.com/photo-1560272564-9f3df5c7a7b5?w=50&h=50&fit=crop&crop=face',
    rating: 4.4,
    deliveryTime: '30-35 min',
    offerType: 'BOGO',
    urgency: '2 HOURS LEFT',
    validUntil: '4 PM',
    originalPrice: '₹399',
    newPrice: '₹199',
  },
  {
    id: '5',
    shopName: 'Milkshake Centre',
    title: 'Happy Hour Special',
    description: 'Buy 1 get 1 on all milkshakes',
    discount: 'BOGO',
    imageUri: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=200&fit=crop', // Milkshake
    shopLogo: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=50&h=50&fit=crop&crop=face',
    rating: 4.6,
    deliveryTime: '5-10 min',
    offerType: 'BOGO',
    urgency: 'TODAY',
    validUntil: 'Midnight',
    originalPrice: '₹98',
    newPrice: '₹49',
  },
];

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
  const [pressedCard, setPressedCard] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeCart(() => setCartCount(getCount()));
    return unsub;
  }, []);

  const handleCardPressIn = (offerId: string) => {
    setPressedCard(offerId);
  };

  const handleCardPressOut = () => {
    setPressedCard(null);
  };

  const renderOfferItem = ({ item, index }: { item: Offer; index: number }) => {
    const isPressed = pressedCard === item.id;

    return (
      <Animated.View
        style={[
          styles.offerCardContainer,
          {
            transform: [
              {
                scale: isPressed ? 0.98 : 1,
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.offerCard}
          activeOpacity={0.9}
          onPressIn={() => handleCardPressIn(item.id)}
          onPressOut={handleCardPressOut}
          onPress={() => { setActiveShopName(item.shopName); setView('shop'); }}
        >
          {/* Food Image */}
          <View style={styles.offerImageContainer}>
            <Image source={{ uri: item.imageUri }} style={styles.offerImage} />
            
            {/* Subtle gradient overlay for better text readability */}
            <View style={styles.imageGradientOverlay} />
            
            {/* Offer Badge Overlay */}
            <View style={styles.offerBadge}>
              <Text style={styles.offerBadgeText}>{item.discount}</Text>
            </View>

            {/* Urgency Badge */}
            {item.urgency && (
              <View style={styles.urgencyBadgeTop}>
                <Text style={styles.urgencyBadgeText}>{item.urgency}</Text>
              </View>
            )}
          </View>

          {/* Content Section */}
          <View style={styles.offerContentSection}>
            {/* Shop Header */}
            <View style={styles.shopHeader}>
              <View style={styles.shopInfo}>
                <Image source={{ uri: item.shopLogo }} style={styles.shopLogo} />
                <View style={styles.shopDetails}>
                  <Text style={styles.shopName}>{item.shopName}</Text>
                  <View style={styles.shopMeta}>
                    {item.rating && (
                      <View style={styles.ratingContainer}>
                        <Text style={styles.ratingStar}>⭐</Text>
                        <Text style={styles.ratingText}>{item.rating}</Text>
                      </View>
                    )}
                    <Text style={styles.deliveryTime}>{item.deliveryTime}</Text>
                  </View>
                </View>
              </View>
              
              {/* Valid Until */}
              {item.validUntil && (
                <View style={styles.validUntilContainer}>
                  <Text style={styles.validUntilText}>⏰ {item.validUntil}</Text>
                </View>
              )}
            </View>

            {/* Offer Details */}
            <View style={styles.offerDetails}>
              <Text style={styles.offerTitle}>{item.title}</Text>
              <Text style={styles.offerDescription}>{item.description}</Text>
              
              {/* Price Section */}
              {item.originalPrice && item.newPrice && (
                <View style={styles.priceSection}>
                  <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                  <Text style={styles.newPrice}>{item.newPrice}</Text>
                </View>
              )}
            </View>

            {/* Action Footer */}
            <View style={styles.offerFooter}>
              <Text style={styles.ctaText}>View Menu →</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

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

        {/* Offers Banner - Horizontal Scrolling */}
        <View style={styles.offersSection}>
          <View style={styles.offersHeader}>
            <View style={styles.offersTitleContainer}>
              <Text style={styles.offersTitle}>🔥 Hot Offers & Deals</Text>
              <View style={styles.liveIndicator}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            </View>
          </View>
          <FlatList
            data={sampleOffers}
            renderItem={renderOfferItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offersList}
            decelerationRate="fast"
            snapToInterval={300}
            snapToAlignment="center"
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          />
        </View>

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
