import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Platform, StatusBar } from 'react-native';
import Background from './Background';
import { getMenuForShop, MenuItem } from './shopsStore';
import { addToCart, getCount, subscribe as subscribeCart } from './cartStore';

interface Props {
  shopName: string;
  onBack: () => void;
  onOpenCart: () => void;
}

export default function ShopMenu({ shopName, onBack, onOpenCart }: Props) {
  const [search, setSearch] = useState('');
  const [cartCount, setCartCount] = useState(getCount());
  const [warn, setWarn] = useState(false);
  const [warnTimer, setWarnTimer] = useState<number | null>(null);

  useEffect(() => {
    const unsub = subscribeCart(() => setCartCount(getCount()));
    return unsub;
  }, []);

  useEffect(() => {
    return () => {
      if (warnTimer) clearTimeout(warnTimer);
    };
  }, [warnTimer]);

  const items = useMemo<MenuItem[]>(() => getMenuForShop(shopName), [shopName]);
  const filtered = items.filter(i => i.name.toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <Background>
      {/* Header: arrow back, centered shop name, cart with badge */}
      <View style={{ paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 16) + 56 : 56 }}>
        <View style={[styles.headerRow, { marginTop: 12 }]}>
          <TouchableOpacity onPress={onBack} style={styles.backButton} hitSlop={{ top: 14, right: 14, bottom: 14, left: 14 }}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.titleCenter} pointerEvents="none">{shopName}</Text>
          <TouchableOpacity onPress={onOpenCart} style={styles.cartBtn} hitSlop={{ top: 14, right: 14, bottom: 14, left: 14 }}>
            <Text style={styles.cartIcon}>🛒</Text>
            {!!cartCount && (
              <View style={styles.badge}><Text style={styles.badgeText}>{cartCount}</Text></View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Search */}
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#666"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />

        {/* Section title */}
        <Text style={styles.sectionTitle}>Today's Menu ⭐</Text>

        {/* List */}
        <View style={{ gap: 12, paddingBottom: 32 }}>
          {filtered.map(mi => (
            <View key={mi.id} style={styles.card}>
              {!!mi.imageUri && (
                <Image source={{ uri: mi.imageUri }} style={styles.itemImage} />
              )}
              <View style={styles.cardBody}>
                <Text style={styles.itemName}>{mi.name}</Text>
                <View style={styles.cardActions}>
                  <Text style={styles.itemPrice}>₹{mi.price}</Text>
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => {
                      const ok = addToCart(shopName, mi.id, mi.name, mi.price, mi.imageUri);
                      if (!ok) {
                        if (warnTimer) clearTimeout(warnTimer);
                        setWarn(true);
                        const t = setTimeout(() => setWarn(false), 2500) as unknown as number;
                        setWarnTimer(t);
                      }
                    }}
                  >
                    <Text style={styles.addBtnIcon}>＋</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          {filtered.length === 0 && (
            <Text style={{ color: '#666' }}>No items found.</Text>
          )}
        </View>
      </ScrollView>
      {/* Bottom toast warning */}
      {warn && (
        <View style={styles.toastWrap} pointerEvents="none">
          <Text style={styles.toastText}>Only add items from the same shop</Text>
        </View>
      )}
    </Background>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 10, paddingHorizontal: 16 },
  headerRow: { position: 'relative', height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 6 },
  backButton: { paddingHorizontal: 4, paddingVertical: 4, zIndex: 2, position: 'relative', elevation: 2 },
  backIcon: { fontSize: 22, fontWeight: '700', color: '#111' },
  titleCenter: { position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 20, fontWeight: '900', color: '#111' },
  cartBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#e3e3e3', zIndex: 2, position: 'relative', elevation: 2 },
  cartIcon: { fontSize: 18 },
  badge: { position: 'absolute', top: -4, right: -6, backgroundColor: '#16A34A', borderRadius: 8, paddingHorizontal: 5, paddingVertical: 1 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  searchInput: { height: 42, borderRadius: 10, paddingHorizontal: 14, backgroundColor: 'rgba(255,255,255,0.92)', borderWidth: 1, borderColor: '#e3e3e3', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: '#111', marginVertical: 8 },
  card: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.94)', borderRadius: 12, borderWidth: 1, borderColor: '#e2e2e2', overflow: 'hidden' },
  itemImage: { width: 84, height: 84 },
  cardBody: { flex: 1, padding: 10, justifyContent: 'space-between' },
  itemName: { fontSize: 14, fontWeight: '800', color: '#111' },
  cardActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  itemPrice: { fontSize: 14, color: '#111', fontWeight: '700' },
  addBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#4CAF50', alignItems: 'center', justifyContent: 'center' },
  addBtnIcon: { color: '#fff', fontSize: 18, fontWeight: '900', lineHeight: 22 },
  toastWrap: { position: 'absolute', left: 16, right: 16, bottom: 40, borderRadius: 10, backgroundColor: 'transparent', paddingVertical: 10, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
  toastText: { color: '#ef4444', fontWeight: '700' },
});
