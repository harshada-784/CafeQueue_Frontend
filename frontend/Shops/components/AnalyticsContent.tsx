import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text } from '../../components/GlobalComponents';

export default function AnalyticsContent() {
  return (
    <ScrollView style={styles.analyticsScroll} contentContainerStyle={styles.analyticsContent}>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>156</Text>
          <Text style={styles.statLabel}>Total Orders</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>₹45,230</Text>
          <Text style={styles.statLabel}>Total Revenue</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>28</Text>
          <Text style={styles.statLabel}>Menu Items</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>4.8⭐</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Today's Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Orders</Text>
          <Text style={styles.summaryValue}>24</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Revenue</Text>
          <Text style={styles.summaryValue}>₹3,450</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Avg Order Value</Text>
          <Text style={styles.summaryValue}>₹144</Text>
        </View>
      </View>
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Weekly Performance</Text>
        <View style={styles.chartPlaceholder}>
          <Image 
            source={require('../../assets/order_image.png')} 
            style={styles.chartImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  analyticsScroll: {
    flex: 1,
  },
  analyticsContent: {
    paddingBottom: 100,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FF9800',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  summaryLabel: {
    fontSize: 15,
    color: '#555',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
  },
  chartPlaceholder: {
    height: 150,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartImage: {
    width: '100%',
    height: '100%',
  },
  chartText: {
    fontSize: 16,
    color: '#888',
  },
});
