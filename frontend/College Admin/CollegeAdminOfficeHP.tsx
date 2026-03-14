import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Alert } from 'react-native';
import { Text } from '../components/GlobalComponents';
import Background from '../Background';
import Login from '../Login';
import ShopCard from '../Shops/ShopCard';
import CollegeProfile from './CollegeProfile';
import GeolocationBoundary from './GeolocationBoundary';
import ShopManagement from './ShopManagement';
import FloatingHeader from './FloatingHeader';
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

function CollegeAdminOfficeHP({ userName = 'Admin', collegeName = 'College' }: Props) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [logout, setLogout] = useState(false);
  const [currentView, setCurrentView] = useState<'profile' | 'boundary' | 'shops' | 'shopCard'>('profile');

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

  const handleLogout = () => {
    setLogout(true);
    setShowProfileMenu(false);
  };

  const handleCloseProfileMenu = () => {
    setShowProfileMenu(false);
  };

  if (logout) return <Login />;

  // Shop Card View
  if (currentView === 'shopCard' && selectedShop) {
    return (
      <Background>
        <FloatingHeader
          userName={userName}
          collegeName={collegeName}
          activeTab="profileMenu"
          onProfilePress={() => setCurrentView('profile')}
          onBoundaryPress={() => setCurrentView('boundary')}
          onShopPress={() => setCurrentView('shops')}
          onProfilePicPress={() => setShowProfileMenu(!showProfileMenu)}
          showProfileMenu={showProfileMenu}
          onLogout={handleLogout}
          onCloseProfileMenu={handleCloseProfileMenu}
        />
        <View style={styles.pageContent}>
          <ShopCard
            onBack={() => setCurrentView('profile')}
            userName={selectedShop.ownerName}
            shopId={selectedShop.shopId}
          />
        </View>
      </Background>
    );
  }

  return (
    <Background>
      <FloatingHeader
        userName={userName}
        collegeName={collegeName}
        activeTab={currentView === 'shopCard' ? 'profileMenu' : currentView}
        onProfilePress={() => setCurrentView('profile')}
        onBoundaryPress={() => setCurrentView('boundary')}
        onShopPress={() => setCurrentView('shops')}
        onProfilePicPress={() => setShowProfileMenu(!showProfileMenu)}
        showProfileMenu={showProfileMenu}
        onLogout={handleLogout}
        onCloseProfileMenu={handleCloseProfileMenu}
      />

      {/* Main Content */}
      <View style={styles.pageContent}>
        {/* College Profile View */}
        {currentView === 'profile' && (
          <CollegeProfile
            profile={collegeProfile}
            onSave={handleSaveProfile}
            onBack={() => setCurrentView('profile')}
          />
        )}

        {/* Geolocation Boundary View */}
        {currentView === 'boundary' && (
          <GeolocationBoundary
            onBack={() => setCurrentView('profile')}
            onSave={handleSaveBoundary}
            initialBoundary={boundary}
          />
        )}

        {/* Shop Management View */}
        {currentView === 'shops' && (
          <ShopManagement
            shops={shops}
            onBack={() => setCurrentView('profile')}
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
