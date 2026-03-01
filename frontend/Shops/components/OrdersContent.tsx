import React from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Text } from '../../components/GlobalComponents';

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

interface OrdersContentProps {
  ordersTab: 'incoming' | 'picked' | 'previous';
  setOrdersTab: (tab: 'incoming' | 'picked' | 'previous') => void;
  allOrders: Order[];
}

export default function OrdersContent({ ordersTab, setOrdersTab, allOrders }: OrdersContentProps) {
  const incomingOrders = allOrders.filter(order => ['pending', 'preparing'].includes(order.status));
  const pickedOrders = allOrders.filter(order => order.status === 'ready');
  const previousOrders = allOrders.filter(order => ['completed', 'cancelled'].includes(order.status));

  const renderOrderCard = (order: Order) => (
    <View key={order.id} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderCustomer}>{order.customerName}</Text>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <Text style={styles.orderTime}>{order.orderTime}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: order.status === 'pending' ? '#FFA500' : '#2196F3' }]}>
          <Text style={styles.statusText}>{order.status === 'pending' ? 'Pending' : 'Preparing'}</Text>
        </View>
      </View>
      <View style={styles.orderItems}>
        {order.items.map((item, index) => (
          <View key={index} style={styles.orderItemRow}>
            <Text style={styles.orderItemName}>{item.name}</Text>
            <Text style={styles.orderItemQty}>×{item.quantity}</Text>
            <Text style={styles.orderItemPrice}>₹{item.price * item.quantity}</Text>
          </View>
        ))}
      </View>
      <View style={styles.orderFooter}>
        <Text style={styles.orderTotal}>Total: ₹{order.total}</Text>
        {order.estimatedTime && (
          <Text style={styles.orderEst}>Ready by: {order.estimatedTime}</Text>
        )}
      </View>
      <TouchableOpacity
        style={order.status === 'pending' ? styles.acceptBtn : styles.readyBtn}
      >
        <Text style={styles.orderBtnText}>
          {order.status === 'pending' ? 'Accept Order' : 'Mark Ready'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      {/* Orders Tabs */}
      <View style={styles.ordersTabs}>
        <TouchableOpacity
          style={[styles.orderTab, ordersTab === 'incoming' && styles.orderTabActive]}
          onPress={() => setOrdersTab('incoming')}
        >
          <Text style={[styles.orderTabText, ordersTab === 'incoming' && styles.orderTabTextActive]}>
            Processing ({incomingOrders.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.orderTab, ordersTab === 'picked' && styles.orderTabActive]}
          onPress={() => setOrdersTab('picked')}
        >
          <Text style={[styles.orderTabText, ordersTab === 'picked' && styles.orderTabTextActive]}>
            Ready ({pickedOrders.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.orderTab, ordersTab === 'previous' && styles.orderTabActive]}
          onPress={() => setOrdersTab('previous')}
        >
          <Text style={[styles.orderTabText, ordersTab === 'previous' && styles.orderTabTextActive]}>
            Picked ({previousOrders.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <ScrollView
        style={styles.ordersScroll}
        contentContainerStyle={styles.ordersContent}
        showsVerticalScrollIndicator={true}
      >
        {ordersTab === 'incoming' ? (
          incomingOrders.length > 0 ? (
            incomingOrders.map(renderOrderCard)
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No orders being processed</Text>
              <Text style={styles.emptySubtext}>Orders being prepared will appear here</Text>
            </View>
          )
        ) : ordersTab === 'picked' ? (
          pickedOrders.length > 0 ? (
            pickedOrders.map(order => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View>
                    <Text style={styles.orderCustomer}>{order.customerName}</Text>
                    <Text style={styles.orderId}>Order #{order.id}</Text>
                    <Text style={styles.orderTime}>{order.orderTime}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: '#4CAF50' }]}>
                    <Text style={styles.statusText}>Ready</Text>
                  </View>
                </View>
                <View style={styles.orderItems}>
                  {order.items.map((item, index) => (
                    <View key={index} style={styles.orderItemRow}>
                      <Text style={styles.orderItemName}>{item.name}</Text>
                      <Text style={styles.orderItemQty}>×{item.quantity}</Text>
                      <Text style={styles.orderItemPrice}>₹{item.price * item.quantity}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.orderFooter}>
                  <Text style={styles.orderTotal}>Total: ₹{order.total}</Text>
                </View>
                <TouchableOpacity style={styles.pickedBtn}>
                  <Text style={styles.orderBtnText}>Mark as Picked</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No orders ready</Text>
              <Text style={styles.emptySubtext}>Ready orders will appear here</Text>
            </View>
          )
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No completed orders</Text>
            <Text style={styles.emptySubtext}>Picked up orders will appear here</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  ordersTabs: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    padding: 4,
    gap: 2,
  },
  orderTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  orderTabActive: {
    backgroundColor: '#4CAF50',
  },
  orderTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  orderTabTextActive: {
    color: '#fff',
  },
  ordersScroll: {
    flex: 1,
  },
  ordersContent: {
    gap: 12,
    paddingBottom: 100,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
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
    marginBottom: 10,
  },
  orderCustomer: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  orderId: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
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
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  orderItems: {
    marginBottom: 12,
  },
  orderItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  orderItemName: {
    fontSize: 14,
    color: '#333',
  },
  orderItemQty: {
    fontSize: 13,
    color: '#666',
    marginHorizontal: 8,
  },
  orderItemPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 8,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
  },
  orderEst: {
    fontSize: 12,
    color: '#666',
  },
  acceptBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  readyBtn: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  pickedBtn: {
    backgroundColor: '#9C27B0',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  orderBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  emptySubtext: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
});
