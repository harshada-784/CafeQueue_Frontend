import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Background from '../Background';
import Login from '../Login';
import CanteenAdminAddItem from './canteen_admin_add_item';
import CanteenAdminEditItem from './canteen_admin_edit_item';
import { getItems, subscribe, setAvailable, deleteItem, SpecialItem } from '../dailySpecialsStore';
import Header from './components/Header';
import MenuContent from './components/MenuContent';
import OrdersContent from './components/OrdersContent';
import AnalyticsContent from './components/AnalyticsContent';
import ProfileContent from './components/ProfileContent';
import ShopCardContent from './components/ShopCardContent';
import TimeslotManagement from './components/TimeslotManagement';
import FooterNavigation from './components/FooterNavigation';

type Props = {
  userName?: string;
  currentUsername?: string;
};

type ActiveTab = 'menu' | 'orders' | 'profile' | 'timeslot' | 'analytics';

export default function CanteenAdminHP({ userName = 'User', currentUsername = '' }: Props) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [logout, setLogout] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('menu');
  const [showAddItem, setShowAddItem] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [displayName, setDisplayName] = useState(userName);
  const [accountUsername, setAccountUsername] = useState(currentUsername);
  const [displayPhotoUri, setDisplayPhotoUri] = useState<string | undefined>(undefined);
  
  // Profile form state
  const [profileName, setProfileName] = useState(userName);
  const [profileUsername, setProfileUsername] = useState(currentUsername);
  const [profilePhoto, setProfilePhoto] = useState<string | undefined>(undefined);
  const [profilePhotoError, setProfilePhotoError] = useState<string | null>(null);
  
  // Menu state
  const [items, setItems] = useState<SpecialItem[]>(getItems());
  const [menuSearch, setMenuSearch] = useState('');

  // Orders state for inline display
  const [ordersTab, setOrdersTab] = useState<'incoming' | 'picked' | 'previous'>('incoming');
  const [allOrders, setAllOrders] = useState([
    { id: '001', customerName: 'John Doe', items: [{ name: 'Burger', quantity: 2, price: 120 }, { name: 'Fries', quantity: 1, price: 80 }], total: 320, status: 'pending' as const, orderTime: '10:30 AM', estimatedTime: '10:45 AM' },
    { id: '002', customerName: 'Jane Smith', items: [{ name: 'Pizza', quantity: 1, price: 250 }, { name: 'Cold Drink', quantity: 2, price: 60 }], total: 370, status: 'preparing' as const, orderTime: '10:15 AM', estimatedTime: '10:35 AM' },
    { id: '004', customerName: 'Sarah Wilson', items: [{ name: 'Sandwich', quantity: 1, price: 90 }, { name: 'Coffee', quantity: 1, price: 50 }], total: 140, status: 'ready' as const, orderTime: '10:20 AM' },
  ]);

  useEffect(() => {
    const unsub = subscribe(() => setItems(getItems()));
    return unsub;
  }, []);

  if (logout) return <Login />;

  // Add/Edit item modals
  if (showAddItem) {
    return <CanteenAdminAddItem onDone={() => setShowAddItem(false)} onBack={() => setShowAddItem(false)} />;
  }
  if (showEditItem && editId != null) {
    return <CanteenAdminEditItem itemId={editId} onDone={() => setShowEditItem(false)} onBack={() => setShowEditItem(false)} />;
  }

  return (
    <Background theme="modern">
      <View style={styles.container}>
        {/* Header - Static */}
        <Header
          displayName={displayName}
          showProfileMenu={showProfileMenu}
          setShowProfileMenu={setShowProfileMenu}
          setLogout={setLogout}
        />

        {/* Scrollable Content */}
        <ScrollView style={styles.scrollableContent} showsVerticalScrollIndicator={false}>
          {activeTab === 'menu' && (
            <MenuContent
              items={items}
              menuSearch={menuSearch}
              setMenuSearch={setMenuSearch}
              setShowAddItem={setShowAddItem}
              setEditId={setEditId}
              setShowEditItem={setShowEditItem}
              setAvailable={setAvailable}
              deleteItem={deleteItem}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersContent
              ordersTab={ordersTab}
              setOrdersTab={setOrdersTab}
              allOrders={allOrders}
            />
          )}

          {activeTab === 'analytics' && <AnalyticsContent />}

          {activeTab === 'profile' && (
            <ProfileContent
              profileName={profileName}
              setProfileName={setProfileName}
              profileUsername={profileUsername}
              setProfileUsername={setProfileUsername}
              profilePhoto={profilePhoto}
              profilePhotoError={profilePhotoError}
            />
          )}

          {activeTab === 'timeslot' && (
            <TimeslotManagement shopName={displayName} />
          )}
        </ScrollView>

        {/* Footer Navigation - Static */}
        <FooterNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollableContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
