import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Text } from '../components/GlobalComponents';
import { styles } from '../../css style/CollegeAdminOfficeHP.styles';

interface BoundaryPoint {
  latitude: number;
  longitude: number;
}

interface Props {
  onBack: () => void;
  onSave: (boundary: BoundaryPoint[]) => void;
  initialBoundary?: BoundaryPoint[];
}

export default function GeolocationBoundary({ onBack, onSave, initialBoundary = [] }: Props) {
  const [boundary, setBoundary] = useState<BoundaryPoint[]>(initialBoundary);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'draw' | 'edit' | 'view'>('view');

  const handleStartDrawing = () => {
    setIsDrawing(true);
    setSelectedMode('draw');
    setBoundary([]);
  };

  const handleAddPoint = () => {
    // In a real app, this would get the actual location from map tap
    // For demo purposes, we'll add random points around a center
    const newPoint: BoundaryPoint = {
      latitude: 12.9716 + (Math.random() - 0.5) * 0.01,
      longitude: 77.5946 + (Math.random() - 0.5) * 0.01,
    };
    setBoundary([...boundary, newPoint]);
  };

  const handleRemoveLastPoint = () => {
    if (boundary.length > 0) {
      setBoundary(boundary.slice(0, -1));
    }
  };

  const handleClearBoundary = () => {
    Alert.alert(
      'Clear Boundary',
      'Are you sure you want to clear the entire boundary?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            setBoundary([]);
            setIsDrawing(false);
            setSelectedMode('view');
          },
        },
      ]
    );
  };

  const handleFinishDrawing = () => {
    if (boundary.length < 3) {
      Alert.alert('Error', 'You need at least 3 points to create a boundary');
      return;
    }
    setIsDrawing(false);
    setSelectedMode('view');
  };

  const handleSaveBoundary = () => {
    if (boundary.length < 3) {
      Alert.alert('Error', 'You need at least 3 points to save a boundary');
      return;
    }
    onSave(boundary);
    Alert.alert('Success', 'Boundary saved successfully');
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Geolocation Boundaries</Text>

      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>
            {selectedMode === 'draw' ? 'Tap to add boundary points' : 'Map View'}
          </Text>
          <Text style={{ fontSize: 12, color: '#999', marginTop: 8 }}>
            Points: {boundary.length}
          </Text>
        </View>
      </View>

      <View style={styles.boundaryControls}>
        {selectedMode === 'view' && (
          <TouchableOpacity style={[styles.boundaryButton, { backgroundColor: '#4CAF50' }]} onPress={handleStartDrawing}>
            <Text style={styles.boundaryButtonText}>Start Drawing</Text>
          </TouchableOpacity>
        )}
        
        {selectedMode === 'draw' && (
          <>
            <TouchableOpacity style={[styles.boundaryButton, { backgroundColor: '#2196F3' }]} onPress={handleAddPoint}>
              <Text style={styles.boundaryButtonText}>Add Point</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.boundaryButton, { backgroundColor: '#FF9800' }]} onPress={handleRemoveLastPoint}>
              <Text style={styles.boundaryButtonText}>Undo</Text>
            </TouchableOpacity>
          </>
        )}

        {selectedMode === 'draw' && boundary.length >= 3 && (
          <TouchableOpacity style={[styles.boundaryButton, { backgroundColor: '#4CAF50' }]} onPress={handleFinishDrawing}>
            <Text style={styles.boundaryButtonText}>Finish</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.boundaryControls}>
        <TouchableOpacity style={[styles.boundaryButton, { backgroundColor: '#F44336' }]} onPress={handleClearBoundary}>
          <Text style={styles.boundaryButtonText}>Clear All</Text>
        </TouchableOpacity>
        
        {boundary.length >= 3 && selectedMode === 'view' && (
          <TouchableOpacity style={[styles.boundaryButton, { backgroundColor: '#4CAF50' }]} onPress={handleSaveBoundary}>
            <Text style={styles.boundaryButtonText}>Save Boundary</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.profileSection}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 12 }}>Boundary Information</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status:</Text>
          <Text style={[styles.detailValue, boundary.length >= 3 ? styles.statusActive : styles.statusInactive]}>
            {boundary.length >= 3 ? 'Complete' : 'Incomplete'}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total Points:</Text>
          <Text style={styles.detailValue}>{boundary.length}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Mode:</Text>
          <Text style={styles.detailValue}>{selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1)}</Text>
        </View>

        {boundary.length > 0 && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Coverage Area:</Text>
            <Text style={styles.detailValue}>
              ~{(boundary.length * 0.1).toFixed(2)} km²
            </Text>
          </View>
        )}
      </View>

      <View style={styles.profileSection}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 12 }}>Instructions</Text>
        <Text style={{ fontSize: 14, color: '#666', lineHeight: 20 }}>
          • Click "Start Drawing" to begin creating a boundary{'\n'}
          • Add at least 3 points to create a valid boundary{'\n'}
          • The boundary will be used to determine service areas{'\n'}
          • Students within the boundary can access canteen services{'\n'}
          • You can edit the boundary later if needed
        </Text>
      </View>
    </View>
  );
}
