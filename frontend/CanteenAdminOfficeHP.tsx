import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, TextInput, Alert } from 'react-native';
import Background from './Background';
import Login from './Login';
import ShopCard from './ShopCard';

interface Props {
  userName?: string;
  collegeName?: string;
}

function CanteenAdminOfficeHP({ userName = 'User', collegeName = 'College' }: Props) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [logout, setLogout] = useState(false);
  const [currentView, setCurrentView] = useState<'main' | 'addShop' | 'removeShop' | 'shopCard'>('main');

  // Shop management state
  const [shops, setShops] = useState<Array<{
    id: string;
    name: string;
    ownerName: string;
    phone: string;
    shopId: string;
  }>>([]);

  // Add shop form state
  const [newShopName, setNewShopName] = useState('');
  const [newShopOwnerName, setNewShopOwnerName] = useState('');
  const [newShopPhone, setNewShopPhone] = useState('');

  // Selected shop for card view
  const [selectedShop, setSelectedShop] = useState<{
    id: string;
    name: string;
    ownerName: string;
    phone: string;
    shopId: string;
  } | null>(null);

  // Student/Staff registration state
  const [currentStudentView, setCurrentStudentView] = useState<'main' | 'register' | 'studentCard'>('main');
  const [studentName, setStudentName] = useState('');
  const [studentDepartment, setStudentDepartment] = useState('');
  const [studentRole, setStudentRole] = useState('Student');
  const [studentPhone, setStudentPhone] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<{
    id: string;
    name: string;
    department: string;
    role: string;
    phone: string;
    cardId: string;
  } | null>(null);

  // Shop management functions
  const addShop = () => {
    if (!newShopName.trim() || !newShopOwnerName.trim() || !newShopPhone.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const shopId = `SBVCOE${Math.floor(1000 + Math.random() * 9000)}`;
    const newShop = {
      id: Date.now().toString(),
      name: newShopName.trim(),
      ownerName: newShopOwnerName.trim(),
      phone: newShopPhone.trim(),
      shopId: shopId,
    };

    setShops(prev => [...prev, newShop]);
    setSelectedShop(newShop);
    setCurrentView('shopCard');

    // Clear form
    setNewShopName('');
    setNewShopOwnerName('');
    setNewShopPhone('');
  };

  const removeShop = (shopId: string) => {
    Alert.alert(
      'Delete Shop',
      'Are you sure you want to delete this shop?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            setShops(prev => prev.filter(shop => shop.id !== shopId));
          },
        },
      ]
    );
  };

  const generateShopCard = (shop: { id: string; name: string; ownerName: string; phone: string; shopId: string }) => {
    setSelectedShop(shop);
    setCurrentView('shopCard');
  };

  // Student/Staff registration functions
  const registerStudent = () => {
    if (!studentName.trim() || !studentDepartment.trim() || !studentPhone.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const cardId = `STU${Math.floor(1000 + Math.random() * 9000)}`;
    const newStudent = {
      id: Date.now().toString(),
      name: studentName.trim(),
      department: studentDepartment.trim(),
      role: studentRole,
      phone: studentPhone.trim(),
      cardId: cardId,
    };

    setSelectedStudent(newStudent);
    setCurrentStudentView('studentCard');

    // Clear form
    setStudentName('');
    setStudentDepartment('');
    setStudentRole('Student');
    setStudentPhone('');
  };

  if (logout) return <Login />;

  // Shop Card View
  if (currentView === 'shopCard' && selectedShop) {
    return (
      <ShopCard
        onBack={() => setCurrentView('main')}
        userName={selectedShop.ownerName}
        shopId={selectedShop.shopId}
      />
    );
  }

  // Student Card View
  if (currentStudentView === 'studentCard' && selectedStudent) {
    return (
      <ShopCard
        onBack={() => setCurrentStudentView('main')}
        userName={selectedStudent.name}
        shopId={selectedStudent.cardId}
        isStudentCard={true}
        studentDetails={{
          name: selectedStudent.name,
          department: selectedStudent.department,
          role: selectedStudent.role,
          phone: selectedStudent.phone,
        }}
      />
    );
  }

  return (
    <Background>
      <View style={styles.container}>
        {/* Header with profile and greeting - Only show on main screen */}
        {currentView === 'main' && currentStudentView === 'main' && (
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => setShowProfileMenu((s) => !s)} activeOpacity={0.8}>
              <Image
                source={require('./assets/profile-icon.png')}
                style={styles.profilePic}
              />
            </TouchableOpacity>
            <View style={styles.greetingWrap}>
              <Text style={styles.greeting}>Hello!!</Text>
              <Text style={styles.collegeName}>{collegeName}</Text>
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
        )}

        {/* Simple back header for shop management views */}
        {(currentView === 'addShop' || currentView === 'removeShop') && (
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => setCurrentView('main')} style={styles.backButton} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <View style={styles.headerRightPlaceholder} />
          </View>
        )}

        {/* Simple back header for student management views */}
        {(currentStudentView === 'register' || currentStudentView === 'studentCard') && (
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => setCurrentStudentView('main')} style={styles.backButton} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <View style={styles.headerRightPlaceholder} />
          </View>
        )}

        {/* Welcome message - Only show on main screen */}
        {currentView === 'main' && currentStudentView === 'main' && (
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>Canteen Administration</Text>
            <Text style={styles.welcomeSubtitle}>Manage campus food services</Text>
          </View>
        )}

        {/* Main tiles - Different views based on currentView */}
        {currentView === 'main' && currentStudentView === 'main' && (
          <View style={styles.tilesGrid}>
            <TouchableOpacity
              style={styles.tile}
              activeOpacity={0.9}
              onPress={() => setCurrentStudentView('register')}
            >
              <View style={[styles.tileIconImage]}>
                <Image
                  source={require('./assets/student.png')}
                  style={styles.tileImageContent}
                />
              </View>
              <Text style={styles.tileLabel}>Student/Staff</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tile}
              activeOpacity={0.9}
              onPress={() => setCurrentView('removeShop')}
            >
              <View style={[styles.tileIconImage]}>
                <Image
                  source={require('./assets/shop.png')}
                  style={styles.tileImageContent}
                />
              </View>
              <Text style={styles.tileLabel}>Shops</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Add Shop View */}
        {currentView === 'addShop' && (
          <View style={[styles.formContainer, { paddingTop: 120 }]}>
            <Text style={styles.formTitle}>Add New Shop</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter shop name"
              value={newShopName}
              onChangeText={setNewShopName}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter shop owner name"
              value={newShopOwnerName}
              onChangeText={setNewShopOwnerName}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              value={newShopPhone}
              onChangeText={setNewShopPhone}
              keyboardType="phone-pad"
              maxLength={10}
            />

            <TouchableOpacity style={styles.button} onPress={addShop}>
              <Text style={styles.buttonText}>Add Shop & Generate Card</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Remove Shop View */}
        {currentView === 'removeShop' && (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Manage Shops</Text>

            <TouchableOpacity style={styles.addButton} onPress={() => setCurrentView('addShop')}>
              <Text style={styles.addButtonText}>Add New Shop</Text>
            </TouchableOpacity>

            {shops.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No shops added yet</Text>
              </View>
            ) : (
              <View style={styles.shopList}>
                {shops.map((shop) => (
                  <View key={shop.id} style={styles.shopItem}>
                    <View style={styles.shopInfo}>
                      <Text style={styles.shopName}>{shop.name}</Text>
                      <Text style={styles.shopDetails}>Owner: {shop.ownerName}</Text>
                      <Text style={styles.shopId}>ID: {shop.shopId}</Text>
                    </View>
                    <View style={styles.shopActions}>
                      <TouchableOpacity
                        style={styles.cardButton}
                        onPress={() => generateShopCard(shop)}
                      >
                        <Text style={styles.cardButtonText}>View Card</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => removeShop(shop.id)}
                      >
                        <Text style={styles.deleteButtonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Student/Staff Registration View */}
        {currentStudentView === 'register' && (
          <View style={[styles.formContainer, { paddingTop: 120 }]}>
            <Text style={styles.formTitle}>Register for New User</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter full name"
              value={studentName}
              onChangeText={setStudentName}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter department"
              value={studentDepartment}
              onChangeText={setStudentDepartment}
            />

            <View >
              <Text style={styles.roleLabel}>Select Role:</Text>
              <View style={styles.roleOptions}>
                <TouchableOpacity
                  style={[styles.roleOption, studentRole === 'Student' && styles.roleOptionSelected]}
                  onPress={() => setStudentRole('Student')}
                >
                  <Text style={[styles.roleOptionText, studentRole === 'Student' && styles.roleOptionTextSelected]}>
                    Student
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.roleOption, studentRole === 'Staff' && styles.roleOptionSelected]}
                  onPress={() => setStudentRole('Staff')}
                >
                  <Text style={[styles.roleOptionText, studentRole === 'Staff' && styles.roleOptionTextSelected]}>
                    Staff
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              value={studentPhone}
              onChangeText={setStudentPhone}
              keyboardType="phone-pad"
              maxLength={10}
            />

            <TouchableOpacity style={styles.button} onPress={registerStudent}>
              <Text style={styles.buttonText}>Generate E-Card</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profilePic: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    // Removed green background to show original image
  },
  greetingWrap: {
    flexDirection: 'column',
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#111',
    fontWeight: '600',
  },
  collegeName: {
    fontSize: 18,
    color: '#111',
    fontWeight: '800',
  },
  backButton: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    zIndex: 2
  },
  backIcon: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111'
  },
  headerRightPlaceholder: {
    width: 36,
    height: 36
  },
  profileMenu: {
    position: 'absolute',
    top: 44,
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
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  tilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 20,
    columnGap: 20,
  },
  tile: {
    width: '46%',
    aspectRatio: 1,
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    padding: 10,
  },
  tileIconContainer: {
    width: 72,
    height: 72,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9C27B0', // Purple for Shops tile
    borderRadius: 36,
  },
  tileIconImage: {
    width: 72,
    height: 72,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // Background color applied inline for different tiles
  },
  tileImageContent: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  tileLabel: {
    fontSize: 18,
    color: '#111',
    fontWeight: '700',
    textAlign: 'center',
  },
  // Form styles
  formContainer: {
    flex: 1,
    paddingTop: 20, // Base padding
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Shop management styles
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  shopList: {
    flex: 1,
    marginBottom: 20,
  },
  shopItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shopInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  shopDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  shopId: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
  },
  shopActions: {
    flexDirection: 'row',
    gap: 8,
  },
  cardButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  // Student/Staff registration styles
  roleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  roleOptions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 13,

  },
  roleOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  roleOptionSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#e8f5e8',
  },
  roleOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  roleOptionTextSelected: {
    color: '#4CAF50',
  },
});

export default CanteenAdminOfficeHP;
