import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView, Platform, StatusBar, Animated } from 'react-native';
import { Text, TextInput } from '../components/GlobalComponents';
import Background from '../Background';
import { getCart, getTotal, getCount, subscribe as subscribeCart, inc, dec, clearCart } from '../cartStore';

interface CartItem {
  itemId: number;
  shopName: string;
  name: string;
  price: number;
  qty: number;
  imageUri?: string;
}

interface Discount {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder?: number;
  icon?: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  type: 'card' | 'upi' | 'wallet' | 'cod';
  available?: boolean;
}

const sampleDiscounts: Discount[] = [
  {
    id: '1',
    title: 'FIRST50',
    description: '50% off on first order',
    code: 'FIRST50',
    discount: 50,
    type: 'percentage',
    minOrder: 99,
    icon: '🎉',
  },
  {
    id: '2',
    title: 'SAVE30',
    description: 'Flat ₹30 off',
    code: 'SAVE30',
    discount: 30,
    type: 'fixed',
    minOrder: 199,
    icon: '💰',
  },
  {
    id: '3',
    title: 'WEEKEND20',
    description: '20% off on weekends',
    code: 'WEEKEND20',
    discount: 20,
    type: 'percentage',
    minOrder: 149,
    icon: '🌟',
  },
];

const paymentMethods: PaymentMethod[] = [
  { id: '1', name: 'Credit/Debit Card', icon: '💳', type: 'card', available: true },
  { id: '2', name: 'UPI', icon: '📱', type: 'upi', available: true },
  { id: '3', name: 'Paytm Wallet', icon: '👛', type: 'wallet', available: true },
  { id: '4', name: 'Cash on Delivery', icon: '💵', type: 'cod', available: true },
];

interface Props {
  onBack: () => void;
  onProceed?: (total: number) => void;
}

