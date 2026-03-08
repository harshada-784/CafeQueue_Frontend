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
    marginBottom: 24,
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  input: { 
    width: '100%', 
    height: 52, 
    borderRadius: 12, 
    paddingHorizontal: 16, 
    marginBottom: 16,
    backgroundColor: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
  },
  placeholderColor: {
    color: '#999',
  },
  button: { 
    width: '100%', 
    height: 52, 
    backgroundColor: '#4a1e0c76', 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 16,
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
    color: '#1a1a1a',
    letterSpacing: 1,
    marginBottom: 8,
  },
  // Login component styles
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 5,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    paddingTop: 50,
  },
  backArrow: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    lineHeight: 34,
  },
  loginContent: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  linkTextDisabled: {
    color: '#ccc',
  },
  helperText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  otpInput: {
    fontSize: 6,
    letterSpacing: 2,
    textAlign: 'center',
  },
  // Dropdown styles
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 900,
  },
  dropdownContainer: {
    width: '100%',
    marginBottom: 16,
    position: 'relative',
    zIndex: 1000,
  },
  dropdownContainerActive: {
    zIndex: 3000,
    elevation: 20,
  },
  dropdownButton: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  dropdownButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    flex: 1,
  },
  placeholderText: {
    color: '#999',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 8,
  },
  dropdownList: {
    position: 'absolute',
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    maxHeight: 180,
    zIndex: 1001,
  },
  dropdownListActive: {
    zIndex: 3001,
    elevation: 21,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dropdownItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
});
