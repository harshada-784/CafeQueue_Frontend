import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import Background from './Background';

interface Props {
  onBack: () => void;
  userName: string;
  shopId: string;
  isStudentCard?: boolean;
  studentDetails?: {
    name: string;
    department: string;
    role: string;
    phone: string;
  };
}

function ShopCard({ onBack, userName, shopId, isStudentCard = false, studentDetails }: Props) {
  // Generate a sample Shop Card ID based on the provided shop ID
  const cardId = shopId || `SBVCOE${Math.floor(1000 + Math.random() * 9000)}`;
  const phoneNumber = `+91 ${Math.floor(9000000000 + Math.random() * 999999999)}`;

  return (
    <Background>
      <View style={{ paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 16) + 12 : 16 }}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack} style={styles.backButton} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.titleCenter} pointerEvents="none">
            {isStudentCard ? 'E-Canteen User Card' : 'E-Canteen Shop Card'}
          </Text>
          <View style={styles.headerRightPlaceholder} />
        </View>
      </View>

      <View style={styles.container}>
        <View style={[styles.card, { backgroundColor: isStudentCard ? '#4CAF50' : '#FF9800' }]}>
          {/* Card Header */}
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>
              {isStudentCard ? 'E-Canteen User Card' : 'E-Canteen Shop Card'}
            </Text>
            <View style={styles.cardLogo}>
              <Text style={styles.logoText}>{isStudentCard ? '👤' : '🏪'}</Text>
            </View>
          </View>

          {/* Card Content */}
          <View style={styles.cardContent}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>
                {isStudentCard ? 'Card ID:' : 'Shop ID:'}
              </Text>
              <Text style={styles.value}>{cardId}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.label}>
                {isStudentCard ? 'Name:' : 'Shop Name:'}
              </Text>
              <Text style={styles.value}>{userName}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.label}>Role:</Text>
              <Text style={styles.value}>
                {isStudentCard ? (studentDetails?.role || 'Student') : 'Shop'}
              </Text>
            </View>

            {isStudentCard && studentDetails && (
              <>
                <View style={styles.divider} />

                <View style={styles.infoRow}>
                  <Text style={styles.label}>Department:</Text>
                  <Text style={styles.value}>{studentDetails.department}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.infoRow}>
                  <Text style={styles.label}>Phone:</Text>
                  <Text style={styles.value}>{studentDetails.phone}</Text>
                </View>
              </>
            )}

            {!isStudentCard && (
              <>
                <View style={styles.divider} />

                <View style={styles.infoRow}>
                  <Text style={styles.label}>Shop Owner Name:</Text>
                  <Text style={styles.value}>{userName}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.infoRow}>
                  <Text style={styles.label}>Phone:</Text>
                  <Text style={styles.value}>{phoneNumber}</Text>
                </View>
              </>
            )}
          </View>

          {/* Card Footer */}
          <View style={styles.cardFooter}>
            <Text style={styles.footerText}>
              {isStudentCard ? 'Authorized for food service access' : 'Authorized for food service operations'}
            </Text>
            <Text style={styles.footerSubtext}>
              {isStudentCard ? 'Valid for current semester' : 'Valid for current academic year'}
            </Text>
          </View>
        </View>

        {/* Additional Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>
            {isStudentCard ? 'User Card Usage:' : 'Shop Card Usage:'}
          </Text>
          <Text style={styles.infoText}>
            {isStudentCard
              ? '• Use this card to access canteen services and place orders'
              : '• Use this card to access shop management features'
            }
          </Text>
          <Text style={styles.infoText}>
            {isStudentCard
              ? '• Required for order processing and meal access'
              : '• Required for order processing and inventory'
            }
          </Text>
          <Text style={styles.infoText}>
            {isStudentCard
              ? '• Report lost card to administration immediately'
              : '• Report lost card to administration immediately'
            }
          </Text>
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerRow: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 28,
    marginBottom: 0,
    position: 'relative'
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
  titleCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '900',
    color: '#111'
  },
  headerRightPlaceholder: {
    width: 36,
    height: 36
  },
  card: {
    backgroundColor: '#FF9800',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  cardLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
  },
  cardContent: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    opacity: 0.9,
  },
  value: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'right',
    maxWidth: '60%',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginVertical: 8,
  },
  cardFooter: {
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
  },
  footerText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.8,
  },
  infoContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
    lineHeight: 20,
  },
});

export default ShopCard;
