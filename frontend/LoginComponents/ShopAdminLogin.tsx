import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, TextInput } from '../components/GlobalComponents';
import Background from '../Background';
import { styles } from '../../css style/Login.styles';

interface ShopAdminLoginProps {
  onBack: () => void;
  onSuccess: (username: string) => void;
}

export default function ShopAdminLogin({ onBack, onSuccess }: ShopAdminLoginProps) {
  const [shopId, setShopId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!shopId.trim() || !password.trim()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Shop Admin Login:', { shopId, password });
      setIsLoading(false);
      onSuccess(shopId);
    }, 1500);
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

        <View style={styles.loginContent}>
          <Text style={styles.instructionText}>
            Enter your Shop ID and password to access admin panel
          </Text>
          
          <TextInput
            style={styles.input}
            placeholder="Shop ID"
            placeholderTextColor="#999"
            value={shopId}
            onChangeText={setShopId}
            autoCapitalize="characters"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={[styles.button, (!shopId.trim() || !password.trim() || isLoading) && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={!shopId.trim() || !password.trim() || isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log('Forgot password')}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
}
