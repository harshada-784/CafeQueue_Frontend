import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text, TextInput } from '../components/GlobalComponents';
import Background from '../Background';
import { addItem } from '../dailySpecialsStore';
import { styles } from '../../css style/canteen_admin_add_item.styes';

interface Props {
  onDone: () => void;
  onBack?: () => void;
}

export default function CanteenAdminAddItem({ onDone, onBack }: Props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState('');

  const handleAdd = () => {
    const n = name.trim();
    const p = Number(price);
    if (!n || isNaN(p)) return;
    addItem(n, p, imageUri.trim() || undefined);
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
        <Text style={styles.title}>Add item to{'\n'}Daily Specials</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Proceed to Add</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
