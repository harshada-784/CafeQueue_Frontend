import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  title: { 
    fontSize: 28, 
    fontWeight: '700', 
    marginBottom: 24,
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  input: { 
    width: '100%', 
    height: 52, 
    borderWidth: 1, 
    borderColor: '#e1e5e9', 
    borderRadius: 12, 
    paddingHorizontal: 16, 
    marginBottom: 16,
    backgroundColor: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
  },
  button: { 
    width: '100%', 
    height: 52, 
    backgroundColor: '#4a1e0c76', 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 16,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  buttonText: { 
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  linkText: { 
    color: '#3b82f6', 
    marginTop: 12,
    fontSize: 15,
    fontWeight: '500',
  },
  // Logo + App name
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 160,
    height: 160,
    borderRadius: 16,
    marginBottom: 10,
  },
  appName: {
    fontSize: 36, 
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: 1,
    marginBottom: 8,
  },
});
