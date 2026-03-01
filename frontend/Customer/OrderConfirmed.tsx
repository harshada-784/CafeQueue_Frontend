import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import Background from '../Background';
import { clearCart } from '../cartStore';

interface Props {
  amount: number;
  onBackHome: () => void;
}

export default function OrderConfirmed({ amount, onBackHome }: Props) {
  const handleBackHome = () => {
    clearCart();
    onBackHome();
  };

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.tickCircle}>
          <Text style={styles.tickMark}>✓</Text>
        </View>
        <Text style={styles.heading}>Your order is confirmed</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.cellLabel}>Time to fetch your order</Text>
            <Text style={styles.cellValue}>-----</Text>
          </View>
          <View style={styles.rowDivider} />
          <View style={styles.tableRow}>
            <Text style={styles.cellLabel}>Total payment to give</Text>
            <Text style={styles.cellValue}>₹{amount.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.doneBtn} onPress={handleBackHome}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 200, alignItems: 'center', justifyContent: 'flex-start' },
  tickCircle: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#e8f5e9', alignItems: 'center', justifyContent: 'center', marginTop: 36, borderWidth: 2, borderColor: '#bbf7d0' },
  tickMark: { fontSize: 56, color: '#16A34A', fontWeight: '900', lineHeight: 64 },
  heading: { fontSize: 20, fontWeight: '900', color: '#16A34A', marginTop: 14, textAlign: 'center' },
  table: { width: '80%', alignSelf: 'center', marginTop: 50, backgroundColor: 'transparent' },
  tableRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  rowDivider: { height: 1, backgroundColor: '#e5e5e5' },
  cellLabel: { fontSize: 14, color: '#111', fontWeight: '700', flexShrink: 1, marginRight: 8 },
  cellValue: { fontSize: 14, color: '#111', fontWeight: '800', minWidth: 90, textAlign: 'right' },
  doneBtn: { marginTop: 28, height: 48, borderRadius: 24, backgroundColor: '#4CAF50', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },
  doneText: { color: '#fff', fontWeight: '800' },
});
