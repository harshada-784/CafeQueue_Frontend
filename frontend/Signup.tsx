import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { Text, TextInput, Button, Title, Heading } from './components/GlobalComponents';
import Background from './Background';
import CanteenAdminHP from './Shops/canteen_admin_hp';
import CanteenAdminOfficeHP from './College Admin/CollegeAdminOfficeHP';
import Login from './Login';
import { isUsernameTaken, addUsername } from './userStore';
import UserHome from './Customer/UserHome';
import { styles } from '../css style/Signup.styles';

export default function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('Select usertype'); //dropdown
  const [showDropdown, setShowDropdown] = useState(false); //dropdown visibility
  const [showLogin, setShowLogin] = useState(false); //connect between signup/login
  const [showAdminHome, setShowAdminHome] = useState(false);
  const [collegeName, setCollegeName] = useState('Select college');
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [showUserHome, setShowUserHome] = useState(false);
  const [showAdminOfficeHome, setShowAdminOfficeHome] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [officeEmail, setOfficeEmail] = useState('');
  const [officeOtp, setOfficeOtp] = useState('');
  const [studentCardId, setStudentCardId] = useState('');
  const [shopId, setShopId] = useState('');

  // New state for admin office verification flow
  const [adminStep, setAdminStep] = useState<'email_college' | 'verify_email' | 'otp_verify' | 'final_fields'>('email_college');
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);


  if (showLogin) return <Login />; // show login page if toggled
  if (showAdminHome) return <CanteenAdminHP userName={username || 'User'} />;
  if (showAdminOfficeHome) return <CanteenAdminOfficeHP userName={username || 'User'} collegeName={collegeName} />;
  if (showUserHome) return <UserHome userName={username || 'User'} collegeName={collegeName} />;

  const handleDropdownSelect = (value: string, label: string) => {
    // Close any open dropdowns first to avoid visual clashes
    setShowDropdown(false);
    setShowCollegeDropdown(false);
    setUserType(label);
    // Reset college selection whenever user type changes
    if (label === 'Student/Staff') {
      setCollegeName('Select college');
      setStudentCardId('');
    } else if (label === 'Canteen Shop') {
      setCollegeName('Select college');
      setShopId('');
    } else if (label === 'Canteen Admin Office') {
      setCollegeName('');
      setOfficeEmail('');
      setOfficeOtp('');
      // Reset admin verification state
      setAdminStep('email_college');
      setIsVerifyingEmail(false);
      setIsVerifyingOtp(false);
      setEmailVerified(false);
    }
  };

  const handleCollegeSelect = (label: string) => {
    setCollegeName(label);
    setShowCollegeDropdown(false);
  };

  const handleVerifyEmail = async () => {
    if (!officeEmail.trim() || !collegeName.trim()) {
      return;
    }

    setIsVerifyingEmail(true);

    // Simulate email verification API call
    setTimeout(() => {
      setIsVerifyingEmail(false);
      setEmailVerified(true);
      setAdminStep('otp_verify');
    }, 2000);
  };

  const handleVerifyOtp = async () => {
    if (!officeOtp.trim()) {
      return;
    }

    setIsVerifyingOtp(true);

    // Simulate OTP verification API call
    setTimeout(() => {
      setIsVerifyingOtp(false);
      setAdminStep('final_fields');
    }, 2000);
  };

  const handleSignup = () => {
    const trimmed = (username || '').trim();
    if (!trimmed) {
      setUsernameError('Username is required');
      return;
    }
    if (isUsernameTaken(trimmed)) {
      setUsernameError('Username already taken');
      return;
    }
    if (password !== confirm_password) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError(''); // Clear password error if they match
    // Temporary routing: if canteen admin selected, go to admin home
    addUsername(trimmed);
    if (userType === 'Canteen Shop') {
      setShowAdminHome(true);
      return;
    }
    if (userType === 'Canteen Admin Office') {
      // Require college selection for admin office
      if (!collegeName || collegeName === 'Select college') {
        return;
      }
      setShowAdminOfficeHome(true);
      return;
    }
    if (userType === 'Student/Staff') {
      // Require a college selection
      if (!collegeName || collegeName === 'Select college') {
        return;
      }
      setShowUserHome(true);
      return;
    }
  };

  const handleGuestContinue = () => {
    // Navigate to user home as guest
    setUsername('Guest');
    setShowUserHome(true);
  };

  return (
    <Background>
    <View style={styles.container}>
      {/* App Logo and Name */}
      <View style={styles.logoContainer}>
        <Image
          source={ require('./assets/logo.png') }
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.appName}>CafeQueue</Text>
      </View>
      {(showDropdown || showCollegeDropdown) && (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.backdrop}
          onPress={() => {
            setShowDropdown(false);
            setShowCollegeDropdown(false);
          }}
        />
      )}
      <Text style={styles.title}>Signup</Text>

      {/* Custom Dropdown */}
      <View style={[styles.dropdownContainer, showDropdown && styles.dropdownContainerActive]}>
        <TouchableOpacity 
          style={styles.dropdownButton} 
          onPress={() => {
            const next = !showDropdown;
            // When opening user type dropdown, ensure college dropdown is closed
            if (next) setShowCollegeDropdown(false);
            setShowDropdown(next);
          }}
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

      {userType === 'Select usertype' && (
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      )}

      {/* Student/Staff Flow */}
      {userType === 'Student/Staff' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(t) => {
              setUsername(t);
              if (usernameError) setUsernameError('');
            }}
          />
          {!!usernameError && <Text style={styles.errorText}>{usernameError}</Text>}

          {/* College selection for Student/Staff */}
          <View style={[styles.dropdownContainer, showCollegeDropdown && styles.dropdownContainerActive]}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => {
                const next = !showCollegeDropdown;
                if (next) setShowDropdown(false);
                setShowCollegeDropdown(next);
              }}
            >
              <Text
                style={[
                  styles.dropdownButtonText,
                  collegeName === 'Select college' && styles.placeholderText,
                ]}
              >
                {collegeName}
              </Text>
              <Text style={styles.dropdownArrow}>
                {showCollegeDropdown ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>

            {showCollegeDropdown && (
              <View style={[styles.dropdownList, styles.dropdownListActive]}>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleCollegeSelect('Bharati Vidyapeeth')}
                >
                  <Text style={styles.dropdownItemText}>Bharati Vidyapeeth</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleCollegeSelect('State Engineering College')}
                >
                  <Text style={styles.dropdownItemText}>State Engineering College</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleCollegeSelect('City Science University')}
                >
                  <Text style={styles.dropdownItemText}>City Science University</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleCollegeSelect('Lakeside Arts College')}
                >
                  <Text style={styles.dropdownItemText}>Lakeside Arts College</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter E-Canteen Card ID"
            value={studentCardId}
            onChangeText={setStudentCardId}
          />

          <TextInput
            style={[styles.input, passwordError ? styles.inputError : null]}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError('');
            }}
          />
          <TextInput
            style={[styles.input, passwordError ? styles.inputError : null]}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirm_password}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (passwordError) setPasswordError('');
            }}
          />
          {!!passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowLogin(true)}>
            <Text style={styles.linkText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Canteen Shop Flow */}
      {userType === 'Canteen Shop' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(t) => {
              setUsername(t);
              if (usernameError) setUsernameError('');
            }}
          />
          {!!usernameError && <Text style={styles.errorText}>{usernameError}</Text>}

          {/* College selection for Canteen Shop */}
          <View style={[styles.dropdownContainer, showCollegeDropdown && styles.dropdownContainerActive]}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => {
                const next = !showCollegeDropdown;
                if (next) setShowDropdown(false);
                setShowCollegeDropdown(next);
              }}
            >
              <Text
                style={[
                  styles.dropdownButtonText,
                  collegeName === 'Select college' && styles.placeholderText,
                ]}
              >
                {collegeName}
              </Text>
              <Text style={styles.dropdownArrow}>
                {showCollegeDropdown ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>

            {showCollegeDropdown && (
              <View style={[styles.dropdownList, styles.dropdownListActive]}>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleCollegeSelect('Bharati Vidyapeeth')}
                >
                  <Text style={styles.dropdownItemText}>Bharati Vidyapeeth</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleCollegeSelect('State Engineering College')}
                >
                  <Text style={styles.dropdownItemText}>State Engineering College</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleCollegeSelect('City Science University')}
                >
                  <Text style={styles.dropdownItemText}>City Science University</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleCollegeSelect('Lakeside Arts College')}
                >
                  <Text style={styles.dropdownItemText}>Lakeside Arts College</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter E-Canteen Shop ID"
            value={shopId}
            onChangeText={setShopId}
          />

          <TextInput
            style={[styles.input, passwordError ? styles.inputError : null]}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError('');
            }}
          />
          <TextInput
            style={[styles.input, passwordError ? styles.inputError : null]}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirm_password}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (passwordError) setPasswordError('');
            }}
          />
          {!!passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowLogin(true)}>
            <Text style={styles.linkText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Canteen Admin Office Flow */}
      {userType === 'Canteen Admin Office' && (
        <>
          {adminStep === 'email_college' && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter College Name"
                value={collegeName}
                onChangeText={setCollegeName}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter Email"
                value={officeEmail}
                onChangeText={setOfficeEmail}
                keyboardType="email-address"
              />
              <TouchableOpacity
                style={[styles.button, (!officeEmail.trim() || !collegeName.trim()) && styles.buttonDisabled]}
                onPress={handleVerifyEmail}
                disabled={!officeEmail.trim() || !collegeName.trim() || isVerifyingEmail}
              >
                <Text style={styles.buttonText}>
                  {isVerifyingEmail ? 'Verifying Email...' : 'Verify Email'}
                </Text>
              </TouchableOpacity>
            </>
          )}

          {adminStep === 'otp_verify' && (
            <>
              <Text style={styles.infoText}>Enter the OTP sent to {officeEmail}</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                value={officeOtp}
                onChangeText={setOfficeOtp}
                keyboardType="number-pad"
                maxLength={6}
              />
              <TouchableOpacity
                style={[styles.button, !officeOtp.trim() && styles.buttonDisabled]}
                onPress={handleVerifyOtp}
                disabled={!officeOtp.trim() || isVerifyingOtp}
              >
                <Text style={styles.buttonText}>
                  {isVerifyingOtp ? 'Verifying College...' : 'Verify College'}
                </Text>
              </TouchableOpacity>
            </>
          )}

          {adminStep === 'final_fields' && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(t) => {
                  setUsername(t);
                  if (usernameError) setUsernameError('');
                }}
              />
              {!!usernameError && <Text style={styles.errorText}>{usernameError}</Text>}

              <TextInput
                style={[styles.input, passwordError ? styles.inputError : null]}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) setPasswordError('');
                }}
              />
              <TextInput
                style={[styles.input, passwordError ? styles.inputError : null]}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirm_password}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (passwordError) setPasswordError('');
                }}
              />
              {!!passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

              <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Complete Signup</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleGuestContinue}>
                <Text style={styles.guestLinkText}>Continue as guest</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
    </Background>
  );
}

