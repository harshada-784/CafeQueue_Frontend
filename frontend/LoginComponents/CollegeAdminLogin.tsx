import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, TextInput } from '../components/GlobalComponents';
import Background from '../Background';
import { styles } from '../../css style/Login.styles';

interface CollegeAdminLoginProps {
  onBack: () => void;
  onSuccess: (username: string) => void;
}

export default function CollegeAdminLogin({ onBack, onSuccess }: CollegeAdminLoginProps) {
  const [email, setEmail] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [maskedOtp, setMaskedOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = () => {
    if (email.trim()) {
      setIsLoading(true);
      
      // Simulate API call to send OTP
      setTimeout(() => {
        console.log('OTP sent to:', email);
        setOtpSent(true);
        setShowOtpInput(true);
        setCountdown(30);
        setIsLoading(false);
        
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
      }, 1500);
    }
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    // Mask OTP to show only dots
    setMaskedOtp(value.replace(/./g, '●'));
  };

  const handleVerifyOtp = () => {
    if (otp.trim()) {
      setIsLoading(true);
      
      // Simulate OTP verification
      setTimeout(() => {
        console.log('OTP verified:', otp);
        setIsLoading(false);
        onSuccess(email);
      }, 1000);
    }
  };

  const handleResendOtp = () => {
    if (countdown === 0) {
      handleSendOtp();
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    // Mask email to show only first 5 chars and domain
    if (value.includes('@')) {
      const [localPart, domain] = value.split('@');
      const maskedLocal = localPart.slice(0, 5) + '*'.repeat(Math.max(0, localPart.length - 5));
      setMaskedEmail(`${maskedLocal}@${domain}`);
    } else {
      setMaskedEmail(value);
    }
  };

  const isValidEmail = (email: string) => {
    // Basic email validation for domain emails
    return email.includes('.') && email.includes('@') && email.endsWith('.edu');
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
          // Email Input
          <View style={styles.loginContent}>
            <Text style={styles.instructionText}>
              Enter your registered college domain email address
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="college.edu email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={[styles.button, (!email.trim() || !isValidEmail(email) || isLoading) && styles.buttonDisabled]}
              onPress={handleSendOtp}
              disabled={!email.trim() || !isValidEmail(email) || isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.helperText}>
              Please use your official college domain email
            </Text>
          </View>
        ) : (
          // OTP Input
          <View style={styles.loginContent}>
            <Text style={styles.instructionText}>
              Enter OTP sent to {maskedEmail}
            </Text>
            
            <TextInput
              style={[styles.input, styles.otpInput]}
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
              disabled={!otp.trim() || isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Text>
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
