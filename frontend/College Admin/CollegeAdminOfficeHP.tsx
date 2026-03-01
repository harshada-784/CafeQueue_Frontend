import React, { useState } from 'react';
import { View, TouchableOpacity, Platform, Image, Alert } from 'react-native';
import { Text } from '../components/GlobalComponents';
import Background from '../Background';
import Login from '../Login';
import ShopCard from '../Shops/ShopCard';
import CollegeProfile from './CollegeProfile';
import GeolocationBoundary from './GeolocationBoundary';
import ShopManagement from './ShopManagement';
import { styles } from '../../css style/CollegeAdminOfficeHP.styles';

interface Props {
  userName?: string;
  collegeName?: string;
}

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

interface CollegeProfile {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  website: string;
  establishedYear: string;
  totalStudents: string;
}

interface BoundaryPoint {
  latitude: number;
  longitude: number;
}

function CollegeAdminOfficeHP({ userName = 'User', collegeName = 'College' }: Props) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [logout, setLogout] = useState(false);
  const [currentView, setCurrentView] = useState<'main' | 'profile' | 'boundary' | 'shops' | 'shopCard'>('main');

  // State management
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [collegeProfile, setCollegeProfile] = useState<CollegeProfile>({
    name: collegeName,
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    website: '',
    establishedYear: '',
    totalStudents: '',
  });
  const [boundary, setBoundary] = useState<BoundaryPoint[]>([]);

  // Shop management functions
  const handleAddShop = (shopData: Omit<Shop, 'id' | 'shopId'>) => {
    const shopId = `SBVCOE${Math.floor(1000 + Math.random() * 9000)}`;
    const newShop: Shop = {
      ...shopData,
      id: Date.now().toString(),
      shopId,
    };
    setShops(prev => [...prev, newShop]);
    Alert.alert('Success', 'Shop added successfully');
  };

  const handleEditShop = (updatedShop: Shop) => {
    setShops(prev => prev.map(shop => 
      shop.id === updatedShop.id ? updatedShop : shop
    ));
    Alert.alert('Success', 'Shop updated successfully');
  };

  const handleDeleteShop = (shopId: string) => {
    Alert.alert(
      'Delete Shop',
      'Are you sure you want to delete this shop?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setShops(prev => prev.filter(shop => shop.id !== shopId));
            Alert.alert('Success', 'Shop deleted successfully');
          },
        },
      ]
    );
  };

  const handleToggleShopStatus = (shopId: string) => {
    setShops(prev => prev.map(shop => 
      shop.id === shopId ? { ...shop, isActive: !shop.isActive } : shop
    ));
  };

  const handleSaveProfile = (profile: CollegeProfile) => {
    setCollegeProfile(profile);
    Alert.alert('Success', 'College profile updated successfully');
  };

  const handleSaveBoundary = (boundaryPoints: BoundaryPoint[]) => {
    setBoundary(boundaryPoints);
    Alert.alert('Success', 'Geolocation boundary saved successfully');
  };

  const generateShopCard = (shop: Shop) => {
    setSelectedShop(shop);
    setCurrentView('shopCard');
  };

  if (logout) return <Login />;

  // Shop Card View
  if (currentView === 'shopCard' && selectedShop) {
    return (
      <ShopCard
        onBack={() => setCurrentView('main')}
        userName={selectedShop.ownerName}
        shopId={selectedShop.shopId}
      />
    );
  }

  return (
    <Background>
      <View style={styles.container}>
        {/* Header with profile and greeting - Only show on main screen */}
        {currentView === 'main' && (
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => setShowProfileMenu((s) => !s)} activeOpacity={0.8}>
              <Image
                source={require('../assets/profile-icon.png')}
                style={styles.profilePic}
              />
            </TouchableOpacity>
            <View style={styles.greetingWrap}>
              <Text style={styles.greeting}>Hello!!</Text>
              <Text style={styles.collegeName}>{collegeName}</Text>
            </View>
            {showProfileMenu && (
              <>
                {/* Backdrop to close on outside tap */}
                <TouchableOpacity
                  style={styles.backdrop}
                  activeOpacity={1}
                  onPress={() => setShowProfileMenu(false)}
                />
                <View style={styles.profileMenu}>
                  <TouchableOpacity style={styles.profileMenuItem} onPress={() => setLogout(true)}>
                    <Text style={styles.profileMenuText}>Logout</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}

        {/* Welcome message - Only show on main screen */}
        {currentView === 'main' && (
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>College Administration</Text>
            <Text style={styles.welcomeSubtitle}>Manage campus services and settings</Text>
          </View>
        )}

        {/* Main tiles - Different views based on currentView */}
        {currentView === 'main' && (
          <View style={styles.tilesGrid}>
            <TouchableOpacity
              style={styles.tile}
              activeOpacity={0.9}
              onPress={() => setCurrentView('profile')}
            >
              <View style={[styles.tileIconImage]}>
                <Image
                  source={require('../assets/profile-icon.png')}
                  style={styles.tileImageContent}
                />
              </View>
              <Text style={styles.tileLabel}>College Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tile}
              activeOpacity={0.9}
              onPress={() => setCurrentView('boundary')}
            >
              <View style={[styles.tileIconImage]}>
                <Image
                  source={require('../assets/shop.png')}
                  style={styles.tileImageContent}
                />
              </View>
              <Text style={styles.tileLabel}>Location Boundaries</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tile}
              activeOpacity={0.9}
              onPress={() => setCurrentView('shops')}
            >
              <View style={[styles.tileIconImage]}>
                <Image
                  source={require('../assets/shop.png')}
                  style={styles.tileImageContent}
                />
              </View>
              <Text style={styles.tileLabel}>Shop Management</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* College Profile View */}
        {currentView === 'profile' && (
          <CollegeProfile
            profile={collegeProfile}
            onSave={handleSaveProfile}
            onBack={() => setCurrentView('main')}
          />
        )}

        {/* Geolocation Boundary View */}
        {currentView === 'boundary' && (
          <GeolocationBoundary
            onBack={() => setCurrentView('main')}
            onSave={handleSaveBoundary}
            initialBoundary={boundary}
          />
        )}

        {/* Shop Management View */}
        {currentView === 'shops' && (
          <ShopManagement
            shops={shops}
            onBack={() => setCurrentView('main')}
            onAddShop={handleAddShop}
            onEditShop={handleEditShop}
            onDeleteShop={handleDeleteShop}
            onToggleShopStatus={handleToggleShopStatus}
          />
        )}
      </View>
    </Background>
  );
}

export default CollegeAdminOfficeHP;
