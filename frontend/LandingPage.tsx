import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Title, GLOBAL_FONT_FAMILY } from './components/GlobalComponents';
import Background from './Background';

interface Props {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: Props) {
  return (
    <Background>
      <View style={styles.container}>
        {/* App Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* App Name */}
        <Title style={styles.appName}>CafeQueue</Title>

        {/* Tagline */}
        <Text style={styles.tagline}>
          Campus Way to Eat!
        </Text>

        {/* Get Started Button */}
        <TouchableOpacity style={styles.button} onPress={onGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoImage: {
    width: 180,
    height: 180,
    borderRadius: 20,
  },
  appName: {
    fontSize: 42,
    color: '#222',
    letterSpacing: 1,
    marginBottom: 10,
    fontWeight: 100,
  },
  tagline: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#4a1e0c76',
    fontSize: 18,
    fontWeight: '600',
  },
});
