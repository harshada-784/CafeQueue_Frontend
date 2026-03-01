import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import { launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';
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

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8 as any,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) {
        return;
      }

      if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          setImageUri(imageUri);
        }
      }
    });
  };

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
        
        {/* Image Section */}
        <View style={styles.imageSection}>
          {imageUri?.trim() ? (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{ uri: imageUri.trim() }}
                style={styles.preview}
                resizeMode="cover"
              />
              <TouchableOpacity 
                style={styles.changeImageBtn}
                onPress={handleImagePicker}
              >
                <Text style={styles.changeImageBtnText}>📷 Change Image</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.addImageBtn}
              onPress={handleImagePicker}
            >
              <Text style={styles.addImageBtnText}>📷 Add Image from Gallery</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Proceed to Add</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
