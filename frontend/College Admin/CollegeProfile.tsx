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
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <Text style={styles.formTitle}>College Profile</Text>

      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImage}>
            <Text style={{ fontSize: 32, color: '#666' }}>🏫</Text>
          </View>
          <View style={styles.profileInfo}>
            {editMode ? (
              <TextInput
                style={[styles.profileName, { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, paddingHorizontal: 8 }]}
                value={editedProfile.name}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, name: text })}
                placeholder="College Name"
              />
            ) : (
              <Text style={styles.profileName}>{editedProfile.name}</Text>
            )}
            <Text style={styles.profileType}>Educational Institution</Text>
          </View>
        </View>

        <View style={styles.profileDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Address:</Text>
            {editMode ? (
              <TextInput
                style={[styles.detailValue, { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, paddingHorizontal: 8, flex: 1 }]}
                value={editedProfile.address}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, address: text })}
                placeholder="Address"
              />
            ) : (
              <Text style={styles.detailValue}>{editedProfile.address}</Text>
            )}
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>City:</Text>
            {editMode ? (
              <TextInput
                style={[styles.detailValue, { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, paddingHorizontal: 8, flex: 1 }]}
                value={editedProfile.city}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, city: text })}
                placeholder="City"
              />
            ) : (
              <Text style={styles.detailValue}>{editedProfile.city}</Text>
            )}
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>State:</Text>
            {editMode ? (
              <TextInput
                style={[styles.detailValue, { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, paddingHorizontal: 8, flex: 1 }]}
                value={editedProfile.state}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, state: text })}
                placeholder="State"
              />
            ) : (
              <Text style={styles.detailValue}>{editedProfile.state}</Text>
            )}
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Pincode:</Text>
            {editMode ? (
              <TextInput
                style={[styles.detailValue, { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, paddingHorizontal: 8, flex: 1 }]}
                value={editedProfile.pincode}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, pincode: text })}
                placeholder="Pincode"
                keyboardType="numeric"
                maxLength={6}
              />
            ) : (
              <Text style={styles.detailValue}>{editedProfile.pincode}</Text>
            )}
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Phone:</Text>
            {editMode ? (
              <TextInput
                style={[styles.detailValue, { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, paddingHorizontal: 8, flex: 1 }]}
                value={editedProfile.phone}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, phone: text })}
                placeholder="Phone Number"
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.detailValue}>{editedProfile.phone}</Text>
            )}
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email:</Text>
            {editMode ? (
              <TextInput
                style={[styles.detailValue, { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, paddingHorizontal: 8, flex: 1 }]}
                value={editedProfile.email}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, email: text })}
                placeholder="Email"
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.detailValue}>{editedProfile.email}</Text>
            )}
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Website:</Text>
            {editMode ? (
              <TextInput
                style={[styles.detailValue, { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, paddingHorizontal: 8, flex: 1 }]}
                value={editedProfile.website}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, website: text })}
                placeholder="Website"
              />
            ) : (
              <Text style={styles.detailValue}>{editedProfile.website}</Text>
            )}
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Established:</Text>
            {editMode ? (
              <TextInput
                style={[styles.detailValue, { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, paddingHorizontal: 8, flex: 1 }]}
                value={editedProfile.establishedYear}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, establishedYear: text })}
                placeholder="Year"
                keyboardType="numeric"
                maxLength={4}
              />
            ) : (
              <Text style={styles.detailValue}>{editedProfile.establishedYear}</Text>
            )}
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Students:</Text>
            {editMode ? (
              <TextInput
                style={[styles.detailValue, { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, paddingHorizontal: 8, flex: 1 }]}
                value={editedProfile.totalStudents}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, totalStudents: text })}
                placeholder="Number of Students"
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.detailValue}>{editedProfile.totalStudents}</Text>
            )}
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
        {editMode ? (
          <>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50', flex: 1 }]} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#F44336', flex: 1 }]} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={[styles.button, { backgroundColor: '#2196F3' }]} onPress={() => setEditMode(true)}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
