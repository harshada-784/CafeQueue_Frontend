import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  floatingHeader: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    padding: 5, // Increased padding
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
    zIndex: 1000,
  },
  navItems: {
    flexDirection: 'row',
    gap: 20, // Reduced gap for better spacing
    justifyContent: 'space-evenly', // Better distribution
    alignItems: 'center',
    flex: 1,
  },
  navItem: {
    width: 35, // Increased size for better touch area
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(192, 154, 126, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(192, 154, 126, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    width: 24, // Slightly smaller for better fit
    height: 24,
    borderRadius: 12,
    resizeMode: 'contain', // Better image scaling
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 18, // Slightly smaller for better fit
  },
  activeNavItem: {
    backgroundColor: '#c09a7e',
    borderColor: '#c09a7e',
    shadowColor: '#c09a7e',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  activeIconText: {
    fontSize: 20,
  },
  activeNavIcon: {
  },
  profileSection: {
    position: 'relative',
  },
  profilePicContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(192, 154, 126, 0.2)',
    borderWidth: 2,
    borderColor: '#c09a7e',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 999,
  },
  profileMenu: {
    position: 'absolute',
    top: 60,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    padding: 16,
    minWidth: 200,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 15,
    zIndex: 1001,
  },
  menuHeader: {
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  menuDivider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: 8,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
