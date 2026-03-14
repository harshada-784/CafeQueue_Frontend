import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from '../components/GlobalComponents';
import { styles } from '../../css style/FloatingHeader.styles';

interface Props {
  userName?: string;
  collegeName?: string;
  activeTab?: 'profile' | 'boundary' | 'shops' | 'analytics' | 'profileMenu';
  onProfilePress: () => void;
  onBoundaryPress: () => void;
  onShopPress: () => void;
  onAnalyticsPress?: () => void;
  onProfilePicPress: () => void;
  showProfileMenu: boolean;
  onLogout: () => void;
  onCloseProfileMenu: () => void;
}

export default function FloatingHeader({
  userName = 'Admin',
  collegeName = 'College',
  activeTab = 'profile',
  onProfilePress,
  onBoundaryPress,
  onShopPress,
  onAnalyticsPress,
  onProfilePicPress,
  showProfileMenu,
  onLogout,
  onCloseProfileMenu,
}: Props) {
  return (
    <View style={styles.floatingHeader}>
      {/* Navigation Items - All 5 Icons Including Analytics */}
      <View style={styles.navItems}>
        <TouchableOpacity
          style={[styles.navItem, activeTab === 'profile' && styles.activeNavItem]}
          activeOpacity={0.8}
          onPress={onProfilePress}
        >
          <View style={styles.iconPlaceholder}>
            <Text style={[styles.iconText, activeTab === 'profile' && styles.activeIconText]}>🏫</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'boundary' && styles.activeNavItem]}
          activeOpacity={0.8}
          onPress={onBoundaryPress}
        >
          <View style={styles.iconPlaceholder}>
            <Text style={[styles.iconText, activeTab === 'boundary' && styles.activeIconText]}>📍</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'shops' && styles.activeNavItem]}
          activeOpacity={0.8}
          onPress={onShopPress}
        >
          <Image
            source={require('../assets/shop.png')}
            style={[styles.navIcon, activeTab === 'shops' && styles.activeNavIcon]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'analytics' && styles.activeNavItem]}
          activeOpacity={0.8}
          onPress={onAnalyticsPress}
        >
          <View style={styles.iconPlaceholder}>
            <Text style={[styles.iconText, activeTab === 'analytics' && styles.activeIconText]}>📊</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'profileMenu' && styles.activeNavItem]}
          activeOpacity={0.8}
          onPress={onProfilePicPress}
        >
          <Image
            source={require('../assets/profile-icon.png')}
            style={[styles.navIcon, activeTab === 'profileMenu' && styles.activeNavIcon]}
          />
        </TouchableOpacity>
      </View>

      {/* Profile Menu - Appears as overlay when profile icon is clicked */}
      {showProfileMenu && (
        <>
          {/* Backdrop to close on outside tap */}
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={onCloseProfileMenu}
          />
          <View style={styles.profileMenu}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>{userName}</Text>
              <Text style={styles.menuSubtitle}>{collegeName}</Text>
            </View>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={onLogout}>
              <Text style={styles.menuItemText}>🚪 Logout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
