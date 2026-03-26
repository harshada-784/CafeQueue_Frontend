import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Text as GlobalText } from '../components/GlobalComponents';
import { collegeProfileStyles } from '../../css style/CollegeProfile.styles';

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
    onSave(editedProfile);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setEditMode(false);
  };

  return (
    <View style={collegeProfileStyles.formContainer}>

      <GlobalText style={collegeProfileStyles.formTitle}>College Profile</GlobalText>

      {/* College Overview Card */}
      <View style={collegeProfileStyles.profileSection}>
        <View style={collegeProfileStyles.profileHeader}>
          <View style={collegeProfileStyles.profileImageContainer}>
            <GlobalText style={{ fontSize: 48, color: '#c09a7e' }}>🏫</GlobalText>
          </View>
          <View style={collegeProfileStyles.profileInfo}>
            {editMode ? (
              <TextInput
                style={[collegeProfileStyles.profileName, { borderWidth: 2, borderColor: '#c09a7e', borderRadius: 8, paddingHorizontal: 12, backgroundColor: '#fff' }]}
                value={editedProfile.name}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, name: text })}
                placeholder="College Name"
              />
            ) : (
              <GlobalText style={collegeProfileStyles.profileName}>{editedProfile.name || 'College Name'}</GlobalText>
            )}
            <GlobalText style={collegeProfileStyles.profileType}>Educational Institution</GlobalText>
            
            {/* Quick Stats */}
            <View style={collegeProfileStyles.quickStats}>
              <View style={collegeProfileStyles.statItem}>
                <GlobalText style={collegeProfileStyles.statNumber}>{editedProfile.totalStudents || '1000'}</GlobalText>
                <GlobalText style={collegeProfileStyles.statLabel}>Students</GlobalText>
              </View>
              <View style={collegeProfileStyles.statDivider} />
              <View style={collegeProfileStyles.statItem}>
                <GlobalText style={collegeProfileStyles.statNumber}>{editedProfile.establishedYear || '2025'}</GlobalText>
                <GlobalText style={collegeProfileStyles.statLabel}>Since</GlobalText>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Edit Profile Button - Prominent Position */}
      {!editMode && (
        <View style={collegeProfileStyles.prominentEditContainer}>
          <TouchableOpacity style={collegeProfileStyles.prominentEditButton} onPress={() => setEditMode(true)}>
            <GlobalText style={collegeProfileStyles.prominentEditText}>✏️ Edit Profile</GlobalText>
          </TouchableOpacity>
        </View>
      )}

      {/* Contact Information */}
      <View style={collegeProfileStyles.profileSection}>
        <GlobalText style={collegeProfileStyles.sectionTitle}>📞 Contact Information</GlobalText>
        <View style={collegeProfileStyles.infoGrid}>
          <View style={collegeProfileStyles.infoCard}>
            <GlobalText style={collegeProfileStyles.infoIcon}>📍</GlobalText>
            <View style={collegeProfileStyles.infoContent}>
              <GlobalText style={collegeProfileStyles.infoLabel}>Address</GlobalText>
              {editMode ? (
                <TextInput
                  style={[collegeProfileStyles.infoValue, { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, paddingHorizontal: 8, backgroundColor: '#fff' }]}
                  value={editedProfile.address}
                  onChangeText={(text) => setEditedProfile({ ...editedProfile, address: text })}
                  placeholder="Enter address"
                />
              ) : (
                <GlobalText style={collegeProfileStyles.infoValue}>{editedProfile.address || 'Not set'}</GlobalText>
              )}
            </View>
          </View>

          <View style={collegeProfileStyles.infoCard}>
            <GlobalText style={collegeProfileStyles.infoIcon}>📍</GlobalText>
            <View style={collegeProfileStyles.infoContent}>
              <GlobalText style={collegeProfileStyles.infoLabel}>City</GlobalText>
              {editMode ? (
                <TextInput
                  style={[collegeProfileStyles.infoValue, { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, paddingHorizontal: 8, backgroundColor: '#fff' }]}
                  value={editedProfile.city}
                  onChangeText={(text) => setEditedProfile({ ...editedProfile, city: text })}
                  placeholder="Enter city"
                />
              ) : (
                <GlobalText style={collegeProfileStyles.infoValue}>{editedProfile.city || 'Not set'}</GlobalText>
              )}
            </View>
          </View>

          <View style={collegeProfileStyles.infoCard}>
            <GlobalText style={collegeProfileStyles.infoIcon}>📍</GlobalText>
            <View style={collegeProfileStyles.infoContent}>
              <GlobalText style={collegeProfileStyles.infoLabel}>State</GlobalText>
              {editMode ? (
                <TextInput
                  style={[collegeProfileStyles.infoValue, { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, paddingHorizontal: 8, backgroundColor: '#fff' }]}
                  value={editedProfile.state}
                  onChangeText={(text) => setEditedProfile({ ...editedProfile, state: text })}
                  placeholder="Enter state"
                />
              ) : (
                <GlobalText style={collegeProfileStyles.infoValue}>{editedProfile.state || 'Not set'}</GlobalText>
              )}
            </View>
          </View>

          <View style={collegeProfileStyles.infoCard}>
            <GlobalText style={collegeProfileStyles.infoIcon}>📍</GlobalText>
            <View style={collegeProfileStyles.infoContent}>
              <GlobalText style={collegeProfileStyles.infoLabel}>Pincode</GlobalText>
              {editMode ? (
                <TextInput
                  style={[collegeProfileStyles.infoValue, { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, paddingHorizontal: 8, backgroundColor: '#fff' }]}
                  value={editedProfile.pincode}
                  onChangeText={(text) => setEditedProfile({ ...editedProfile, pincode: text })}
                  placeholder="Enter pincode"
                  keyboardType="numeric"
                />
              ) : (
                <GlobalText style={collegeProfileStyles.infoValue}>{editedProfile.pincode || 'Not set'}</GlobalText>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Digital Presence */}
      <View style={collegeProfileStyles.profileSection}>
        <GlobalText style={collegeProfileStyles.sectionTitle}>🌐 Digital Presence</GlobalText>
        <View style={collegeProfileStyles.infoGrid}>
          <View style={collegeProfileStyles.infoCard}>
            <GlobalText style={collegeProfileStyles.infoIcon}>📞</GlobalText>
            <View style={collegeProfileStyles.infoContent}>
              <GlobalText style={collegeProfileStyles.infoLabel}>Phone</GlobalText>
              {editMode ? (
                <TextInput
                  style={[collegeProfileStyles.infoValue, { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, paddingHorizontal: 8, backgroundColor: '#fff' }]}
                  value={editedProfile.phone}
                  onChangeText={(text) => setEditedProfile({ ...editedProfile, phone: text })}
                  placeholder="Enter phone"
                  keyboardType="phone-pad"
                />
              ) : (
                <GlobalText style={collegeProfileStyles.infoValue}>{editedProfile.phone || 'Not set'}</GlobalText>
              )}
            </View>
          </View>

          <View style={collegeProfileStyles.infoCard}>
            <GlobalText style={collegeProfileStyles.infoIcon}>📧</GlobalText>
            <View style={collegeProfileStyles.infoContent}>
              <GlobalText style={collegeProfileStyles.infoLabel}>Email</GlobalText>
              {editMode ? (
                <TextInput
                  style={[collegeProfileStyles.infoValue, { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, paddingHorizontal: 8, backgroundColor: '#fff' }]}
                  value={editedProfile.email}
                  onChangeText={(text) => setEditedProfile({ ...editedProfile, email: text })}
                  placeholder="Enter email"
                  keyboardType="email-address"
                />
              ) : (
                <GlobalText style={collegeProfileStyles.infoValue}>{editedProfile.email || 'Not set'}</GlobalText>
              )}
            </View>
          </View>

          <View style={collegeProfileStyles.infoCard}>
            <GlobalText style={collegeProfileStyles.infoIcon}>🌐</GlobalText>
            <View style={collegeProfileStyles.infoContent}>
              <GlobalText style={collegeProfileStyles.infoLabel}>Website</GlobalText>
              {editMode ? (
                <TextInput
                  style={[collegeProfileStyles.infoValue, { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, paddingHorizontal: 8, backgroundColor: '#fff' }]}
                  value={editedProfile.website}
                  onChangeText={(text) => setEditedProfile({ ...editedProfile, website: text })}
                  placeholder="Enter website"
                />
              ) : (
                <GlobalText style={collegeProfileStyles.infoValue}>{editedProfile.website || 'Not set'}</GlobalText>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={collegeProfileStyles.actionContainer}>
        {editMode ? (
          <View style={collegeProfileStyles.actionButtons}>
            <TouchableOpacity style={[collegeProfileStyles.actionButton, collegeProfileStyles.saveButton]} onPress={handleSave}>
              <GlobalText style={collegeProfileStyles.actionButtonText}>💾 Save</GlobalText>
            </TouchableOpacity>
            <TouchableOpacity style={[collegeProfileStyles.actionButton, collegeProfileStyles.cancelButton]} onPress={handleCancel}>
              <GlobalText style={collegeProfileStyles.actionButtonText}>❌ Cancel</GlobalText>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
}
