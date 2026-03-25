import React, { useState } from 'react';
import { View, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { Text, TextInput } from '../../components/GlobalComponents';
import ShopCardContent from './ShopCardContent';
import { updateShopStatus, getShopStatus } from '../../shopsStore';

interface ProfileContentProps {
  profileName: string;
  setProfileName: (name: string) => void;
  profileUsername: string;
  setProfileUsername: (username: string) => void;
  profilePhoto?: string;
  profilePhotoError?: string | null;
  shopId?: number; // Add shop ID for status management
}

export default function ProfileContent({ 
  profileName, 
  setProfileName, 
  profileUsername, 
  setProfileUsername, 
  profilePhoto, 
  profilePhotoError,
  shopId = 1 // Default to shop ID 1 for demo
}: ProfileContentProps) {
  const [isShopOpen, setIsShopOpen] = useState(() => getShopStatus('Bharati Vidyapeeth', shopId));
  return (
    <ScrollView style={styles.profileScroll} contentContainerStyle={styles.profileContent}>
      <Text style={styles.profileTitle}>Profile Settings</Text>
      
      {/* Shop Status Toggle - Moved to Top */}
      <View style={styles.shopStatusSection}>
        <View style={styles.statusToggleContainer}>
          <Text style={styles.sectionTitle}>🏪 Shop Status</Text>
          <TouchableOpacity 
            style={[styles.statusToggle, isShopOpen ? styles.statusToggleOpen : styles.statusToggleClosed]}
            onPress={() => {
              const newStatus = !isShopOpen;
              setIsShopOpen(newStatus);
              updateShopStatus('Bharati Vidyapeeth', shopId!, newStatus);
            }}
          >
            <Text style={[styles.statusToggleText, isShopOpen ? styles.statusToggleTextOpen : styles.statusToggleTextClosed]}>
              {isShopOpen ? '🟢 OPEN' : '🔴 CLOSED'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Photo, Name, Username - Moved Down */}
      <View style={styles.profilePhotoRow}>
        <Image
          source={profilePhoto ? { uri: profilePhoto } : require('../../assets/profile-icon.png')}
          style={styles.profilePhoto}
        />
        <TouchableOpacity style={styles.changePhotoBtn}>
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.profileLabel}>Display Name</Text>
      <TextInput
        style={styles.profileInput}
        value={profileName}
        onChangeText={setProfileName}
        placeholder="Enter your name"
      />

      <Text style={styles.profileLabel}>Username</Text>
      <TextInput
        style={styles.profileInput}
        value={profileUsername}
        onChangeText={setProfileUsername}
        placeholder="Enter username"
      />
      {profilePhotoError && (
        <Text style={styles.profileError}>{profilePhotoError}</Text>
      )}

      <TouchableOpacity style={styles.saveProfileBtn}>
        <Text style={styles.saveProfileText}>Save Profile</Text>
      </TouchableOpacity>

      {/* Shop Card Section */}
      <View style={styles.shopCardSection}>
        <Text style={styles.sectionTitle}>🏪 Shop Card</Text>
        <ShopCardContent displayName={profileName} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileScroll: {
    flex: 1,
  },
  profileContent: {
    paddingBottom: 100,
  },
  profileTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111',
    marginVertical: 10,
  },
  profilePhotoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 15,
  },
  profilePhoto: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e5e5e5',
  },
  changePhotoBtn: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 16,
  },
  changePhotoText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  profileLabel: {
    color: '#444',
    marginBottom: 6,
    fontWeight: '600',
  },
  profileInput: {
    height: 46,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.96)',
    marginBottom: 12,
  },
  profileError: {
    fontSize: 12,
    color: '#d32f2f',
    marginTop: 4,
  },
  saveProfileBtn: {
    marginTop: 18,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveProfileText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  shopCardSection: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 16,
  },
  // Shop Status Styles - Ultra Compact
  shopStatusSection: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  statusToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  statusToggle: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  statusToggleOpen: {
    backgroundColor: '#28a745',
  },
  statusToggleClosed: {
    backgroundColor: '#dc3545',
  },
  statusToggleText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  statusToggleTextOpen: {
    color: '#fff',
  },
  statusToggleTextClosed: {
    color: '#fff',
  },
  statusDescription: {
    fontSize: 12,
    color: '#6c757d',
    lineHeight: 18,
    marginTop: 8,
    fontStyle: 'italic',
  },
});
