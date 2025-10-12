import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native';
import Background from './Background';

interface Order {
  id: string;
  customerName: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  orderTime: string;
  estimatedTime?: string;
}

interface Props {
  onBack: () => void;
}

function CanteenOrders({ onBack }: Props) {
  const [activeTab, setActiveTab] = useState<'incoming' | 'picked' | 'previous'>('incoming');
  const [orders, setOrders] = useState<Order[]>([]);

  // Mock data for demonstration
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: '001',
        customerName: 'John Doe',
        items: [
          { name: 'Burger', quantity: 2, price: 120 },
          { name: 'Fries', quantity: 1, price: 80 }
        ],
        total: 320,
        status: 'pending',
        orderTime: '10:30 AM',
        estimatedTime: '10:45 AM'
      },
      {
        id: '002',
        customerName: 'Jane Smith',
        items: [
          { name: 'Pizza', quantity: 1, price: 250 },
          { name: 'Cold Drink', quantity: 2, price: 60 }
        ],
        total: 370,
        status: 'preparing',
        orderTime: '10:15 AM',
        estimatedTime: '10:35 AM'
      },
      {
        id: '004',
        customerName: 'Sarah Wilson',
        items: [
          { name: 'Sandwich', quantity: 1, price: 90 },
          { name: 'Coffee', quantity: 1, price: 50 }
        ],
        total: 140,
        status: 'ready',
        orderTime: '10:20 AM'
      }
    ];
    setOrders(mockOrders);
  }, []);

  const incomingOrders = orders.filter(order => ['pending', 'preparing'].includes(order.status));
  const pickedOrders = orders.filter(order => order.status === 'ready');
  const previousOrders = orders.filter(order => ['completed', 'cancelled'].includes(order.status));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#FFA500';
      case 'preparing': return '#2196F3';
      case 'ready': return '#4CAF50';
      case 'completed': return '#4CAF50';
      case 'cancelled': return '#F44336';
      default: return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'preparing': return 'Preparing';
      case 'ready': return 'Ready';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const renderOrderCard = (order: Order) => (
    <View key={order.id} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.customerName}>{order.customerName}</Text>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <Text style={styles.orderTime}>{order.orderTime}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
          <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        {order.items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>×{item.quantity}</Text>
            <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
          </View>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.totalText}>Total: ₹{order.total}</Text>
        {order.estimatedTime && (
          <Text style={styles.estimatedTime}>Ready by: {order.estimatedTime}</Text>
        )}
      </View>

      {activeTab === 'incoming' && order.status !== 'completed' && (
        <View style={styles.actionButtons}>
          {order.status === 'pending' && (
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.buttonText}>Accept Order</Text>
            </TouchableOpacity>
          )}
          {order.status === 'preparing' && (
            <TouchableOpacity style={styles.readyButton}>
              <Text style={styles.buttonText}>Mark Ready</Text>
            </TouchableOpacity>
          )}
          {order.status === 'ready' && (
            <TouchableOpacity style={styles.completeButton}>
              <Text style={styles.buttonText}>Mark Complete</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );

  return (
    <Background>
      <View style={{ paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 16) + 12 : 16 }}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack} style={styles.backButton} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.titleCenter} pointerEvents="none">Orders</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>
      </View>

      <View style={styles.container}>
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'incoming' && styles.activeTab]}
            onPress={() => setActiveTab('incoming')}
          >
            <Text style={[styles.tabText, activeTab === 'incoming' && styles.activeTabText]}>
              Processing ({incomingOrders.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'picked' && styles.activeTab]}
            onPress={() => setActiveTab('picked')}
          >
            <Text style={[styles.tabText, activeTab === 'picked' && styles.activeTabText]}>
              Ready ({pickedOrders.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'previous' && styles.activeTab]}
            onPress={() => setActiveTab('previous')}
          >
            <Text style={[styles.tabText, activeTab === 'previous' && styles.activeTabText]}>
              Picked ({previousOrders.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Orders List */}
        <ScrollView
          style={styles.ordersContainer}
          contentContainerStyle={styles.ordersContent}
          showsVerticalScrollIndicator={true}
        >
          {activeTab === 'incoming' ? (
            incomingOrders.length > 0 ? (
              incomingOrders.map(renderOrderCard)
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No orders being processed</Text>
                <Text style={styles.emptySubtext}>Orders being prepared will appear here</Text>
              </View>
            )
          ) : activeTab === 'picked' ? (
            pickedOrders.length > 0 ? (
              pickedOrders.map(order => (
                <View key={order.id} style={styles.orderCard}>
                  <View style={styles.orderHeader}>
                    <View style={styles.orderInfo}>
                      <Text style={styles.customerName}>{order.customerName}</Text>
                      <Text style={styles.orderId}>Order #{order.id}</Text>
                      <Text style={styles.orderTime}>{order.orderTime}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                      <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
                    </View>
                  </View>

                  <View style={styles.itemsContainer}>
                    {order.items.map((item, index) => (
                      <View key={index} style={styles.itemRow}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemQuantity}>×{item.quantity}</Text>
                        <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.orderFooter}>
                    <Text style={styles.totalText}>Total: ₹{order.total}</Text>
                  </View>

                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.pickedButton}>
                      <Text style={styles.buttonText}>Mark as Picked</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No orders ready</Text>
                <Text style={styles.emptySubtext}>Ready orders will appear here</Text>
              </View>
            )
          ) : (
            previousOrders.length > 0 ? (
              previousOrders.map(renderOrderCard)
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No completed orders</Text>
                <Text style={styles.emptySubtext}>Picked up orders will appear here</Text>
              </View>
            )
          )}
        </ScrollView>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
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
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    padding: 4,
    gap: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#4CAF50',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  ordersContainer: {
    flex: 1,
  },
  ordersContent: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  orderId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  orderTime: {
    fontSize: 12,
    color: '#888',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  itemsContainer: {
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 8,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
  },
  estimatedTime: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  readyButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButton: {
    flex: 1,
    backgroundColor: '#FF9800',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  pickedButton: {
    flex: 1,
    backgroundColor: '#9C27B0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
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
});

export default CanteenOrders;