export default function CartScreen({ onBack, onProceed = () => {} }: Props) {
  const [cart, setCart] = useState(getCart());
  const [cartCount, setCartCount] = useState(getCount());
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [showDiscounts, setShowDiscounts] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  
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

  const subtotal = useMemo(() => {
    return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
  }, []);

  const discountAmount = useMemo(() => {
    if (!selectedDiscount) return 0;
    if (selectedDiscount.type === 'percentage') {
      return (subtotal * selectedDiscount.discount) / 100;
    } else {
      return selectedDiscount.discount;
    }
  }, [selectedDiscount, subtotal]);

  const deliveryFee = 0; // Free delivery

  const total = useMemo(() => {
    return Math.max(0, subtotal - discountAmount);
  }, [subtotal, discountAmount]);

  const applyPromoCode = () => {
    const discount = sampleDiscounts.find(d => d.code === promoCode.toUpperCase());
    if (discount && (!discount.minOrder || subtotal >= discount.minOrder)) {
      setSelectedDiscount(discount);
      setPromoCode(discount.code);
    }
  };

  const removeDiscount = () => {
    setSelectedDiscount(null);
    setPromoCode('');
  };

  const renderCartItem = (item: CartItem) => (
    <View key={`${item.shopName}-${item.itemId}`} style={styles.cartItem}>
      <Image source={{ uri: item.imageUri || 'https://via.placeholder.com/52' }} style={styles.cartItemImg} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemShop}>{item.shopName}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
      </View>
      <View style={styles.qtySection}>
        <TouchableOpacity onPress={() => dec(item.itemId, item.shopName)} style={styles.qtyBtn}>
          <Text style={styles.qtyBtnText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.qtyValue}>{item.qty}</Text>
        <TouchableOpacity onPress={() => inc(item.itemId, item.shopName)} style={styles.qtyBtn}>
          <Text style={styles.qtyBtnText}>＋</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDiscountItem = (discount: Discount) => (
    <TouchableOpacity
      key={discount.id}
      style={[
        styles.discountItem,
        selectedDiscount?.id === discount.id && styles.selectedDiscount
      ]}
      onPress={() => {
        setSelectedDiscount(discount);
        setPromoCode(discount.code);
        setShowDiscounts(false);
      }}
    >
      <Text style={styles.discountIcon}>{discount.icon}</Text>
      <View style={styles.discountInfo}>
        <Text style={styles.discountTitle}>{discount.title}</Text>
        <Text style={styles.discountDescription}>{discount.description}</Text>
        {discount.minOrder && (
          <Text style={styles.discountMinOrder}>Min order ₹{discount.minOrder}</Text>
        )}
      </View>
      <Text style={styles.discountCode}>{discount.code}</Text>
    </TouchableOpacity>
  );

  const renderPaymentMethod = (method: PaymentMethod) => (
    <TouchableOpacity
      key={method.id}
      style={[
        styles.paymentItem,
        selectedPayment?.id === method.id && styles.selectedPayment,
        !method.available && styles.disabledPayment
      ]}
      onPress={() => method.available && setSelectedPayment(method)}
      disabled={!method.available}
    >
      <Text style={styles.paymentIcon}>{method.icon}</Text>
      <Text style={styles.paymentName}>{method.name}</Text>
      {selectedPayment?.id === method.id && (
        <View style={styles.selectedIndicator}>
          <Text style={styles.selectedIndicatorText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
  return (
    <Background>
      {/* Header */}
      <View style={{ paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 16) + 12 : 16 }}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack} style={styles.backButton} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.titleCenter} pointerEvents="none">Cart ({cartCount})</Text>
          <TouchableOpacity onPress={clearCart} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {cart.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartIcon}>🛒</Text>
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
            <Text style={styles.emptyCartSubtext}>Add items from your favorite shops</Text>
          </View>
        ) : (
          <>
            {/* Cart Items */}
            <View style={styles.cartItemsContainer}>
              {cart.map(renderCartItem)}
            </View>

            {/* Promo Code Section */}
            <View style={styles.promoSection}>
              <Text style={styles.sectionTitle}>🎉 Offers & Promos</Text>
              <View style={styles.promoInputContainer}>
                <TextInput
                  style={styles.promoInput}
                  placeholder="Enter promo code"
                  placeholderTextColor="#999"
                  value={promoCode}
                  onChangeText={setPromoCode}
                />
                <TouchableOpacity style={styles.applyButton} onPress={applyPromoCode}>
                  <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
              </View>
              
              {selectedDiscount && (
                <View style={styles.appliedDiscount}>
                  <Text style={styles.appliedDiscountIcon}>{selectedDiscount.icon}</Text>
                  <View style={styles.appliedDiscountInfo}>
                    <Text style={styles.appliedDiscountTitle}>{selectedDiscount.title}</Text>
                    <Text style={styles.appliedDiscountAmount}>-₹{discountAmount.toFixed(2)}</Text>
                  </View>
                  <TouchableOpacity onPress={removeDiscount} style={styles.removeDiscountBtn}>
                    <Text style={styles.removeDiscountText}>×</Text>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity 
                style={styles.viewAllOffersBtn} 
                onPress={() => setShowDiscounts(!showDiscounts)}
              >
                <Text style={styles.viewAllOffersText}>View All Offers →</Text>
              </TouchableOpacity>

              {showDiscounts && (
                <View style={styles.discountsList}>
                  {sampleDiscounts.map(renderDiscountItem)}
                </View>
              )}
            </View>

            {/* Payment Method Section */}
            <View style={styles.paymentSection}>
              <Text style={styles.sectionTitle}>💳 Payment Method</Text>
              <View style={styles.paymentMethodsList}>
                {paymentMethods.map(renderPaymentMethod)}
              </View>
            </View>

            {/* Bill Details */}
            <View style={styles.billDetails}>
              <Text style={styles.sectionTitle}>🧾 Bill Details</Text>
              
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Subtotal</Text>
                <Text style={styles.billValue}>₹{subtotal.toFixed(2)}</Text>
              </View>
              
              {selectedDiscount && (
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Discount ({selectedDiscount.code})</Text>
                  <Text style={[styles.billValue, styles.billValueDiscount]}>
                    -₹{discountAmount.toFixed(2)}
                  </Text>
                </View>
              )}
              
              <View style={[styles.billRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>₹{total.toFixed(2)}</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Footer */}
      {cart.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[
              styles.checkoutBtn,
              !selectedPayment && styles.disabledCheckoutBtn
            ]} 
            onPress={() => selectedPayment && safeProceed(total)}
            disabled={!selectedPayment}
          >
            <Text style={styles.checkoutText}>
              {selectedPayment ? `Pay ₹${total.toFixed(2)}` : 'Select Payment Method'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Background>
  );
}

const styles = StyleSheet.create({
  // Header Styles
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
  backButton: { paddingHorizontal: 4, paddingVertical: 4, zIndex: 2 },
  backIcon: { fontSize: 24, fontWeight: '700', color: '#111' },
  titleCenter: { 
    position: 'absolute', 
    left: 0, 
    right: 0, 
    textAlign: 'center', 
    fontSize: 20, 
    fontWeight: '900', 
    color: '#111' 
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FF4444',
    borderRadius: 16,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },

  // Empty Cart
  emptyCart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyCartIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
    marginBottom: 8,
  },
  emptyCartSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },

  // Cart Items
  cartItemsContainer: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 16,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cartItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0' 
  },
  cartItemImg: { 
    width: 60, 
    height: 60, 
    borderRadius: 12, 
    backgroundColor: '#f5f5f5' 
  },
  itemDetails: { 
    flex: 1, 
    marginLeft: 12 
  },
  itemName: { 
    fontWeight: '800', 
    color: '#111', 
    fontSize: 16, 
    marginBottom: 4 
  },
  itemShop: { 
    fontSize: 12, 
    color: '#666', 
    fontWeight: '600', 
    marginBottom: 2 
  },
  itemPrice: { 
    fontWeight: '700', 
    color: '#111', 
    fontSize: 15 
  },
  qtySection: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8 
  },
  qtyBtn: { 
    width: 28, 
    height: 28, 
    borderRadius: 14, 
    backgroundColor: '#e8f5e9', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 1, 
    borderColor: '#c8e6c9' 
  },
  qtyBtnText: { 
    color: '#1b5e20', 
    fontSize: 16, 
    fontWeight: '900' 
  },
  qtyValue: { 
    minWidth: 20, 
    textAlign: 'center', 
    fontWeight: '800', 
    fontSize: 16, 
    color: '#111' 
  },

  // Promo Section
  promoSection: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 16,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    marginBottom: 16,
  },
  promoInputContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  promoInput: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  appliedDiscount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d4edda',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#c3e6cb',
  },
  appliedDiscountIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  appliedDiscountInfo: {
    flex: 1,
  },
  appliedDiscountTitle: {
    fontWeight: '700',
    color: '#155724',
    fontSize: 14,
    marginBottom: 2,
  },
  appliedDiscountAmount: {
    fontWeight: '800',
    color: '#155724',
    fontSize: 16,
  },
  removeDiscountBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f8d7da',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeDiscountText: {
    color: '#721c24',
    fontSize: 16,
    fontWeight: '700',
  },
  viewAllOffersBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  viewAllOffersText: {
    color: '#007bff',
    fontWeight: '700',
    fontSize: 14,
  },
  discountsList: {
    marginTop: 12,
  },
  discountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  selectedDiscount: {
    borderColor: '#007bff',
    backgroundColor: '#e7f3ff',
  },
  discountIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  discountInfo: {
    flex: 1,
  },
  discountTitle: {
    fontWeight: '700',
    color: '#111',
    fontSize: 14,
    marginBottom: 2,
  },
  discountDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  discountMinOrder: {
    fontSize: 11,
    color: '#999',
  },
  discountCode: {
    fontWeight: '800',
    color: '#007bff',
    fontSize: 12,
    backgroundColor: '#e7f3ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  // Payment Section
  paymentSection: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 16,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  paymentMethodsList: {
    gap: 12,
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  selectedPayment: {
    borderColor: '#28a745',
    backgroundColor: '#d4edda',
  },
  disabledPayment: {
    opacity: 0.5,
  },
  paymentIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  paymentName: {
    flex: 1,
    fontWeight: '700',
    color: '#111',
    fontSize: 14,
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicatorText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },

  // Bill Details
  billDetails: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 16,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  totalRow: {
    borderTopWidth: 2,
    borderTopColor: '#111',
    marginTop: 8,
    paddingTop: 16,
  },
  billLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  billValue: {
    fontSize: 14,
    color: '#111',
    fontWeight: '700',
  },
  billLabelDiscount: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: '600',
  },
  billValueDiscount: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: '700',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111',
  },

  // Footer
  footer: { 
    borderTopWidth: 1, 
    borderTopColor: '#e5e5e5', 
    paddingHorizontal: 16, 
    paddingTop: 16, 
    paddingBottom: 20, 
    backgroundColor: 'rgba(255,255,255,0.94)' 
  },
  checkoutBtn: { 
    height: 56, 
    borderRadius: 28, 
    backgroundColor: '#28a745', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  disabledCheckoutBtn: {
    backgroundColor: '#6c757d',
  },
  checkoutText: { 
    color: '#fff', 
    fontWeight: '800', 
    fontSize: 16 
  },
});
