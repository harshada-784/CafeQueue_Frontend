import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text, TextInput } from './components/GlobalComponents';
import Background from './Background';
import CanteenAdminHP from './Shops/canteen_admin_hp';
import UserHome from './Customer/UserHome';
import CollegeAdminOfficeHP from './College Admin/CollegeAdminOfficeHP';
import Signup from './Signup';
import { StudentStaffLogin, ShopAdminLogin, CollegeAdminLogin } from './LoginComponents';
import { styles } from '../css style/Login.styles';

type UserType = 'college_admin' | 'shop_admin' | 'student/staff';

export default function Login() {
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState<UserType>('student/staff');
  const [showSignup, setShowSignup] = useState(false); // toggle to signup
  const [showAdminHome, setShowAdminHome] = useState(false);
  const [showStudentHome, setShowStudentHome] = useState(false);
  const [showCollegeAdminHome, setShowCollegeAdminHome] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentLoginView, setCurrentLoginView] = useState<'main' | 'student' | 'shop' | 'college'>('main');
  const [collegeName, setCollegeName] = useState('');

  if (showSignup) return <Signup />; // show signup page if toggled
  if (showAdminHome) return <CanteenAdminHP userName={username || 'User'} />;
  if (showStudentHome) return <UserHome userName={username || 'Student'} collegeName={collegeName || 'Your College'} />;
  if (showCollegeAdminHome) return <CollegeAdminOfficeHP userName={username || 'Admin'} collegeName={collegeName || 'Your College'} />;

  // Show specific login components
  if (currentLoginView === 'student') {
    return (
      <StudentStaffLogin
        onBack={() => setCurrentLoginView('main')}
        onSuccess={(userName) => {
          setUsername(userName);
          setShowStudentHome(true); // Navigate to student/staff home
        }}
      />
    );
  }

  if (currentLoginView === 'shop') {
    return (
      <ShopAdminLogin
        onBack={() => setCurrentLoginView('main')}
        onSuccess={(shopId) => {
          setUsername(shopId);
          setShowAdminHome(true); // Direct to canteen homepage
        }}
      />
    );
  }

  if (currentLoginView === 'college') {
    return (
      <CollegeAdminLogin
        onBack={() => setCurrentLoginView('main')}
        onSuccess={(email) => {
          setUsername(email);
          // Extract college name from email domain
          const domain = email.split('@')[1];
          setCollegeName(domain.replace('.edu', ''));
          setShowCollegeAdminHome(true); // Navigate to college admin home
        }}
      />
    );
  }

  const handleLogin = () => {
    // Navigate to specific login based on user type
    if (userType === 'student/staff') {
      setCurrentLoginView('student');
    } else if (userType === 'shop_admin') {
      setCurrentLoginView('shop');
    } else if (userType === 'college_admin') {
      setCurrentLoginView('college');
    }
  };

  const userTypes: { value: UserType; label: string }[] = [
    { value: 'student/staff', label: 'Student/Staff' },
    { value: 'college_admin', label: 'College Admin' },
    { value: 'shop_admin', label: 'Shop Admin' },
  ];

  const selectedUserType = userTypes.find(type => type.value === userType);

  return (
    <Background>
    <View style={styles.container}>
      {/* App Logo and Name */}
      <View style={styles.logoContainer}>
        <Image
          source={ require('./assets/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.appName}>CafeQueue</Text>
      </View>
      <Text style={styles.title}>Login</Text>


      {/* User Type Dropdown */}
      {showDropdown && (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.backdrop}
          onPress={() => setShowDropdown(false)}
        />
      )}

      <View style={[styles.dropdownContainer, showDropdown && styles.dropdownContainerActive]}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={[styles.dropdownButtonText, userType === 'student/staff' && styles.placeholderText]}>
            {selectedUserType?.label || 'Select User Type'}
          </Text>
          <Text style={styles.dropdownArrow}>{showDropdown ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {showDropdown && (
          <View style={[styles.dropdownList, styles.dropdownListActive]}>
            {userTypes.map((type) => (
              <TouchableOpacity
                key={type.value}
                style={styles.dropdownItem}
                onPress={() => {
                  setUserType(type.value);
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowSignup(true)}>
        <Text style={styles.linkText}>Don't have an account? Signup</Text>
      </TouchableOpacity>
    </View>
    </Background>
  );
}
