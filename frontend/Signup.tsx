import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import Background from './Background';
import CanteenAdminHP from './canteen_admin_hp';
import CanteenAdminOfficeHP from './CanteenAdminOfficeHP';
import Login from './Login';
import { isUsernameTaken, addUsername } from './userStore';
import UserHome from './UserHome';

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
            </>
          )}
        </>
      )}
    </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15 },
  button: { width: '100%', height: 50, backgroundColor: '#4CAF50', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  infoText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  linkText: { color: '#007BFF', marginTop: 10 },
  errorText: { color: 'red', alignSelf: 'flex-start', marginTop: -10, marginBottom: 10, marginLeft: 10 },
  inputError: {
    borderColor: 'red',
  },
  // Logo and App name
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 140,
    height: 140,
    borderRadius: 16,
    marginBottom: 10,
  },
  appName: {
    fontSize: 48, 
    fontWeight: '800',
    color: '#222',
    letterSpacing: 0.5,
    fontFamily: Platform.select({ ios: 'Snell Roundhand', android: 'cursive', default: undefined }),
    marginBottom: 4,
  },
  // Full-screen backdrop to close dropdowns on outside tap
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 900,
  },
  
  // Dropdown styles
  dropdownContainer: {
    width: '100%',
    marginBottom: 15,
    position: 'relative',
    zIndex: 1000,
  },
  // Elevated container when a list is open
  dropdownContainerActive: {
    zIndex: 3000,
    // Android stacking requires elevation
    elevation: 20,
  },
  dropdownButton: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  dropdownButtonText: {
    fontSize: 14,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  dropdownList: {
    position: 'absolute',
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    maxHeight: 150,
    zIndex: 1001,
  },
  dropdownListActive: {
    zIndex: 3001,
    elevation: 21,
  },
  dropdownItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
});
