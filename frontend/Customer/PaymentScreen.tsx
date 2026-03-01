import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import Background from '../Background';

interface Props {
  amount: number;
  onBack: () => void;
  onConfirm: (method: 'cash' | 'upi') => void;
}

export default function PaymentScreen({ amount, onBack, onConfirm }: Props) {
  const [method, setMethod] = useState<'cash' | 'upi'>('cash');

  return (
    <Background>
      <View style={{ paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 16) + 12 : 16 }}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack} style={styles.backButton} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.titleCenter} pointerEvents="none">Payment</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.question}>How would you like to make the payment?</Text>

        <View style={styles.radioGroup}>
          <TouchableOpacity style={styles.radioRow} onPress={() => setMethod('cash')}>
            <View style={[styles.radioOuter, method === 'cash' && styles.radioOuterActive]}>
              {method === 'cash' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>Cash on the spot</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.radioRow} onPress={() => setMethod('upi')}>
            <View style={[styles.radioOuter, method === 'upi' && styles.radioOuterActive]}>
              {method === 'upi' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>Online payment</Text>
          </TouchableOpacity>
        </View>

        {/* Total Payment row above the confirm button */}
        <View style={[styles.totalRow, { marginTop: 40, marginBottom: 8 }]}>
          <Text style={styles.totalLabel}>Total Payment</Text>
          <Text style={styles.totalValue}>₹{amount.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.confirmBtn} onPress={() => onConfirm(method)}>
          <Text style={styles.confirmText}>{method === 'upi' ? 'Make Payment' : 'Confirm Order'}</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 20 },
  headerRow: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 28, marginBottom: 0, position: 'relative' },
  backButton: { paddingHorizontal: 4, paddingVertical: 4, zIndex: 2 },
  backIcon: { fontSize: 24, fontWeight: '700', color: '#111' },
  titleCenter: { position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 24, fontWeight: '900', color: '#111' },
  headerRightPlaceholder: { width: 36, height: 36 },
  heading: { fontSize: 18, color: '#111', fontWeight: '800', marginTop: 12, textAlign: 'center' },
  amount: { fontSize: 28, color: '#111', fontWeight: '900', marginTop: 6, textAlign: 'center' },
  question: { marginTop: 72, fontSize: 16, color: '#111', fontWeight: '700' },
  radioGroup: { marginTop: 20, gap: 10 },
  radioRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  radioOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#bbb', alignItems: 'center', justifyContent: 'center' },
  radioOuterActive: { borderColor: '#4CAF50' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#4CAF50' },
  radioLabel: { fontSize: 14, color: '#111', fontWeight: '700' },
  totalRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  totalLabel: { fontSize: 16, color: '#111', fontWeight: '800' },
  totalValue: { fontSize: 18, color: '#111', fontWeight: '900' },
  confirmBtn: { marginTop: 28, height: 48, borderRadius: 24, backgroundColor: '#4CAF50', alignItems: 'center', justifyContent: 'center' },
  confirmText: { color: '#fff', fontWeight: '800' },
});
