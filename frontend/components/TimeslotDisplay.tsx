import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { 
  getCurrentTimeslot, 
  getNextAvailableTimeslot, 
  getTimeUntilNextTimeslot,
  getRemainingSlots,
  Timeslot 
} from '../timeslotStore';

interface TimeslotDisplayProps {
  shopName: string;
  shopLogo?: string;
}

export default function TimeslotDisplay({ shopName, shopLogo = '🏪' }: TimeslotDisplayProps) {
  const [currentTimeslot, setCurrentTimeslot] = useState<Timeslot | null>(null);
  const [nextTimeslot, setNextTimeslot] = useState<Timeslot | null>(null);
  const [remainingSlots, setRemainingSlots] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const updateData = () => {
      const current = getCurrentTimeslot(shopName);
      const next = getNextAvailableTimeslot(shopName);
      
      setCurrentTimeslot(current);
      setNextTimeslot(next);
      
      if (current) {
        setRemainingSlots(getRemainingSlots(current));
        setTimeRemaining('Closing soon');
      } else if (next) {
        setRemainingSlots(getRemainingSlots(next));
        setTimeRemaining(getTimeUntilNextTimeslot(shopName));
      } else {
        setRemainingSlots(0);
        setTimeRemaining('No slots available');
      }
    };

    updateData();
    const interval = setInterval(updateData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [shopName]);

  // Pulse animation for urgency
  useEffect(() => {
    if (remainingSlots <= 2 && remainingSlots > 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.8,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [remainingSlots, pulseAnim]);

  const getStatusColor = () => {
    if (currentTimeslot) {
      if (remainingSlots === 0) return '#dc3545';
      if (remainingSlots <= 2) return '#ff9800';
      return '#28a745';
    } else {
      return '#1976d2';
    }
  };

  const getStatusText = () => {
    if (currentTimeslot) {
      if (remainingSlots === 0) return '🔴 SLOT FULL';
      if (remainingSlots <= 2) return '🟡 FILLING FAST';
      return '🟢 ORDER NOW';
    } else if (nextTimeslot) {
      return '⏰ NEXT SLOT';
    } else {
      return '⚫ UNAVAILABLE';
    }
  };

  const getUrgencyMessage = () => {
    if (remainingSlots <= 2 && remainingSlots > 0) {
      return `Only ${remainingSlots} slots left!`;
    } else if (remainingSlots === 0) {
      return 'All slots taken';
    } else if (currentTimeslot) {
      return `${remainingSlots} slots available`;
    } else {
      return timeRemaining;
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: pulseAnim }]}>
      {/* Logo and Shop Name */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>{shopLogo}</Text>
        </View>
        <View style={styles.shopInfo}>
          <Text style={styles.shopName} numberOfLines={1}>{shopName}</Text>
          <Text style={styles.queueLabel}>Queue Management</Text>
        </View>
      </View>

      {/* Current Status */}
      <View style={[styles.statusCard, { borderLeftColor: getStatusColor() }]}>
        <View style={styles.statusHeader}>
          <Text style={styles.statusText}>{getStatusText()}</Text>
          <View style={[styles.badge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.badgeText}>
              {currentTimeslot ? `${remainingSlots}/${currentTimeslot.maxOrders}` : '--'}
            </Text>
          </View>
        </View>

        {/* Time Information */}
        {currentTimeslot && (
          <View style={styles.timeInfo}>
            <Text style={styles.timeLabel}>Current Slot:</Text>
            <Text style={styles.timeValue}>
              {currentTimeslot.startTime} - {currentTimeslot.endTime}
            </Text>
          </View>
        )}

        {nextTimeslot && !currentTimeslot && (
          <View style={styles.timeInfo}>
            <Text style={styles.timeLabel}>Next Slot:</Text>
            <Text style={styles.timeValue}>
              {nextTimeslot.startTime} - {nextTimeslot.endTime}
            </Text>
          </View>
        )}

        {/* Urgency Message */}
        <View style={styles.urgencyContainer}>
          <Text style={[styles.urgencyMessage, { color: getStatusColor() }]}>
            {getUrgencyMessage()}
          </Text>
          {timeRemaining && !currentTimeslot && (
            <Text style={styles.timeRemaining}>{timeRemaining}</Text>
          )}
        </View>

        {/* Progress Bar */}
        {currentTimeslot && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${(currentTimeslot.currentOrders / currentTimeslot.maxOrders) * 100}%`,
                    backgroundColor: getStatusColor() 
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round((currentTimeslot.currentOrders / currentTimeslot.maxOrders) * 100)}% Full
            </Text>
          </View>
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <Text style={styles.actionsTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <View style={styles.actionButton}>
            <Text style={styles.actionIcon}>📱</Text>
            <Text style={styles.actionLabel}>Join Queue</Text>
          </View>
          <View style={styles.actionButton}>
            <Text style={styles.actionIcon}>⏰</Text>
            <Text style={styles.actionLabel}>Set Reminder</Text>
          </View>
          <View style={styles.actionButton}>
            <Text style={styles.actionIcon}>📊</Text>
            <Text style={styles.actionLabel}>View Stats</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logo: {
    fontSize: 20,
  },
  shopInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 2,
  },
  queueLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  statusCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
    borderRadius: 8,
    padding: 12,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  timeInfo: {
    marginBottom: 8,
  },
  timeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
  },
  urgencyContainer: {
    marginBottom: 12,
  },
  urgencyMessage: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  timeRemaining: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  actionsContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  actionIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  actionLabel: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
});
