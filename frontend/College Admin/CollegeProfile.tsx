import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { Text, TextInput } from '../components/GlobalComponents';
import { styles } from '../../css style/CollegeAdminOfficeHP.styles';

interface CollegeProfile {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  website: string;
  establishedYear: string;
  totalStudents: string;
}

interface Props {
  profile: CollegeProfile;
  onSave: (profile: CollegeProfile) => void;
  onBack: () => void;
}

export default function CollegeProfile({ profile, onSave, onBack }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState<CollegeProfile>(profile);

  const handleSave = () => {
    if (!editedProfile.name.trim() || !editedProfile.address.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    onSave(editedProfile);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setEditMode(false);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>College Profile</Text>

      {/* College Overview Card */}
      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Text style={{ fontSize: 48, color: '#c09a7e' }}>🏫</Text>
          </View>
          <View style={styles.profileInfo}>
            {editMode ? (
              <TextInput
                style={[styles.profileName, { borderWidth: 2, borderColor: '#c09a7e', borderRadius: 8, paddingHorizontal: 12, backgroundColor: '#fff' }]}
                value={editedProfile.name}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, name: text })}
                placeholder="College Name"
              />
            ) : (
              <Text style={styles.profileName}>{editedProfile.name || 'College Name'}</Text>
            )}
            <Text style={styles.profileType}>Educational Institution</Text>
            
            {/* Quick Stats */}
            <View style={styles.quickStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{editedProfile.totalStudents || '0'}</Text>
                <Text style={styles.statLabel}>Students</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{editedProfile.establishedYear || 'N/A'}</Text>
                <Text style={styles.statLabel}>Since</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>📞 Contact Information</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>📍</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Address</Text>
              {editMode ? (
                <TextInput
                  style={[styles.infoValue, { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, paddingHorizontal: 8, backgroundColor: '#fff' }]}
                  value={editedProfile.address}
                  onChangeText={(text) => setEditedProfile({ ...editedProfile, address: text })}
                  placeholder="Enter address"
                />
              ) : (
                <Text style={styles.infoValue}>{editedProfile.address || 'Not set'}</Text>
              )}
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>🏙️</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>City</Text>
              {editMode ? (
                <TextInput
                  style={[styles.infoValue, { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, paddingHorizontal: 8, backgroundColor: '#fff' }]}
                  value={editedProfile.city}
                  onChangeText={(text) => setEditedProfile({ ...editedProfile, city: text })}
                  placeholder="Enter city"
                />
              ) : (
                <Text style={styles.infoValue}>{editedProfile.city || 'Not set'}</Text>
              )}
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>🌍</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>State</Text>
              {editMode ? (
                <TextInput
                  style={[styles.infoValue, { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, paddingHorizontal: 8, backgroundColor: '#fff' }]}
                  value={editedProfile.state}
                  onChangeText={(text) => setEditedProfile({ ...editedProfile, state: text })}
                  placeholder="Enter state"
                />
              ) : (
                <Text style={styles.infoValue}>{editedProfile.state || 'Not set'}</Text>
              )}
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>📮</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Pincode</Text>
              {editMode ? (
                <TextInput
                  style={[styles.infoValue, { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, paddingHorizontal: 8, backgroundColor: '#fff' }]}
                  value={editedProfile.pincode}
                  onChangeText={(text) => setEditedProfile({ ...editedProfile, pincode: text })}
                  placeholder="Enter pincode"
                  keyboardType="numeric"
                  maxLength={6}
                />
              ) : (
                <Text style={styles.infoValue}>{editedProfile.pincode || 'Not set'}</Text>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Digital Presence */}
      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>🌐 Digital Presence</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>📞</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              {editMode ? (
                <TextInput
                  style={[styles.infoValue, { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, paddingHorizontal: 8, backgroundColor: '#fff' }]}
                  value={editedProfile.phone}
                  onChangeText={(text) => setEditedProfile({ ...editedProfile, phone: text })}
                  placeholder="Enter phone"
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={styles.infoValue}>{editedProfile.phone || 'Not set'}</Text>
              )}
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>📧</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              {editMode ? (
                <TextInput
                  style={[styles.infoValue, { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, paddingHorizontal: 8, backgroundColor: '#fff' }]}
                  value={editedProfile.email}
                  onChangeText={(text) => setEditedProfile({ ...editedProfile, email: text })}
                  placeholder="Enter email"
                  keyboardType="email-address"
                />
              ) : (
                <Text style={styles.infoValue}>{editedProfile.email || 'Not set'}</Text>
              )}
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>🌐</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Website</Text>
              {editMode ? (
                <TextInput
                  style={[styles.infoValue, { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, paddingHorizontal: 8, backgroundColor: '#fff' }]}
                  value={editedProfile.website}
                  onChangeText={(text) => setEditedProfile({ ...editedProfile, website: text })}
                  placeholder="Enter website"
                />
              ) : (
                <Text style={styles.infoValue}>{editedProfile.website || 'Not set'}</Text>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        {editMode ? (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={handleSave}>
              <Text style={styles.actionButtonText}>💾 Save Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={handleCancel}>
              <Text style={styles.actionButtonText}>❌ Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => setEditMode(true)}>
            <Text style={styles.actionButtonText}>✏️ Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
