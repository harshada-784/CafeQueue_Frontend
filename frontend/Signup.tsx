import React, { useState } from 'react';
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
  const [officeEmail, setOfficeEmail] = useState('');
  const [officeOtp, setOfficeOtp] = useState('');
  const [studentCardId, setStudentCardId] = useState('');
  const [shopId, setShopId] = useState('');

  // Admin office verification flow
  const [adminStep, setAdminStep] = useState<'email_college' | 'otp_verify' | 'final_fields'>('email_college');
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Step control
  const [currentStep, setCurrentStep] = useState(1);

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
    } else if (label === 'Canteen Shop') {
      setCollegeName('Select college');
      setShopId('');
    } else if (label === 'Canteen Admin Office') {
      setCollegeName('');
      setOfficeEmail('');
      setOfficeOtp('');
      setAdminStep('email_college');
      setIsVerifyingEmail(false);
      setIsVerifyingOtp(false);
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
    if (password !== confirm_password) {
      setPasswordError('Passwords do not match');
      return;
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
    if (userType === 'Student/Staff') {
      if (!collegeName || collegeName === 'Select college') return;
      setShowUserHome(true);
      return;
    }
  };

  const handleGuestContinue = () => {
    setUsername('Guest');
    setShowUserHome(true);
  };

  const handleContinueFromStep1 = () => {
    if (userType !== 'Select usertype') {
      setCurrentStep(2);
    }
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
      officeEmail={officeEmail}
      setOfficeEmail={setOfficeEmail}
      officeOtp={officeOtp}
      setOfficeOtp={setOfficeOtp}
      adminStep={adminStep}
      isVerifyingEmail={isVerifyingEmail}
      isVerifyingOtp={isVerifyingOtp}
      usernameError={usernameError}
      passwordError={passwordError}
      showCollegeDropdown={showCollegeDropdown}
      onToggleCollegeDropdown={toggleCollegeDropdown}
      onCloseDropdowns={closeDropdowns}
      onCollegeSelect={handleCollegeSelect}
      onHandleSignup={handleSignup}
      onVerifyEmail={handleVerifyEmail}
      onVerifyOtp={handleVerifyOtp}
      onGoToLogin={() => setShowLogin(true)}
      onSetAdminStep={setAdminStep}
    />
  );
}
