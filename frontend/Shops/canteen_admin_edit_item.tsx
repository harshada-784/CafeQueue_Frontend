import React, { useState, useMemo } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text, TextInput } from '../components/GlobalComponents';
import Background from '../Background';
import { getItems, updateItem } from '../dailySpecialsStore';
import { styles } from '../../css style/canteen_admin_edit_item.styles';

interface Props {
  itemId: number;
  onDone: () => void;
  onBack?: () => void;
  userName?: string;
}

export default function CanteenAdminEditItem({ itemId, onDone, onBack, userName = 'User' }: Props) {
  const item = useMemo(() => getItems().find(i => i.id === itemId), [itemId]);
  const [name, setName] = useState(item?.name ?? '');
  const [price, setPrice] = useState(String(item?.price ?? ''));
  const [imageUri, setImageUri] = useState(item?.imageUri ?? '');

  const handleSave = () => {
    const n = name.trim();
    const p = Number(price);
    if (!n || isNaN(p)) return;
    updateItem(itemId, n, p, imageUri.trim() || undefined);
    onDone();
  };

  return (
    <Background>
      <View style={styles.container}>
        {/* Back button */}
        <View style={styles.topBar}>
          {!!onBack && (
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* No profile/greeting on this screen as requested */}
        <Text style={styles.title}>Edit item in{`\n`}Daily Specials</Text>
        <TextInput
          placeholder="Enter Item Name..."
          placeholderTextColor="#666"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Item Price"
          placeholderTextColor="#666"
          keyboardType="numeric"
          style={styles.input}
          value={price}
          onChangeText={setPrice}
        />
        <TextInput
          placeholder="Image URL (optional)"
          placeholderTextColor="#666"
          style={styles.input}
          value={imageUri}
          onChangeText={setImageUri}
        />
        {!!imageUri?.trim() && (
          <View style={styles.previewWrap}>
            <Image
              source={{ uri: imageUri.trim() }}
              style={styles.preview}
              resizeMode="cover"
            />
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Proceed to Add</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
