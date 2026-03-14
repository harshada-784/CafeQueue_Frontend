import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Text as GlobalText } from '../components/GlobalComponents';
import { analyticsStyles } from '../../css style/Analytics.styles';

interface Props {
  onBack?: () => void;
}

export default function Analytics({ onBack }: Props) {
  // Mock data for demonstration
  const shopStats = {
    total: 24,
    active: 18,
    inactive: 6,
    newThisMonth: 3,
  };

  const studentStats = {
    total: 2850,
    male: 1520,
    female: 1330,
    newThisMonth: 45,
  };

  const staffStats = {
    total: 120,
    teaching: 80,
    nonTeaching: 40,
    newThisMonth: 5,
  };

  const revenueData = [
    { month: 'Jan', amount: 45000 },
    { month: 'Feb', amount: 52000 },
    { month: 'Mar', amount: 48000 },
    { month: 'Apr', amount: 61000 },
    { month: 'May', amount: 58000 },
    { month: 'Jun', amount: 67000 },
  ];

  const shopCategories = [
    { category: 'Food & Beverages', count: 12, percentage: 50 },
    { category: 'Stationery', count: 6, percentage: 25 },
    { category: 'Books', count: 4, percentage: 17 },
    { category: 'Others', count: 2, percentage: 8 },
  ];

  return (
    <View style={analyticsStyles.formContainer}>
      <GlobalText style={analyticsStyles.formTitle}>📊 Analytics Dashboard</GlobalText>

      {/* Overview Cards */}
      <View style={analyticsStyles.overviewGrid}>
        <View style={[analyticsStyles.overviewCard, { backgroundColor: '#4CAF50' }]}>
          <GlobalText style={analyticsStyles.overviewIcon}>🏪</GlobalText>
          <GlobalText style={analyticsStyles.overviewNumber}>{shopStats.total}</GlobalText>
          <GlobalText style={analyticsStyles.overviewLabel}>Total Shops</GlobalText>
          <GlobalText style={analyticsStyles.overviewSubtext}>+{shopStats.newThisMonth} this month</GlobalText>
        </View>

        <View style={[analyticsStyles.overviewCard, { backgroundColor: '#2196F3' }]}>
          <GlobalText style={analyticsStyles.overviewIcon}>👥</GlobalText>
          <GlobalText style={analyticsStyles.overviewNumber}>{studentStats.total}</GlobalText>
          <GlobalText style={analyticsStyles.overviewLabel}>Total Students</GlobalText>
          <GlobalText style={analyticsStyles.overviewSubtext}>+{studentStats.newThisMonth} this month</GlobalText>
        </View>

        <View style={[analyticsStyles.overviewCard, { backgroundColor: '#FF9800' }]}>
          <GlobalText style={analyticsStyles.overviewIcon}>👨‍🏫</GlobalText>
          <GlobalText style={analyticsStyles.overviewNumber}>{staffStats.total}</GlobalText>
          <GlobalText style={analyticsStyles.overviewLabel}>Total Staff</GlobalText>
          <GlobalText style={analyticsStyles.overviewSubtext}>+{staffStats.newThisMonth} this month</GlobalText>
        </View>
      </View>

      {/* Shop Statistics */}
      <View style={analyticsStyles.analyticsSection}>
        <GlobalText style={analyticsStyles.sectionTitle}>🏪 Shop Analytics</GlobalText>
        <View style={analyticsStyles.statsGrid}>
          <View style={analyticsStyles.statCard}>
            <GlobalText style={analyticsStyles.statValue}>{shopStats.active}</GlobalText>
            <GlobalText style={analyticsStyles.statLabel}>Active Shops</GlobalText>
            <View style={analyticsStyles.progressBar}>
              <View style={[analyticsStyles.progressFill, { width: `${(shopStats.active / shopStats.total) * 100}%`, backgroundColor: '#4CAF50' }]} />
            </View>
          </View>

          <View style={analyticsStyles.statCard}>
            <GlobalText style={analyticsStyles.statValue}>{shopStats.inactive}</GlobalText>
            <GlobalText style={analyticsStyles.statLabel}>Inactive Shops</GlobalText>
            <View style={analyticsStyles.progressBar}>
              <View style={[analyticsStyles.progressFill, { width: `${(shopStats.inactive / shopStats.total) * 100}%`, backgroundColor: '#F44336' }]} />
            </View>
          </View>
        </View>

        {/* Shop Categories */}
        <GlobalText style={analyticsStyles.subsectionTitle}>Shop Categories</GlobalText>
        <View style={analyticsStyles.categoryList}>
          {shopCategories.map((category, index) => (
            <View key={index} style={analyticsStyles.categoryItem}>
              <View style={analyticsStyles.categoryInfo}>
                <GlobalText style={analyticsStyles.categoryName}>{category.category}</GlobalText>
                <GlobalText style={analyticsStyles.categoryCount}>{category.count} shops</GlobalText>
              </View>
              <View style={analyticsStyles.categoryProgress}>
                <View style={analyticsStyles.progressBar}>
                  <View style={[analyticsStyles.progressFill, { width: `${category.percentage}%`, backgroundColor: '#c09a7e' }]} />
                </View>
                <GlobalText style={analyticsStyles.categoryPercentage}>{category.percentage}%</GlobalText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Student Statistics */}
      <View style={analyticsStyles.analyticsSection}>
        <GlobalText style={analyticsStyles.sectionTitle}>👥 Student Analytics</GlobalText>
        <View style={analyticsStyles.statsGrid}>
          <View style={analyticsStyles.statCard}>
            <GlobalText style={analyticsStyles.statValue}>{studentStats.male}</GlobalText>
            <GlobalText style={analyticsStyles.statLabel}>Male Students</GlobalText>
            <View style={analyticsStyles.progressBar}>
              <View style={[analyticsStyles.progressFill, { width: `${(studentStats.male / studentStats.total) * 100}%`, backgroundColor: '#2196F3' }]} />
            </View>
          </View>

          <View style={analyticsStyles.statCard}>
            <GlobalText style={analyticsStyles.statValue}>{studentStats.female}</GlobalText>
            <GlobalText style={analyticsStyles.statLabel}>Female Students</GlobalText>
            <View style={analyticsStyles.progressBar}>
              <View style={[analyticsStyles.progressFill, { width: `${(studentStats.female / studentStats.total) * 100}%`, backgroundColor: '#E91E63' }]} />
            </View>
          </View>
        </View>
      </View>

      {/* Staff Statistics */}
      <View style={analyticsStyles.analyticsSection}>
        <GlobalText style={analyticsStyles.sectionTitle}>👨‍🏫 Staff Analytics</GlobalText>
        <View style={analyticsStyles.statsGrid}>
          <View style={analyticsStyles.statCard}>
            <GlobalText style={analyticsStyles.statValue}>{staffStats.teaching}</GlobalText>
            <GlobalText style={analyticsStyles.statLabel}>Teaching Staff</GlobalText>
            <View style={analyticsStyles.progressBar}>
              <View style={[analyticsStyles.progressFill, { width: `${(staffStats.teaching / staffStats.total) * 100}%`, backgroundColor: '#FF9800' }]} />
            </View>
          </View>

          <View style={analyticsStyles.statCard}>
            <GlobalText style={analyticsStyles.statValue}>{staffStats.nonTeaching}</GlobalText>
            <GlobalText style={analyticsStyles.statLabel}>Non-Teaching Staff</GlobalText>
            <View style={analyticsStyles.progressBar}>
              <View style={[analyticsStyles.progressFill, { width: `${(staffStats.nonTeaching / staffStats.total) * 100}%`, backgroundColor: '#9C27B0' }]} />
            </View>
          </View>
        </View>
      </View>

      {/* Revenue Chart */}
      <View style={analyticsStyles.analyticsSection}>
        <GlobalText style={analyticsStyles.sectionTitle}>💰 Revenue Trend</GlobalText>
        <View style={analyticsStyles.chartContainer}>
          <GlobalText style={analyticsStyles.chartNote}>📈 Monthly Revenue (Last 6 Months)</GlobalText>
          <View style={analyticsStyles.revenueList}>
            {revenueData.map((data, index) => (
              <View key={index} style={analyticsStyles.revenueItem}>
                <GlobalText style={analyticsStyles.revenueMonth}>{data.month}</GlobalText>
                <GlobalText style={analyticsStyles.revenueAmount}>₹{data.amount.toLocaleString()}</GlobalText>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
