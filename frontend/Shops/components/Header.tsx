import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text } from '../../components/GlobalComponents';

interface HeaderProps {
  displayName: string;
  showProfileMenu: boolean;
  setShowProfileMenu: (show: boolean) => void;
  setLogout: (logout: boolean) => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export default function Header({ displayName, showProfileMenu, setShowProfileMenu, setLogout, activeTab, setActiveTab }: HeaderProps) {
  const [showOffers, setShowOffers] = React.useState(false);
  
  const handleOfferPress = (offerType: string) => {
    switch(offerType) {
      case 'analytics':
        console.log('Analytics subscription selected');
        break;
      case 'premium':
        console.log('Premium features selected');
        break;
      case 'marketing':
        console.log('Marketing tools selected');
        break;
    }
    setShowOffers(false);
  };

  return (
    <>
      {/* Main Header Container */}
      <View style={styles.headerContainer}>
        {/* User Info Header */}
        <View style={styles.userHeader}>
          {/* Background Image */}
          <Image
            source={require('../../assets/coffeebeans.png')}
            style={styles.backgroundImage}
          />
          
          <TouchableOpacity onPress={() => setShowProfileMenu(!showProfileMenu)} activeOpacity={0.8}>
            <Image
              source={require('../../assets/profile-icon.png')}
              style={styles.userProfilePic}
            />
          </TouchableOpacity>
          <View style={styles.userTextContainer}>
            <Text style={styles.greetingText}>Good Afternoon</Text>
            <Text style={styles.userName}>{displayName}</Text>
          </View>
        </View>
      </View>

      {/* Profile Menu */}
      {showProfileMenu && (
        <>
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
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 10,
  },
  // Simple User Header
  userHeader: {
    backgroundColor: '#c09a7eff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  userProfilePic: {
    width: 50,
    height: 50,
    marginRight: 15,
    zIndex: 2,
  },
  userTextContainer: {
    flex: 1,
    zIndex: 2,
  },
  greetingText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  // Profile Menu
  profileMenu: {
    position: 'absolute',
    top: 34,
    left: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    paddingVertical: 6,
    minWidth: 140,
    zIndex: 3000,
  },
  profileMenuItem: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  profileMenuText: {
    fontSize: 16,
    color: '#111',
    fontWeight: '600',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2000,
  },
});
