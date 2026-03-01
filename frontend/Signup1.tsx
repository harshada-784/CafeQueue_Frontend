import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from './components/GlobalComponents';
import Background from './Background';
import { styles } from '../css style/Signup.styles';

interface Signup1Props {
  userType: string;
  showDropdown: boolean;
  onUserTypeChange: (type: string) => void;
  onToggleDropdown: () => void;
  onCloseDropdowns: () => void;
  onContinue: () => void;
  onGoToLogin: () => void;
  onGuestContinue: () => void;
}

export default function Signup1({
  userType,
  showDropdown,
  onUserTypeChange,
  onToggleDropdown,
  onCloseDropdowns,
  onContinue,
  onGoToLogin,
  onGuestContinue,
}: Signup1Props) {
  const handleDropdownSelect = (value: string, label: string) => {
    onUserTypeChange(label);
  };

  return (
    <Background>
      <View style={styles.container}>
        {/* App Logo and Name */}
        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.appName}>CafeQueue</Text>
        </View>

        {showDropdown && (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.backdrop}
            onPress={onCloseDropdowns}
          />
        )}

        <Text style={styles.title}>Signup</Text>

        {/* Custom Dropdown */}
        <View style={[styles.dropdownContainer, showDropdown && styles.dropdownContainerActive]}>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={onToggleDropdown}
          >
            <Text style={[styles.dropdownButtonText, userType === 'Select usertype' && styles.placeholderText]}>
              {userType}
            </Text>
            <Text style={styles.dropdownArrow}>{showDropdown ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {showDropdown && (
            <View style={[styles.dropdownList, styles.dropdownListActive]}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleDropdownSelect('student_staff', 'Student/Staff')}
              >
                <Text style={styles.dropdownItemText}>Student/Staff</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleDropdownSelect('canteen_shop', 'Canteen Shop')}
              >
                <Text style={styles.dropdownItemText}>Canteen Shop</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleDropdownSelect('canteen_admin_office', 'Canteen Admin Office')}
              >
                <Text style={styles.dropdownItemText}>Canteen Admin Office</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={onContinue}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onGuestContinue}>
          <Text style={styles.guestLinkText}>Continue as guest</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
