import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '../../components/GlobalComponents';

type ActiveTab = 'menu' | 'orders' | 'profile' | 'shop_card' | 'analytics';

interface FooterNavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function FooterNavigation({ activeTab, setActiveTab }: FooterNavigationProps) {
  return (
    <View style={styles.floatingFooter}>
      <View style={styles.footerItemsRow}>
        <TouchableOpacity
          style={[styles.footerItem, activeTab === 'menu' && styles.footerItemActive]}
          onPress={() => setActiveTab('menu')}
        >
          <Text style={[styles.footerIcon, activeTab === 'menu' && styles.footerIconActive]}>📋</Text>
          <Text style={[styles.footerLabel, activeTab === 'menu' && styles.footerLabelActive]}>Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.footerItem, activeTab === 'orders' && styles.footerItemActive]}
          onPress={() => setActiveTab('orders')}
        >
          <Text style={[styles.footerIcon, activeTab === 'orders' && styles.footerIconActive]}>📦</Text>
          <Text style={[styles.footerLabel, activeTab === 'orders' && styles.footerLabelActive]}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.footerItem, activeTab === 'analytics' && styles.footerItemActive]}
          onPress={() => setActiveTab('analytics')}
        >
          <Text style={[styles.footerIcon, activeTab === 'analytics' && styles.footerIconActive]}>📊</Text>
          <Text style={[styles.footerLabel, activeTab === 'analytics' && styles.footerLabelActive]}>Analytics</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.footerItem, activeTab === 'profile' && styles.footerItemActive]}
          onPress={() => setActiveTab('profile')}
        >
          <Text style={[styles.footerIcon, activeTab === 'profile' && styles.footerIconActive]}>👤</Text>
          <Text style={[styles.footerLabel, activeTab === 'profile' && styles.footerLabelActive]}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.footerItem, activeTab === 'shop_card' && styles.footerItemActive]}
          onPress={() => setActiveTab('shop_card')}
        >
          <Text style={[styles.footerIcon, activeTab === 'shop_card' && styles.footerIconActive]}>💳</Text>
          <Text style={[styles.footerLabel, activeTab === 'shop_card' && styles.footerLabelActive]}>Shop Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingFooter: {
    position: 'absolute',
    bottom: 70,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
    alignItems: 'center',
  },
  footerLogoContainer: {
    marginBottom: 8,
  },
  footerLogo: {
    width: 20,
    height: 20,
  },
  footerItemsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  footerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  footerItemActive: {
    backgroundColor: 'rgba(255,152,0,0.15)',
  },
  footerIcon: {
    fontSize: 18,
    color: '#666',
  },
  footerIconActive: {
    color: '#c09800',
  },
  footerLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 3,
    fontWeight: '500',
  },
  footerLabelActive: {
    color: '#c09800',
    fontWeight: '700',
  },
});
