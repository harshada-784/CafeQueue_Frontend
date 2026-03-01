import React from 'react';
import { View, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { Text, TextInput } from '../../components/GlobalComponents';

interface ProfileContentProps {
  profileName: string;
  setProfileName: (name: string) => void;
  profileUsername: string;
  setProfileUsername: (username: string) => void;
  profilePhoto?: string;
  profilePhotoError?: string | null;
}

export default function ProfileContent({ 
  profileName, 
  setProfileName, 
  profileUsername, 
  setProfileUsername, 
  profilePhoto, 
  profilePhotoError 
}: ProfileContentProps) {
  return (
    <ScrollView style={styles.profileScroll} contentContainerStyle={styles.profileContent}>
      <Text style={styles.profileTitle}>Profile Settings</Text>
      
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
});
