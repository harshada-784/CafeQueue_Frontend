import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import LandingPage from './frontend/LandingPage';
import Signup from './frontend/Signup';
import CollegeAdminOfficeHP from './frontend/College Admin/CollegeAdminOfficeHP';

export default function App() {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        {showSignup ? (
          <CollegeAdminOfficeHP />
        ) : (
          <LandingPage onGetStarted={() => setShowSignup(true)} />
        )}
      </View>
    </SafeAreaProvider>
  );
}
