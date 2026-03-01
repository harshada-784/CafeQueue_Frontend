import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { Text, TextInput, Button, Title } from './components/GlobalComponents';
import Background from './Background';
import CanteenAdminHP from './Shops/canteen_admin_hp';
import Signup from './Signup';
import { styles } from '../css style/Login.styles';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false); // toggle to signup
  const [showAdminHome, setShowAdminHome] = useState(false);

  if (showSignup) return <Signup />; // show signup page if toggled
  if (showAdminHome) return <CanteenAdminHP userName={username || 'User'} />;

  const handleLogin = () => {
    // Temporary routing: assume canteen admin login goes to admin homepage
    setShowAdminHome(true);
  };

  return (
    <Background>
    <View style={styles.container}>
      {/* App Logo and Name */}
      <View style={styles.logoContainer}>
        <Image
          source={ require('./assets/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.appName}>CafeQueue</Text>
      </View>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowSignup(true)}>
        <Text style={styles.linkText}>Don't have an account? Signup</Text>
      </TouchableOpacity>
    </View>
    </Background>
  );
}
