import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, TextInput } from './components/GlobalComponents';
import Background from './Background';
import { styles } from '../css style/Signup.styles';

interface Signup2Props {
  userType: string;
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirm_password: string;
  setConfirmPassword: (value: string) => void;
  collegeName: string;
  setCollegeName: (value: string) => void;
  studentCardId: string;
  setStudentCardId: (value: string) => void;
  shopId: string;
  setShopId: (value: string) => void;
  officeEmail: string;
  setOfficeEmail: (value: string) => void;
  officeOtp: string;
  setOfficeOtp: (value: string) => void;
  adminStep: 'email_college' | 'otp_verify' | 'final_fields';
  isVerifyingEmail: boolean;
  isVerifyingOtp: boolean;
  usernameError: string;
  passwordError: string;
  showCollegeDropdown: boolean;
  onToggleCollegeDropdown: () => void;
  onCloseDropdowns: () => void;
  onCollegeSelect: (college: string) => void;
  onHandleSignup: () => void;
  onVerifyEmail: () => void;
  onVerifyOtp: () => void;
  onGoToLogin: () => void;
  onSetAdminStep: (step: 'email_college' | 'otp_verify' | 'final_fields') => void;
}

const COLLEGES = [
  'Bharati Vidyapeeth',
  'State Engineering College',
  'City Science University',
  'Lakeside Arts College',
];

export default function Signup2({
  userType,
  username,
  setUsername,
  password,
  setPassword,
  confirm_password,
  setConfirmPassword,
  collegeName,
  setCollegeName,
  studentCardId,
  setStudentCardId,
  shopId,
  setShopId,
  officeEmail,
  setOfficeEmail,
  officeOtp,
  setOfficeOtp,
  adminStep,
  isVerifyingEmail,
  isVerifyingOtp,
  usernameError,
  passwordError,
  showCollegeDropdown,
  onToggleCollegeDropdown,
  onCloseDropdowns,
  onCollegeSelect,
  onHandleSignup,
  onVerifyEmail,
  onVerifyOtp,
  onGoToLogin,
}: Signup2Props) {
  const renderCollegeDropdown = () => (
    <View style={[styles.dropdownContainer, showCollegeDropdown && styles.dropdownContainerActive]}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={onToggleCollegeDropdown}
      >
        <Text
          style={[
            styles.dropdownButtonText,
            collegeName === 'Select college' && styles.placeholderText,
          ]}
        >
          {collegeName || 'Select college'}
        </Text>
        <Text style={styles.dropdownArrow}>
          {showCollegeDropdown ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {showCollegeDropdown && (
        <View style={[styles.dropdownList, styles.dropdownListActive]}>
          {COLLEGES.map((college) => (
            <TouchableOpacity
              key={college}
              style={styles.dropdownItem}
              onPress={() => onCollegeSelect(college)}
            >
              <Text style={styles.dropdownItemText}>{college}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  const renderCommonFields = () => (
    <>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(t: string) => {
          setUsername(t);
        }}
      />
      {!!usernameError && <Text style={styles.errorText}>{usernameError}</Text>}

      {renderCollegeDropdown()}

      <TextInput
        style={[styles.input, passwordError ? styles.inputError : null]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text: string) => {
          setPassword(text);
        }}
      />
      <TextInput
        style={[styles.input, passwordError ? styles.inputError : null]}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirm_password}
        onChangeText={(text: string) => {
          setConfirmPassword(text);
        }}
      />
      {!!passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

      <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
        <Text style={styles.buttonText}>Complete Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onGoToLogin}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </>
  );

  // Student/Staff Flow
  if (userType === 'Student/Staff') {
    return (
      <Background>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Text style={styles.appName}>Student/Staff Signup</Text>
          </View>

          {showCollegeDropdown && (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.backdrop}
              onPress={onCloseDropdowns}
            />
          )}

          {renderCommonFields()}

          <TextInput
            style={styles.input}
            placeholder="Enter E-Canteen Card ID"
            value={studentCardId}
            onChangeText={setStudentCardId}
          />
        </View>
      </Background>
    );
  }

  // Canteen Shop Flow
  if (userType === 'Canteen Shop') {
    return (
      <Background>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Text style={styles.appName}>Canteen Shop Signup</Text>
          </View>

          {showCollegeDropdown && (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.backdrop}
              onPress={onCloseDropdowns}
            />
          )}

          {renderCommonFields()}

          <TextInput
            style={styles.input}
            placeholder="Enter E-Canteen Shop ID"
            value={shopId}
            onChangeText={setShopId}
          />
        </View>
      </Background>
    );
  }

  // Canteen Admin Office Flow
  if (userType === 'Canteen Admin Office') {
    return (
      <Background>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Text style={styles.appName}>Admin Office Signup</Text>
          </View>

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
                onPress={onVerifyEmail}
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
                onPress={onVerifyOtp}
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
                onChangeText={(t: string) => {
                  setUsername(t);
                }}
              />
              {!!usernameError && <Text style={styles.errorText}>{usernameError}</Text>}

              <TextInput
                style={[styles.input, passwordError ? styles.inputError : null]}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text: string) => {
                  setPassword(text);
                }}
              />
              <TextInput
                style={[styles.input, passwordError ? styles.inputError : null]}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirm_password}
                onChangeText={(text: string) => {
                  setConfirmPassword(text);
                }}
              />
              {!!passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

              <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
                <Text style={styles.buttonText}>Complete Signup</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={onGoToLogin}>
            <Text style={styles.linkText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </Background>
    );
  }

  return null;
}
