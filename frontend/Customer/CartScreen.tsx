import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView, Platform, StatusBar } from 'react-native';
import { Text } from '../components/GlobalComponents';
import Background from '../Background';
import { getCart, getTotal, getCount, subscribe as subscribeCart, inc, dec, clearCart } from '../cartStore';

interface Props {
  onBack: () => void;
  onProceed?: (total: number) => void;
}

export default function CartScreen({ onBack, onProceed = () => {} }: Props) {
  const [cart, setCart] = useState(getCart());
  const [cartCount, setCartCount] = useState(getCount());
  const safeProceed = useMemo<((t: number) => void)>(() => {
    return typeof onProceed === 'function' ? onProceed : () => {};
  }, [onProceed]);

  useEffect(() => {
    const unsub = subscribeCart(() => {
      setCart(getCart());
      setCartCount(getCount());
    });
    return unsub;
  }, []);
  const total = useMemo(() => getTotal(), [cart]);
  return (
    <Background>
      {/* Header (outside ScrollView to avoid overlap) */}
      <View style={{ paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 16) + 12 : 16 }}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack} style={styles.backButton} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.titleCenter} pointerEvents="none">Cart</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>
      </View>
      <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {cart.length === 0 && (
          <Text style={{ color: '#666' }}>Your cart is empty.</Text>
        )}
        {/* Cart items with horizontal separators */}
        {cart.map(ci => (
          <View key={`${ci.shopName}-${ci.itemId}`} style={styles.cartItem}>
            {!!ci.imageUri && (
              <Image source={{ uri: ci.imageUri }} style={styles.cartItemImg} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName} numberOfLines={2}>{ci.name}</Text>
              <Text style={styles.itemPrice}>₹{ci.price}</Text>
            </View>
            <View style={styles.qtyRow}>
              <TouchableOpacity onPress={() => dec(ci.itemId, ci.shopName)} style={styles.qtyBtn}><Text style={styles.qtyBtnText}>−</Text></TouchableOpacity>
              <Text style={styles.qtyValue}>{ci.qty}</Text>
              <TouchableOpacity onPress={() => inc(ci.itemId, ci.shopName)} style={styles.qtyBtn}><Text style={styles.qtyBtnText}>＋</Text></TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      {/* Footer fixed at bottom */}
      <View style={styles.footer}>
        <View style={[styles.totalRow, { paddingVertical: 12 }]}> 
          <Text style={[styles.totalLabel, styles.totalPaymentLabel]}>Total Payment</Text>
          <Text style={[styles.totalValue, styles.totalPaymentValue]}>₹{total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => safeProceed(total)}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
      </View>
      </Background>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 0, paddingHorizontal: 16, paddingBottom: 30 },
  headerRow: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 28, marginBottom: 0, position: 'relative' },
  backButton: { paddingHorizontal: 4, paddingVertical: 4, zIndex: 2 },
  backIcon: { fontSize: 24, fontWeight: '700', color: '#111' },
  titleCenter: { position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 24, fontWeight: '900', color: '#111' },
  headerRightPlaceholder: { width: 36, height: 36 },
  cartBox: { backgroundColor: 'rgba(255,255,255,0.94)', borderRadius: 12, borderWidth: 1, borderColor: '#e2e2e2', padding: 12, gap: 0 },
  cartItem: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#ececec' },
  cartItemImg: { width: 52, height: 52, borderRadius: 10 },
  itemName: { fontWeight: '700', color: '#111' },
  itemPrice: { fontWeight: '600', color: '#111' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#e8f5e9', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#c8e6c9' },
  qtyBtnText: { color: '#1b5e20', fontSize: 16, fontWeight: '900' },
  qtyValue: { minWidth: 16, textAlign: 'center', fontWeight: '800', color: '#111' },
  totalRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  totalLabel: { color: '#111', fontWeight: '700' },
  totalValue: { color: '#111', fontWeight: '800' },
  totalPaymentLabel: { fontSize: 18 },
  totalPaymentValue: { fontSize: 20 },
  footer: { borderTopWidth: 1, borderTopColor: '#e5e5e5', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12, backgroundColor: 'rgba(255,255,255,0.94)', marginBottom: 48 },
  checkoutBtn: { marginTop: 12, height: 48, borderRadius: 24, backgroundColor: '#4CAF50', alignItems: 'center', justifyContent: 'center' },
  checkoutText: { color: '#fff', fontWeight: '800' },
});
