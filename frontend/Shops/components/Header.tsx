import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Text } from '../../components/GlobalComponents';

interface HeaderProps {
  displayName: string;
  showProfileMenu: boolean;
  setShowProfileMenu: (show: boolean) => void;
  setLogout: (logout: boolean) => void;
}

export default function Header({ displayName, showProfileMenu, setShowProfileMenu, setLogout }: HeaderProps) {
  return (
    <>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => setShowProfileMenu(!showProfileMenu)} activeOpacity={0.8}>
          <Image
            source={require('../../assets/profile-icon.png')}
            style={styles.profilePic}
          />
        </TouchableOpacity>
        <View style={styles.greetingWrap}>
          <Text style={styles.greeting}>Hello!!</Text>
          <Text style={styles.userName}>{displayName}</Text>
        </View>
        {showProfileMenu && (
          <>
            {/* Backdrop to close on outside tap */}
            <TouchableOpacity
              style={styles.backdrop}
              activeOpacity={1}
              onPress={() => setShowProfileMenu(false)}
            />
            <View style={styles.profileMenu}>
              <TouchableOpacity style={styles.profileMenuItem} onPress={() => setLogout(true)}>
                <Text style={styles.profileMenuText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePic: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    backgroundColor: '#ddd',
  },
  profileMenu: {
    position: 'absolute',
    top: 34,
    left: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    paddingVertical: 6,
    minWidth: 140,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    zIndex: 3000,
  },
  profileMenuItem: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  profileMenuText: {
    fontSize: 16,
    color: '#111',
    fontWeight: '600',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2000,
  },
  greetingWrap: {
    flexDirection: 'column',
  },
  greeting: {
    fontSize: 16,
    color: '#111',
    fontWeight: '600',
  },
  userName: {
    fontSize: 18,
    color: '#111',
    fontWeight: '800',
  },
});
