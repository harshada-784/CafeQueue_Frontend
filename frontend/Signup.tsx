import React, { useState, useEffect } from 'react';
import CanteenAdminHP from './Shops/canteen_admin_hp';
import CanteenAdminOfficeHP from './College Admin/CollegeAdminOfficeHP';
import Login from './Login';
import { isUsernameTaken, addUsername } from './userStore';
import UserHome from './Customer/UserHome';
import Signup1 from './Signup1';
import Signup2 from './Signup2';

export default function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('Select usertype');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAdminHome, setShowAdminHome] = useState(false);
  const [collegeName, setCollegeName] = useState('Select college');
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [showUserHome, setShowUserHome] = useState(false);
  const [showAdminOfficeHome, setShowAdminOfficeHome] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [collegeError, setCollegeError] = useState('');
  const [officeEmail, setOfficeEmail] = useState('');
  const [officeOtp, setOfficeOtp] = useState('');
  const [studentCardId, setStudentCardId] = useState('');
  const [shopId, setShopId] = useState('');
  const [shopName, setShopName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [guestOtp, setGuestOtp] = useState('');
  const [otpCountdown, setOtpCountdown] = useState(0);

  // Admin office verification flow
  const [adminStep, setAdminStep] = useState<'email_college' | 'otp_verify' | 'final_fields'>('email_college');
  // Guest/Student/Staff verification flow
  const [guestStep, setGuestStep] = useState<'mobile' | 'otp' | 'final'>('mobile');
  // Canteen Shop verification flow - step: shop_id -> otp -> final
  const [shopStep, setShopStep] = useState<'shop_id' | 'otp' | 'final'>('shop_id');
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isVerifyingGuestOtp, setIsVerifyingGuestOtp] = useState(false);

  // Step control
  const [currentStep, setCurrentStep] = useState(1);

  // Countdown timer effect - MUST be before any conditional returns
  useEffect(() => {
    if (otpCountdown > 0) {
      const timer = setTimeout(() => {
        setOtpCountdown(otpCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [otpCountdown]);

  if (showLogin) return <Login />;
  if (showAdminHome) return <CanteenAdminHP userName={username || 'User'} />;
  if (showAdminOfficeHome) return <CanteenAdminOfficeHP userName={username || 'User'} collegeName={collegeName} />;
  if (showUserHome) return <UserHome userName={username || 'User'} collegeName={collegeName} />;

  const handleDropdownSelect = (label: string) => {
    setUserType(label);
    setShowDropdown(false);
    // Reset states based on user type
    if (label === 'Student/Staff') {
      setCollegeName('Select college');
      setStudentCardId('');
      setMobileNumber('');
      setGuestOtp('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setCollegeError('');
      setGuestStep('mobile');
    } else if (label === 'Canteen Shop') {
      setCollegeName('Select college');
      setShopId('');
      setShopName('');
      setMobileNumber('');
      setGuestOtp('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setShopStep('shop_id');
    } else if (label === 'Canteen Admin Office') {
      setCollegeName('');
      setOfficeEmail('');
      setOfficeOtp('');
      setMobileNumber('');
      setGuestOtp('');
      setAdminStep('email_college');
      setIsVerifyingEmail(false);
      setIsVerifyingOtp(false);
      setIsVerifyingGuestOtp(false);
    } else if (label === 'Guest') {
      setCollegeName('Select college');
      setMobileNumber('');
      setGuestOtp('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setCollegeError('');
      setGuestStep('mobile');
    }
  };

  const handleCollegeSelect = (selectedCollege: string) => {
    setCollegeName(selectedCollege);
    setShowCollegeDropdown(false);
  };

  const handleVerifyEmail = async () => {
    if (!officeEmail.trim() || !collegeName.trim()) return;
    setIsVerifyingEmail(true);
    setTimeout(() => {
      setIsVerifyingEmail(false);
      setAdminStep('otp_verify');
    }, 2000);
  };

  const handleVerifyOtp = async () => {
    if (!officeOtp.trim()) return;
    setIsVerifyingOtp(true);
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
    // Password check only for Canteen Shop and Canteen Admin Office
    if (userType === 'Canteen Shop' || userType === 'Canteen Admin Office') {
      if (password !== confirm_password) {
        setPasswordError('Passwords do not match');
        return;
      }
    }
    setPasswordError('');
    addUsername(trimmed);

    if (userType === 'Canteen Shop') {
      setShowAdminHome(true);
      return;
    }
    if (userType === 'Canteen Admin Office') {
      if (!collegeName || collegeName === 'Select college') return;
      setShowAdminOfficeHome(true);
      return;
    }
    if (userType === 'Student/Staff' || userType === 'Guest') {
      if (!collegeName || collegeName === 'Select college') {
        setCollegeError('Please select a college');
        return;
      }
      setCollegeError('');
      setShowUserHome(true);
      return;
    }
  };

  const handleGuestContinue = () => {
    setUsername('Guest');
    setShowUserHome(true);
  };

  const handleVerifyGuestOtp = async () => {
    if (!guestOtp.trim()) return;
    setIsVerifyingGuestOtp(true);
    setTimeout(() => {
      setIsVerifyingGuestOtp(false);
      setGuestStep('final');
    }, 2000);
  };

  const handleSendGuestOtp = () => {
    if (mobileNumber.trim()) {
      console.log('OTP sent to:', mobileNumber);
      setOtpCountdown(30);
      setGuestStep('otp');
    }
  };

  const handleVerifyShopOtp = async () => {
    if (!guestOtp.trim()) return;
    setIsVerifyingGuestOtp(true);
    setTimeout(() => {
      setIsVerifyingGuestOtp(false);
      setShopStep('final');
    }, 2000);
  };

  const handleSendShopOtp = () => {
    if (shopId.trim()) {
      // Simulate fetching mobile number from E-Shop card
      const fetchedMobile = '9876543210'; // This would be fetched from backend based on shopId
      setMobileNumber(fetchedMobile);
      console.log('OTP sent to:', fetchedMobile);
      setOtpCountdown(30);
      setShopStep('otp');
    }
  };

  const handleContinueFromStep1 = () => {
    if (userType !== 'Select usertype') {
      setCurrentStep(2);
    }
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
  };

  const closeDropdowns = () => {
    setShowDropdown(false);
    setShowCollegeDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown) setShowCollegeDropdown(false);
  };

  const toggleCollegeDropdown = () => {
    setShowCollegeDropdown(!showCollegeDropdown);
    if (!showCollegeDropdown) setShowDropdown(false);
  };

  // Render Signup1 for step 1
  if (currentStep === 1) {
    return (
      <Signup1
        userType={userType}
        showDropdown={showDropdown}
        onUserTypeChange={handleDropdownSelect}
        onToggleDropdown={toggleDropdown}
        onCloseDropdowns={closeDropdowns}
        onContinue={handleContinueFromStep1}
        onGoToLogin={() => setShowLogin(true)}
        onGuestContinue={handleGuestContinue}
      />
    );
  }

  // Render Signup2 for step 2
  return (
    <Signup2
      userType={userType}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      confirm_password={confirm_password}
      setConfirmPassword={setConfirmPassword}
      collegeName={collegeName}
      setCollegeName={setCollegeName}
      studentCardId={studentCardId}
      setStudentCardId={setStudentCardId}
      shopId={shopId}
      setShopId={setShopId}
      shopName={shopName}
      setShopName={setShopName}
      officeEmail={officeEmail}
      setOfficeEmail={setOfficeEmail}
      officeOtp={officeOtp}
      setOfficeOtp={setOfficeOtp}
      mobileNumber={mobileNumber}
      setMobileNumber={setMobileNumber}
      guestOtp={guestOtp}
      setGuestOtp={setGuestOtp}
      otpCountdown={otpCountdown}
      setOtpCountdown={setOtpCountdown}
      guestStep={guestStep}
      adminStep={adminStep}
      shopStep={shopStep}
      isVerifyingEmail={isVerifyingEmail}
      isVerifyingOtp={isVerifyingOtp}
      isVerifyingGuestOtp={isVerifyingGuestOtp}
      usernameError={usernameError}
      passwordError={passwordError}
      collegeError={collegeError}
      showCollegeDropdown={showCollegeDropdown}
      onToggleCollegeDropdown={toggleCollegeDropdown}
      onCloseDropdowns={closeDropdowns}
      onCollegeSelect={handleCollegeSelect}
      onHandleSignup={handleSignup}
      onVerifyEmail={handleVerifyEmail}
      onVerifyOtp={handleVerifyOtp}
      onVerifyGuestOtp={handleVerifyGuestOtp}
      onSendGuestOtp={handleSendGuestOtp}
      onGoToLogin={() => setShowLogin(true)}
      onSetAdminStep={setAdminStep}
      onSetGuestStep={setGuestStep}
      onSetShopStep={setShopStep}
      onVerifyShopOtp={handleVerifyShopOtp}
      onSendShopOtp={handleSendShopOtp}
      onBackToStep1={handleBackToStep1}
    />
  );
}
