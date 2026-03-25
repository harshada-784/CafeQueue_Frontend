import React from 'react';
import { View, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Text } from '../components/GlobalComponents';
import Background from '../Background';
import { styles } from '../../css style/ShopCard.styles';

interface Props {
  onBack: () => void;
  userName: string;
  shopId: string;
  shopName: string; // Add shop name
  isStudentCard?: boolean;
  studentDetails?: {
    name: string;
    department: string;
    role: string;
    phone: string;
  };
  collegeOfficeAdmin?: boolean; // Add college office admin flag
}

function ShopCard({ onBack, userName, shopId, shopName, isStudentCard = false, studentDetails, collegeOfficeAdmin = false }: Props) {
  // Generate a sample Shop Card ID based on the provided shop ID
  const cardId = shopId || `SHOP${shopName?.replace(/\s+/g, '').toUpperCase() || 'DEFAULT'}${Math.floor(1000 + Math.random() * 9000)}`;
  const phoneNumber = `+91 ${Math.floor(9000000000 + Math.random() * 999999999)}`;

  return (
    <Background>
      <View style={{ paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 16) + 12 : 16 }}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack} style={styles.backButton} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.titleCenter} pointerEvents="none">
            {isStudentCard ? 'E-Canteen User Card' : `${shopName} Shop License Card`}
          </Text>
          <View style={styles.headerRightPlaceholder} />
        </View>
      </View>

      <View style={styles.container}>
        <View style={[styles.card, { backgroundColor: isStudentCard ? '#4CAF50' : '#FF9800' }]}>
          {/* Card Header */}
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>
              {isStudentCard ? 'E-Canteen User Card' : `${shopName} Shop License Card`}
            </Text>
            <View style={styles.cardLogo}>
              <Text style={styles.logoText}>{isStudentCard ? '👤' : '🏪'}</Text>
            </View>
          </View>

          {/* Card Content - Shop Specific */}
          <View style={styles.cardContent}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>
                {isStudentCard ? 'Card ID:' : 'License ID:'}
              </Text>
              <Text style={styles.value}>{cardId}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.label}>
                {isStudentCard ? 'Name:' : 'Shop Name:'}
              </Text>
              <Text style={styles.value}>{shopName}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.label}>
                {isStudentCard ? 'Authorized for:' : 'License Type:'}
              </Text>
              <Text style={styles.value}>
                {isStudentCard ? 'Food Service Access' : 'Food Service Operations'}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.label}>
                {isStudentCard ? 'Valid Until:' : 'Valid Until:'}
              </Text>
              <Text style={styles.value}>31/12/2025</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.label}>
                {isStudentCard ? 'Issued By:' : 'Issued By:'}
              </Text>
              <Text style={styles.value}>College Office Admin</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.label}>Shop Owner:</Text>
              <Text style={styles.value}>{userName}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.label}>Contact:</Text>
              <Text style={styles.value}>{phoneNumber}</Text>
            </View>
          </View>

          {/* Card Footer */}
          <View style={styles.cardFooter}>
            <Text style={styles.footerText}>
              {isStudentCard 
                ? 'Authorized for food service access' 
                : 'Authorized for food service operations'
              }
            </Text>
            <Text style={styles.footerSubtext}>
              {isStudentCard 
                ? 'Valid for current semester' 
                : 'Valid for current academic year'
              }
            </Text>
          </View>
        </View>

        {/* Additional Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>
            {isStudentCard ? 'Shop Card Usage:' : 'Shop Card Usage:'}
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
              : '• Required for order processing and inventory management'
            }
          </Text>
          <Text style={styles.infoText}>
            {isStudentCard
              ? '• Report lost card to administration immediately'
              : '• Report lost card to college office immediately'
            }
          </Text>
        </View>
      </View>
    </Background>
  );
}

export default ShopCard;
