import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, TextInput } from '../components/GlobalComponents';
import Background from '../Background';
import { styles } from '../../css style/Login.styles';

interface StudentStaffLoginProps {
  onBack: () => void;
  onSuccess: (username: string) => void;
}

export default function StudentStaffLogin({ onBack, onSuccess }: StudentStaffLoginProps) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [maskedMobile, setMaskedMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [maskedOtp, setMaskedOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSendOtp = () => {
    if (mobileNumber.trim()) {
      console.log('OTP sent to:', mobileNumber);
      setOtpSent(true);
      setShowOtpInput(true);
      setCountdown(30);
      
      // Start countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    // Mask OTP to show only dots
    setMaskedOtp(value.replace(/./g, '●'));
  };

  const handleVerifyOtp = () => {
    if (otp.trim()) {
      // Simulate OTP verification
      console.log('OTP verified:', otp);
      onSuccess('Student/Staff User');
    }
  };

  const handleResendOtp = () => {
    if (countdown === 0) {
      handleSendOtp();
    }
  };

  const handleMobileChange = (value: string) => {
    setMobileNumber(value);
    // Mask mobile number to show only last 3 digits
    if (value.length <= 3) {
      setMaskedMobile(value);
    } else {
      const masked = value.slice(0, -3).replace(/./g, '*') + value.slice(-3);
      setMaskedMobile(masked);
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={{ width: 40 }} />
        </View>

        {!showOtpInput ? (
          // Mobile Number Input
          <View style={styles.loginContent}>
            <Text style={styles.instructionText}>
              Enter your mobile number to receive OTP
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              placeholderTextColor="#999"
              value={mobileNumber}
              onChangeText={handleMobileChange}
              keyboardType="phone-pad"
              maxLength={10}
            />

            <TouchableOpacity
              style={[styles.button, !mobileNumber.trim() && styles.buttonDisabled]}
              onPress={handleSendOtp}
              disabled={!mobileNumber.trim()}
            >
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // OTP Input
          <View style={styles.loginContent}>
            <Text style={styles.instructionText}>
              Enter OTP sent to {maskedMobile}
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              placeholderTextColor="#999"
              value={maskedOtp}
              onChangeText={handleOtpChange}
              keyboardType="numeric"
              maxLength={6}
              secureTextEntry
            />

            <TouchableOpacity
              style={[styles.button, !otp.trim() && styles.buttonDisabled]}
              onPress={handleVerifyOtp}
              disabled={!otp.trim()}
            >
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleResendOtp} disabled={countdown > 0}>
              <Text style={[styles.linkText, countdown > 0 && styles.linkTextDisabled]}>
                {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Background>
  );
}
