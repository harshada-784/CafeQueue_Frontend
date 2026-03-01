import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import LandingPage from './frontend/LandingPage';
import CanteenAdminHP from './frontend/Shops/canteen_admin_hp';

export default function App() {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        {showSignup ? (
          <CanteenAdminHP />
        ) : (
          <LandingPage onGetStarted={() => setShowSignup(true)} />
        )}
      </View>
    </SafeAreaProvider>
  );
}
