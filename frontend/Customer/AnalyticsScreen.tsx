import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Background from '../Background';

const { width: screenWidth } = Dimensions.get('window');

interface AnalyticsScreenProps {
  userName: string;
  onBack: () => void;
}

interface MonthlyData {
  month: string;
  amount: number;
  orders: number;
}

interface CategoryData {
  name: string;
  amount: number;
  color: string;
  percentage: number;
}

interface ShopData {
  name: string;
  orders: number;
  amount: number;
}

export default function AnalyticsScreen({ userName, onBack }: AnalyticsScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [selectedTab, setSelectedTab] = useState<'spending' | 'orders' | 'shops'>('spending');

  // Sample data - in real app, this would come from API
  const monthlyData: MonthlyData[] = [
    { month: 'Jan', amount: 1200, orders: 12 },
    { month: 'Feb', amount: 1500, orders: 15 },
    { month: 'Mar', amount: 900, orders: 9 },
    { month: 'Apr', amount: 1800, orders: 18 },
    { month: 'May', amount: 2100, orders: 21 },
    { month: 'Jun', amount: 1650, orders: 16 },
  ];

  const categoryData: CategoryData[] = [
    { name: 'Snacks', amount: 2400, color: '#FF6B35', percentage: 35 },
    { name: 'Beverages', amount: 1800, color: '#4ECDC4', percentage: 26 },
    { name: 'Meals', amount: 3200, color: '#45B7D1', percentage: 23 },
    { name: 'Desserts', amount: 900, color: '#96CEB4', percentage: 16 },
  ];

  const shopData: ShopData[] = [
    { name: 'Bharti Cafe', orders: 45, amount: 3200 },
    { name: 'Canteen B', orders: 28, amount: 1800 },
    { name: 'Juice Corner', orders: 15, amount: 900 },
    { name: 'Sandwich Bar', orders: 12, amount: 750 },
  ];

  const totalSpent = monthlyData.reduce((sum, item) => sum + item.amount, 0);
  const totalOrders = monthlyData.reduce((sum, item) => sum + item.orders, 0);
  const avgOrderValue = totalSpent / totalOrders;

  const renderSimpleBarChart = () => (
    <View style={styles.simpleChart}>
      {monthlyData.map((item, index) => {
        const maxValue = Math.max(...monthlyData.map(d => d.amount));
        const barHeight = (item.amount / maxValue) * 120;
        
        return (
          <View key={index} style={styles.barContainer}>
            <Text style={styles.barValue}>₹{item.amount}</Text>
            <View style={[styles.bar, { height: barHeight, backgroundColor: '#FF6B35' }]} />
            <Text style={styles.barLabel}>{item.month}</Text>
          </View>
        );
      })}
    </View>
  );

  const renderSimplePieChart = () => (
    <View style={styles.pieChartContainer}>
      <View style={styles.pieChart}>
        {categoryData.map((item, index) => {
          const rotation = index * 90;
          return (
            <View
              key={index}
              style={[
                styles.pieSlice,
                {
                  backgroundColor: item.color,
                  transform: [{ rotate: `${rotation}deg` }],
                }
              ]}
            />
          );
        })}
      </View>
      <View style={styles.pieLegend}>
        {categoryData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.name} ({item.percentage}%)</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSpendingTab = () => (
    <View style={styles.tabContent}>
      {/* Summary Cards */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Spent</Text>
          <Text style={styles.summaryValue}>₹{totalSpent.toLocaleString()}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Avg Order</Text>
          <Text style={styles.summaryValue}>₹{Math.round(avgOrderValue)}</Text>
        </View>
      </View>

      {/* Simple Bar Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Monthly Spending Trend</Text>
        {renderSimpleBarChart()}
      </View>

      {/* Simple Pie Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Spending by Category</Text>
        {renderSimplePieChart()}
      </View>
    </View>
  );

  const renderOrdersTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Orders</Text>
          <Text style={styles.summaryValue}>{totalOrders}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>This Month</Text>
          <Text style={styles.summaryValue}>{monthlyData[monthlyData.length - 1]?.orders || 0}</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Monthly Orders</Text>
        <View style={styles.simpleChart}>
          {monthlyData.map((item, index) => {
            const maxValue = Math.max(...monthlyData.map(d => d.orders));
            const barHeight = (item.orders / maxValue) * 120;
            
            return (
              <View key={index} style={styles.barContainer}>
                <Text style={styles.barValue}>{item.orders}</Text>
                <View style={[styles.bar, { height: barHeight, backgroundColor: '#4ECDC4' }]} />
                <Text style={styles.barLabel}>{item.month}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );

  const renderShopsTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.chartTitle}>Favorite Shops</Text>
      {shopData.map((shop, index) => (
        <View key={index} style={styles.shopItem}>
          <View style={styles.shopInfo}>
            <Text style={styles.shopName}>{shop.name}</Text>
            <Text style={styles.shopOrders}>{shop.orders} orders</Text>
          </View>
          <Text style={styles.shopAmount}>₹{shop.amount.toLocaleString()}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <Background>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.title}>📊 Analytics</Text>
            <Text style={styles.subtitle}>Your ordering insights</Text>
          </View>
        </View>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {(['week', 'month', 'year'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period && styles.periodButtonTextActive,
              ]}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tabs */}
        <View style={styles.tabSelector}>
          {(['spending', 'orders', 'shops'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                selectedTab === tab && styles.tabButtonActive,
              ]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[
                styles.tabButtonText,
                selectedTab === tab && styles.tabButtonTextActive,
              ]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {selectedTab === 'spending' && renderSpendingTab()}
          {selectedTab === 'orders' && renderOrdersTab()}
          {selectedTab === 'shops' && renderShopsTab()}
        </ScrollView>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  backArrow: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#FF6B35',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  periodButtonTextActive: {
    color: '#fff',
  },
  tabSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  tabButtonTextActive: {
    color: '#FF6B35',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tabContent: {
    paddingBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  simpleChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 160,
    paddingHorizontal: 10,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
  barValue: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  barLabel: {
    fontSize: 12,
    color: '#666',
  },
  pieChartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  pieChart: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    marginRight: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  pieSlice: {
    position: 'absolute',
    width: 60,
    height: 120,
    left: 60,
    top: 0,
    transformOrigin: '0 50%',
  },
  pieLegend: {
    flex: 1,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  shopItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  shopInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  shopOrders: {
    fontSize: 14,
    color: '#666',
  },
  shopAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
  },
});
