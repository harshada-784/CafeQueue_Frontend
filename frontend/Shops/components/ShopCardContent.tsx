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
          <Text style={styles.cardTitle}>Canteen Card</Text>
          <View style={styles.cardLogo}>
            <Text style={styles.cardLogoText}>☕</Text>
          </View>
        </View>
        <Text style={styles.cardNumber}>**** **** **** 1234</Text>
        <View style={styles.cardInfoRow}>
          <Text style={styles.cardLabel}>Card Holder</Text>
          <Text style={styles.cardValue}>{displayName}</Text>
        </View>
        <View style={styles.cardInfoRow}>
          <Text style={styles.cardLabel}>Valid Thru</Text>
          <Text style={styles.cardValue}>12/25</Text>
        </View>
        <View style={styles.cardDivider} />
        <View style={styles.cardFooter}>
          <Text style={styles.cardFooterText}>Balance: ₹2,450</Text>
          <Text style={styles.cardFooterSubtext}>Last updated: Today</Text>
        </View>
      </View>

      <View style={styles.cardUsage}>
        <Text style={styles.cardUsageTitle}>How to use your card:</Text>
        <Text style={styles.cardUsageText}>• Present this card at the counter</Text>
        <Text style={styles.cardUsageText}>• Tap to pay for quick checkout</Text>
        <Text style={styles.cardUsageText}>• Earn points with every purchase</Text>
        <Text style={styles.cardUsageText}>• Get exclusive discounts and offers</Text>
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
    backgroundColor: '#FF9800',
    borderRadius: 16,
    padding: 20,
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
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  cardLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLogoText: {
    fontSize: 28,
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
    letterSpacing: 2,
  },
  cardInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  cardLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
  },
  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  cardFooter: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
  },
  cardFooterText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
  },
  cardFooterSubtext: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  cardUsage: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardUsageTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 10,
  },
  cardUsageText: {
    fontSize: 13,
    color: '#555',
    marginVertical: 3,
  },
});
