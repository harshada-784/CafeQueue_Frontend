import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import LandingPage from './frontend/LandingPage';
import Signup from './frontend/Signup';

export default function App() {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        {showSignup ? (
          <Signup />
        ) : (
          <LandingPage onGetStarted={() => setShowSignup(true)} />
        )}
      </View>
    </SafeAreaProvider>
  );
}
