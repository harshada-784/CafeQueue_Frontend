import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native';
import Background from './Background';

interface OrderItem {
  id: string;
  token: string;
  shopName: string;
  items: string[];
  totalAmount: number;
  status: 'processing' | 'ready_to_pick' | 'picked' | 'cancelled';
  orderTime: string;
}

interface Props {
  onBack: () => void;
}

export default function Orders({ onBack }: Props) {
  // Sample order data - now with state management
  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: '1',
      token: 'TK1234',
      shopName: 'Campus Cafe',
      items: ['Chicken Burger', 'French Fries', 'Coca Cola'],
      totalAmount: 250.00,
      status: 'processing',
      orderTime: '2:30 PM'
    },
    {
      id: '2',
      token: 'TK5678',
      shopName: 'Food Corner',
      items: ['Pizza Slice', 'Garlic Bread'],
      totalAmount: 180.00,
      status: 'ready_to_pick',
      orderTime: '1:45 PM'
    },
    {
      id: '3',
      token: 'TK9012',
      shopName: 'Campus Cafe',
      items: ['Veg Sandwich', 'Fresh Juice'],
      totalAmount: 120.00,
      status: 'picked',
      orderTime: '12:30 PM'
    }
  ]);

  const cancelOrder = (orderId: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: 'cancelled' as const }
          : order
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return '#FFA500'; // Orange
      case 'ready_to_pick':
        return '#4CAF50'; // Green
      case 'picked':
        return '#2196F3'; // Blue
      case 'cancelled':
        return '#F44336'; // Red
      default:
        return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing':
        return '🔄 Processing';
      case 'ready_to_pick':
        return '✅ Ready to Pick';
      case 'picked':
        return '📦 Picked';
      case 'cancelled':
        return '❌ Cancelled';
      default:
        return status;
    }
  };

  return (
    <Background>
      <View style={{ paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 16) + 12 : 16 }}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack} style={styles.backButton} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.titleCenter} pointerEvents="none">My Orders</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No orders found</Text>
            <Text style={styles.emptySubtext}>Your order history will appear here</Text>
          </View>
        ) : (
          <View style={styles.ordersContainer}>
            {orders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                {/* Order Header */}
                <View style={styles.orderHeader}>
                  <View style={styles.tokenContainer}>
                    <Text style={styles.tokenLabel}>Token</Text>
                    <Text style={styles.tokenValue}>{order.token}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                      {getStatusText(order.status)}
                    </Text>
                  </View>
                </View>

                {/* Shop and Time */}
                <View style={styles.orderDetails}>
                  <Text style={styles.shopName}>{order.shopName}</Text>
                  <Text style={styles.orderTime}>Ordered at {order.orderTime}</Text>
                </View>

                {/* Items */}
                <View style={styles.itemsContainer}>
                  <Text style={styles.itemsLabel}>Items:</Text>
                  {order.items.map((item, index) => (
                    <Text key={index} style={styles.itemText}>• {item}</Text>
                  ))}
                </View>

                {/* Total and Cancel Button */}
                <View style={styles.orderFooter}>
                  <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total Payment</Text>
                    <Text style={styles.totalAmount}>₹{order.totalAmount.toFixed(2)}</Text>
                  </View>
                  {order.status === 'processing' && (
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => cancelOrder(order.id)}
                    >
                      <Text style={styles.cancelButtonText}>Cancel Order</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerRow: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 28,
    marginBottom: 0,
    position: 'relative'
  },
  backButton: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    zIndex: 2
  },
  backIcon: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111'
  },
  titleCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '900',
    color: '#111'
  },
  headerRightPlaceholder: {
    width: 36,
    height: 36
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  ordersContainer: {
    paddingTop: 20,
    gap: 16,
  },
  orderCard: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    padding: 16,
    gap: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tokenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tokenLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  tokenValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  orderDetails: {
    gap: 4,
  },
  shopName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
  },
  orderTime: {
    fontSize: 12,
    color: '#666',
  },
  itemsContainer: {
    gap: 4,
  },
  itemsLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  itemText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  totalContainer: {
    gap: 4,
  },
  totalLabel: {
    fontSize: 12,
    color: '#666',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
  },
  cancelButton: {
    backgroundColor: '#F44336',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
