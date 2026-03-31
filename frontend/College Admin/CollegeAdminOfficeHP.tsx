import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Text } from '../components/GlobalComponents';
import Background from '../Background';
import Login from '../Login';
import ShopCard from '../Shops/ShopCard';
import CollegeProfile from './CollegeProfile';
import LeafletMapScreen from './LeafletMapScreen';
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

interface CollegeProfileType {
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

export default function CollegeAdminOfficeHP({ userName, collegeName }: Props) {
  const [currentView, setCurrentView] = useState<'profile' | 'boundary' | 'shops' | 'analytics' | 'shopCard'>('profile');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isShopFormMode, setIsShopFormMode] = useState(false);
  const [logout, setLogout] = useState(false);

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
  ]);

  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  const [collegeProfile, setCollegeProfile] = useState<CollegeProfileType>({
    name: collegeName || '',
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

  const handleShopViewChange = (isFormMode: boolean) => {
    setIsShopFormMode(isFormMode);
  };

  const handleAddShop = (shopData: Omit<Shop, 'id' | 'shopId'>) => {
    const shopId = `SHOP${Math.floor(1000 + Math.random() * 9000)}`;
    const newShop: Shop = {
      ...shopData,
      id: Date.now().toString(),
      shopId,
    };
    setShops(prev => [...prev, newShop]);
    Alert.alert('Success', 'Shop added successfully');
  };

  const handleEditShop = (updatedShop: Shop) => {
    setShops(prev => prev.map(shop => shop.id === updatedShop.id ? updatedShop : shop));
    Alert.alert('Success', 'Shop updated successfully');
  };

  const handleDeleteShop = (shopId: string) => {
    setShops(prev => prev.filter(shop => shop.id !== shopId));
    Alert.alert('Deleted', 'Shop removed');
  };

  const handleToggleShopStatus = (shopId: string) => {
    setShops(prev =>
      prev.map(shop =>
        shop.id === shopId ? { ...shop, isActive: !shop.isActive } : shop
      )
    );
  };

  const handleSaveProfile = (profile: CollegeProfileType) => {
    setCollegeProfile(profile);
    Alert.alert('Saved', 'Profile updated');
  };

  const generateShopCard = (shop: Shop) => {
    setSelectedShop(shop);
    setCurrentView('shopCard');
  };

  const handleLogout = () => {
    setLogout(true);
    setShowProfileMenu(false);
  };

  if (logout) return <Login />;

  return (
    <Background>

      {/* Header */}
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
          onCloseProfileMenu={() => setShowProfileMenu(false)}
        />
      )}

      <View style={{ flex: 1 }}>

        {/* PROFILE */}
        {currentView === 'profile' && (
          <ScrollView style={styles.scrollableContent}>
            <CollegeProfile
              profile={collegeProfile}
              onSave={handleSaveProfile}
              onBack={() => setCurrentView('profile')}
            />
          </ScrollView>
        )}

        {/* ✅ LEAFLET MAP (FULL SCREEN, NO SCROLL) */}
        {currentView === 'boundary' && (
          <LeafletMapScreen />
        )}

        {/* SHOPS */}
        {currentView === 'shops' && (
          <ScrollView style={styles.scrollableContent}>
            <ShopManagement
              shops={shops}
              onBack={() => setCurrentView('profile')}
              onAddShop={handleAddShop}
              onEditShop={handleEditShop}
              onDeleteShop={handleDeleteShop}
              onToggleShopStatus={handleToggleShopStatus}
              onViewChange={handleShopViewChange}
            />
          </ScrollView>
        )}

        {/* ANALYTICS */}
        {currentView === 'analytics' && (
          <ScrollView style={styles.scrollableContent}>
            <Analytics onBack={() => setCurrentView('profile')} />
          </ScrollView>
        )}

      </View>

    </Background>
  );
}