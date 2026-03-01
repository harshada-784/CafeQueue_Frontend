import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
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
  mobileNumber: string;
  setMobileNumber: (value: string) => void;
  guestOtp: string;
  setGuestOtp: (value: string) => void;
  otpCountdown: number;
  setOtpCountdown: (value: number) => void;
  guestStep: 'mobile' | 'otp' | 'final';
  adminStep: 'email_college' | 'otp_verify' | 'final_fields';
  isVerifyingEmail: boolean;
  isVerifyingOtp: boolean;
  isVerifyingGuestOtp: boolean;
  usernameError: string;
  passwordError: string;
  collegeError: string;
  showCollegeDropdown: boolean;
  onToggleCollegeDropdown: () => void;
  onCloseDropdowns: () => void;
  onCollegeSelect: (college: string) => void;
  onHandleSignup: () => void;
  onVerifyEmail: () => void;
  onVerifyOtp: () => void;
  onVerifyGuestOtp: () => void;
  onSendGuestOtp: () => void;
  onGoToLogin: () => void;
  onSetAdminStep: (step: 'email_college' | 'otp_verify' | 'final_fields') => void;
  onSetGuestStep: (step: 'mobile' | 'otp' | 'final') => void;
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
  mobileNumber,
  setMobileNumber,
  guestOtp,
  setGuestOtp,
  otpCountdown,
  setOtpCountdown,
  guestStep,
  adminStep,
  isVerifyingEmail,
  isVerifyingOtp,
  isVerifyingGuestOtp,
  usernameError,
  passwordError,
  collegeError,
  showCollegeDropdown,
  onToggleCollegeDropdown,
  onCloseDropdowns,
  onCollegeSelect,
  onHandleSignup,
  onVerifyEmail,
  onVerifyOtp,
  onVerifyGuestOtp,
  onSendGuestOtp,
  onGoToLogin,
  onSetAdminStep,
  onSetGuestStep,
}: Signup2Props) {
  const renderCollegeDropdown = () => (
    <View style={[styles.dropdownContainer, showCollegeDropdown && styles.dropdownContainerActive, !!collegeError && styles.dropdownContainerError]}>
      <TouchableOpacity
        style={[styles.dropdownButton, !!collegeError && styles.dropdownButtonError]}
        onPress={onToggleCollegeDropdown}
      >
        <Text
          style={[
            styles.dropdownButtonText,
            collegeName === 'Select college' && styles.placeholderText,
            !!collegeError && styles.dropdownButtonTextError,
          ]}
        >
          {collegeName || 'Select college'}
        </Text>
        <Text style={[styles.dropdownArrow, !!collegeError && styles.dropdownArrowError]}>
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
        <ScrollView contentContainerStyle={styles.container}>
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

          {/* Step 1: Mobile Number */}
          {guestStep === 'mobile' && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
                maxLength={10}
              />

              <TouchableOpacity
                style={[styles.button, !mobileNumber.trim() && styles.buttonDisabled]}
                onPress={onSendGuestOtp}
                disabled={!mobileNumber.trim()}
              >
                <Text style={styles.buttonText}>Send OTP</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Step 2: OTP Verification */}
          {guestStep === 'otp' && (
            <>
              <Text style={styles.infoText}>OTP sent to {mobileNumber}</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                value={guestOtp}
                onChangeText={setGuestOtp}
                keyboardType="number-pad"
                maxLength={6}
              />

              <TouchableOpacity
                style={[styles.button, !guestOtp.trim() && styles.buttonDisabled]}
                onPress={onVerifyGuestOtp}
                disabled={!guestOtp.trim() || isVerifyingGuestOtp}
              >
                <Text style={styles.buttonText}>
                  {isVerifyingGuestOtp ? 'Verifying...' : 'Verify OTP'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, otpCountdown > 0 && styles.buttonDisabled]}
                onPress={onSendGuestOtp}
                disabled={otpCountdown > 0}
              >
                <Text style={styles.buttonText}>
                  {otpCountdown > 0 ? `Resend OTP in ${otpCountdown}s` : 'Resend OTP'}
                </Text>
              </TouchableOpacity>
            </>
          )}

          {/* Step 3: Final Fields */}
          {guestStep === 'final' && (
            <>
              {renderCollegeDropdown()}
              {!!collegeError && <Text style={styles.errorText}>{collegeError}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(t: string) => {
                  setUsername(t);
                }}
              />
              {!!usernameError && <Text style={styles.errorText}>{usernameError}</Text>}

              <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
                <Text style={styles.buttonText}>Complete Signup</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={onGoToLogin}>
            <Text style={styles.linkText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </ScrollView>
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

  // Guest Flow
  if (userType === 'Guest') {
    return (
      <Background>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Text style={styles.appName}>Guest Signup</Text>
          </View>

          {/* Step 1: Mobile Number */}
          {guestStep === 'mobile' && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
                maxLength={10}
              />

              <TouchableOpacity
                style={[styles.button, !mobileNumber.trim() && styles.buttonDisabled]}
                onPress={onSendGuestOtp}
                disabled={!mobileNumber.trim()}
              >
                <Text style={styles.buttonText}>Send OTP</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Step 2: OTP Verification */}
          {guestStep === 'otp' && (
            <>
              <Text style={styles.infoText}>OTP sent to {mobileNumber}</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                value={guestOtp}
                onChangeText={setGuestOtp}
                keyboardType="number-pad"
                maxLength={6}
              />

              <TouchableOpacity
                style={[styles.button, !guestOtp.trim() && styles.buttonDisabled]}
                onPress={onVerifyGuestOtp}
                disabled={!guestOtp.trim() || isVerifyingGuestOtp}
              >
                <Text style={styles.buttonText}>
                  {isVerifyingGuestOtp ? 'Verifying...' : 'Verify OTP'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, otpCountdown > 0 && styles.buttonDisabled]}
                onPress={onSendGuestOtp}
                disabled={otpCountdown > 0}
              >
                <Text style={styles.buttonText}>
                  {otpCountdown > 0 ? `Resend OTP in ${otpCountdown}s` : 'Resend OTP'}
                </Text>
              </TouchableOpacity>
            </>
          )}

          {/* Step 3: Final Fields */}
          {guestStep === 'final' && (
            <>
              {renderCollegeDropdown()}
              {!!collegeError && <Text style={styles.errorText}>{collegeError}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(t: string) => {
                  setUsername(t);
                }}
              />
              {!!usernameError && <Text style={styles.errorText}>{usernameError}</Text>}

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
