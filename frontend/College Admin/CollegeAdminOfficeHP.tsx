import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Text } from '../components/GlobalComponents';
import Background from '../Background';
import Login from '../Login';
import ShopCard from '../Shops/ShopCard';
import CollegeProfile from './CollegeProfile';
import GeolocationBoundary from './GeolocationBoundary';
import ShopManagement from './ShopManagement';
import Analytics from './Analytics';
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

export default function CollegeAdminOfficeHP({ userName, collegeName }: Props) {
  const [currentView, setCurrentView] = useState<'profile' | 'boundary' | 'shops' | 'analytics' | 'shopCard'>('profile');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isShopFormMode, setIsShopFormMode] = useState(false); // New state for shop form mode management
  const [logout, setLogout] = useState(false); // Add logout state

  // Handle shop form mode changes
  const handleShopViewChange = (isFormMode: boolean) => {
    setIsShopFormMode(isFormMode);
  };
  const [shops, setShops] = useState<Shop[]>([
    {
      id: '1',
      shopId: 'SHOP001',
      name: 'Bharti Cafe',
      ownerName: 'Ramesh Kumar',
      phone: '9876543210',
      email: 'bharti@cafe.com',
      address: 'Near Main Building, Block A',
      category: 'Food & Beverages',
      establishedDate: '2015-03-15',
      isActive: true,
    },
    {
      id: '2',
      shopId: 'SHOP002',
      name: 'Juice Corner',
      ownerName: 'Priya Sharma',
      phone: '9876543211',
      email: 'juice@corner.com',
      address: 'Canteen Area, Ground Floor',
      category: 'Beverages',
      establishedDate: '2018-07-20',
      isActive: true,
    },
    {
      id: '3',
      shopId: 'SHOP003',
      name: 'Sandwich Bar',
      ownerName: 'Amit Patel',
      phone: '9876543212',
      email: 'sandwich@bar.com',
      address: 'Near Library Building',
      category: 'Food',
      establishedDate: '2019-01-10',
      isActive: false,
    },
    {
      id: '4',
      shopId: 'SHOP004',
      name: 'Stationery Shop',
      ownerName: 'Sunita Reddy',
      phone: '9876543213',
      email: 'stationery@shop.com',
      address: 'Academic Block, Room 101',
      category: 'Stationery',
      establishedDate: '2016-11-05',
      isActive: true,
    },
  ]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [collegeProfile, setCollegeProfile] = useState<CollegeProfile>({
    name: collegeName || '', // Handle optional collegeName
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
          onAnalyticsPress={() => setCurrentView('analytics')}
          onProfilePicPress={() => setShowProfileMenu(!showProfileMenu)}
          showProfileMenu={showProfileMenu}
          onLogout={handleLogout}
          onCloseProfileMenu={handleCloseProfileMenu}
        />
        <View style={styles.pageContent}>
          <ScrollView style={styles.scrollableContent} showsVerticalScrollIndicator={false}>
            <ShopCard
              onBack={() => setCurrentView('profile')}
              userName={selectedShop.ownerName}
              shopName={selectedShop.name}
              shopId={selectedShop.shopId}
            />
          </ScrollView>
        </View>
      </Background>
    );
  }

  return (
    <Background>
      {/* Only show floating header when not in shop form mode */}
      {!(currentView === 'shops' && isShopFormMode) && (
        <FloatingHeader
          userName={userName}
          collegeName={collegeName}
          activeTab={currentView === 'shopCard' ? 'profileMenu' : currentView}
          onProfilePress={() => setCurrentView('profile')}
          onBoundaryPress={() => setCurrentView('boundary')}
          onShopPress={() => setCurrentView('shops')}
          onAnalyticsPress={() => setCurrentView('analytics')}
          onProfilePicPress={() => setShowProfileMenu(!showProfileMenu)}
          showProfileMenu={showProfileMenu}
          onLogout={handleLogout}
          onCloseProfileMenu={handleCloseProfileMenu}
        />
      )}

      <View style={styles.pageContent}>
          <ScrollView style={styles.scrollableContent} showsVerticalScrollIndicator={false}>
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
                onViewChange={handleShopViewChange}
              />
            )}

            {/* Analytics View */}
            {currentView === 'analytics' && (
              <Analytics onBack={() => setCurrentView('profile')} />
            )}
          </ScrollView>
        </View>
    </Background>
  );
}
