import { StyleSheet, TextStyle } from 'react-native';

// Global font family
export const GLOBAL_FONT_FAMILY = 'BpmfIansui-Regular';

// Global text styles with the font
export const GlobalStyles = StyleSheet.create({
  // Text styles
  text: {
    fontFamily: GLOBAL_FONT_FAMILY,
  },
  
  heading: {
    fontFamily: GLOBAL_FONT_FAMILY,
    fontWeight: '800',
  },
  
  subheading: {
    fontFamily: GLOBAL_FONT_FAMILY,
    fontWeight: '700',
  },
  
  body: {
    fontFamily: GLOBAL_FONT_FAMILY,
    fontWeight: '500',
  },
  
  caption: {
    fontFamily: GLOBAL_FONT_FAMILY,
    fontWeight: '400',
  },
  
  button: {
    fontFamily: GLOBAL_FONT_FAMILY,
    fontWeight: '600',
  },
  
  // Input styles
  input: {
    fontFamily: GLOBAL_FONT_FAMILY,
  },
  
  // Common combinations
  title: {
    fontFamily: GLOBAL_FONT_FAMILY,
    fontSize: 24,
    fontWeight: '800',
    color: '#111',
  },
  
  subtitle: {
    fontFamily: GLOBAL_FONT_FAMILY,
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  
  paragraph: {
    fontFamily: GLOBAL_FONT_FAMILY,
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    lineHeight: 24,
  },
  
  small: {
    fontFamily: GLOBAL_FONT_FAMILY,
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
  },
  
  // Button text
  buttonText: {
    fontFamily: GLOBAL_FONT_FAMILY,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  
  // Link text
  linkText: {
    fontFamily: GLOBAL_FONT_FAMILY,
    fontSize: 15,
    fontWeight: '500',
    color: '#3b82f6',
  },

  // App name style
  appName: {
    fontFamily: GLOBAL_FONT_FAMILY,
    fontSize: 42,
    color: '#222',
    letterSpacing: 1,
  },
});

// Helper function to apply global font to any style
export const withGlobalFont = (style: TextStyle): TextStyle => ({
  ...style,
  fontFamily: GLOBAL_FONT_FAMILY,
});

// Helper to merge styles with global font
export const mergeWithGlobalFont = (...styles: TextStyle[]): TextStyle => 
  StyleSheet.flatten([
    { fontFamily: GLOBAL_FONT_FAMILY },
    ...styles
  ]);
