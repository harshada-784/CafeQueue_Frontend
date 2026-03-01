import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, },
  title: { fontSize: 26,  marginBottom: 20 },
  input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15 },
  button: { width: '100%', height: 50, backgroundColor: '#4a1e0c76', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  buttonText: { color: 'white', fontSize: 18,  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  infoText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  linkText: { color: '#007BFF', marginTop: 10 },
  guestLinkText: { color: '#02356aff', marginTop: 15, fontSize: 16, textDecorationLine: 'underline' },
  errorText: { color: 'red', alignSelf: 'flex-start', marginTop: -10, marginBottom: 10, marginLeft: 10 },
  inputError: {
    borderColor: 'red',
  },
  // Logo and App name
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 140,
    height: 140,
    borderRadius: 16,
    marginBottom: 10,
  },
  appName: {
    fontSize: 48, 
    color: '#222',
    fontWeight: '100',
    letterSpacing: 1,
    marginBottom: 4,
  },
  // Full-screen backdrop to close dropdowns on outside tap
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 900,
  },
  
  // Dropdown styles
  dropdownContainer: {
    width: '100%',
    marginBottom: 15,
    position: 'relative',
    zIndex: 1000,
  },
  // Elevated container when a list is open
  dropdownContainerActive: {
    zIndex: 3000,
    // Android stacking requires elevation
    elevation: 20,
  },
  dropdownButton: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  dropdownButtonText: {
    fontSize: 14,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  dropdownList: {
    position: 'absolute',
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    maxHeight: 150,
    zIndex: 1001,
  },
  dropdownListActive: {
    zIndex: 3001,
    elevation: 21,
  },
  dropdownItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
});

export { styles };
