import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from '../../components/GlobalComponents';

interface ShopCardContentProps {
  displayName: string;
}

export default function ShopCardContent({ displayName }: ShopCardContentProps) {
  return (
    <ScrollView style={styles.cardScroll} contentContainerStyle={styles.cardContent}>
      <View style={styles.shopCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>E-Canteen Shop Card</Text>
          <View style={styles.cardLogo}>
            <Text style={styles.cardLogoText}>☕</Text>
          </View>
        </View>
        
        <View style={styles.cardInfoRow}>
          <Text style={styles.cardLabel}>Shop ID:</Text>
          <Text style={styles.cardValue}>SBVCOE1350</Text>
        </View>
        
        <View style={styles.cardInfoRow}>
          <Text style={styles.cardLabel}>Shop Name:</Text>
          <Text style={styles.cardValue}>{displayName}</Text>
        </View>
        
        <View style={styles.cardInfoRow}>
          <Text style={styles.cardLabel}>Role:</Text>
          <Text style={styles.cardValue}>Shop</Text>
        </View>
        
        <View style={styles.cardInfoRow}>
          <Text style={styles.cardLabel}>Shop Owner Name:</Text>
          <Text style={styles.cardValue}>{displayName}</Text>
        </View>
        
        <View style={styles.cardInfoRow}>
          <Text style={styles.cardLabel}>Phone:</Text>
          <Text style={styles.cardValue}>+91 9080990312</Text>
        </View>
        
        <View style={styles.cardDivider} />
        
        <View style={styles.cardFooter}>
          <Text style={styles.cardFooterText}>Authorized for food service operations</Text>
          <Text style={styles.cardFooterSubtext}>Valid for current academic year</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardScroll: {
    flex: 1,
  },
  cardContent: {
    paddingBottom: 100,
  },
  shopCard: {
    backgroundColor: '#f57749ff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  cardLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  cardLogoText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
  },
  cardInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  cardLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    flex: 1,
  },
  cardValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
    flex: 1.5,
    textAlign: 'right',
  },
  cardDivider: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginVertical: 16,
  },
  cardFooter: {
    alignItems: 'center',
  },
  cardFooterText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardFooterSubtext: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
});
