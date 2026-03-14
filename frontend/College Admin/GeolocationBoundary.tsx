import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Dimensions } from 'react-native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import { Text as GlobalText } from '../components/GlobalComponents';
import { geolocationBoundaryStyles } from '../../css style/GeolocationBoundary.styles';

interface BoundaryPoint {
  latitude: number;
  longitude: number;
}

interface Props {
  onBack: () => void;
  onSave: (boundary: BoundaryPoint[]) => void;
  initialBoundary?: BoundaryPoint[];
}

export default function GeolocationBoundary({ onBack, onSave, initialBoundary }: Props) {
  const [boundary, setBoundary] = useState<BoundaryPoint[]>(initialBoundary || []);
  const [newPoint, setNewPoint] = useState<BoundaryPoint>({ latitude: 0, longitude: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'draw' | 'edit' | 'view'>('view');
  const [mapMode, setMapMode] = useState<'manual' | 'map'>('manual');
  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const handleStartDrawing = () => {
    setIsDrawing(true);
    setSelectedMode('draw');
    setBoundary([]);
  };

  const handleAddPoint = () => {
    if (mapMode === 'manual') {
      if (newPoint.latitude !== 0 && newPoint.longitude !== 0) {
        setBoundary([...boundary, newPoint]);
        setNewPoint({ latitude: 0, longitude: 0 });
      }
    }
  };

  const handleMapPress = (e: any) => {
    if (mapMode === 'map' && isDrawing) {
      const coordinate = e.nativeEvent.coordinate;
      setBoundary([...boundary, coordinate]);
    }
  };

  const toggleInputMode = () => {
    setMapMode(mapMode === 'manual' ? 'map' : 'manual');
    setIsDrawing(false);
  };

  const startMapDrawing = () => {
    setIsDrawing(true);
    setSelectedMode('draw');
  };

  const clearBoundary = () => {
    setBoundary([]);
    setIsDrawing(false);
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

  const handleRemovePoint = (index: number) => {
    setBoundary(boundary.filter((point, i) => i !== index));
  };

  const handleSave = () => {
    if (boundary.length < 3) {
      Alert.alert('Error', 'You need at least 3 points to save a boundary');
      return;
    }
    onSave(boundary);
    Alert.alert('Success', 'Boundary saved successfully');
  };

  const handleClear = () => {
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

  return (
    <View style={geolocationBoundaryStyles.formContainer}>
      <GlobalText style={geolocationBoundaryStyles.formTitle}>📍 Geolocation Boundary</GlobalText>

      {/* Toggle Mode Button */}
      <TouchableOpacity 
        style={geolocationBoundaryStyles.toggleModeButton}
        onPress={toggleInputMode}
      >
        <GlobalText style={geolocationBoundaryStyles.toggleModeButtonText}>
          {mapMode === 'manual' ? '🗺️ Switch to Map View' : '📝 Switch to Manual Entry'}
        </GlobalText>
      </TouchableOpacity>

      {/* Map View */}
      {mapMode === 'map' && (
        <View style={geolocationBoundaryStyles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={geolocationBoundaryStyles.map}
            region={region}
            onPress={handleMapPress}
          >
            {/* Show boundary polygon if there are points */}
            {boundary.length >= 3 && (
              <Polygon
                coordinates={boundary}
                fillColor="rgba(192, 154, 126, 0.3)"
                strokeColor="#c09a7e"
                strokeWidth={2}
              />
            )}
            
            {/* Show markers for each point */}
            {boundary.map((point, index) => (
              <Marker
                key={index}
                coordinate={point}
                title={`Point ${index + 1}`}
                description={`Lat: ${point.latitude.toFixed(6)}, Lon: ${point.longitude.toFixed(6)}`}
              />
            ))}
          </MapView>
          
          {/* Map Controls */}
          <View style={geolocationBoundaryStyles.mapControls}>
            <TouchableOpacity
              style={[geolocationBoundaryStyles.mapControlButton, { backgroundColor: isDrawing ? '#4CAF50' : '#2196F3' }]}
              onPress={isDrawing ? clearBoundary : startMapDrawing}
            >
              <GlobalText style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>
                {isDrawing ? '⏹️ Stop' : '▶️ Draw'}
              </GlobalText>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Boundary Information */}
      <View style={geolocationBoundaryStyles.boundaryInfo}>
        <View style={geolocationBoundaryStyles.infoRow}>
          <GlobalText style={geolocationBoundaryStyles.infoLabel}>Total Points:</GlobalText>
          <GlobalText style={geolocationBoundaryStyles.infoValue}>{boundary.length}</GlobalText>
        </View>
        <View style={geolocationBoundaryStyles.infoRow}>
          <GlobalText style={geolocationBoundaryStyles.infoLabel}>Status:</GlobalText>
          <GlobalText style={geolocationBoundaryStyles.infoValue}>
            {boundary.length < 3 ? 'Incomplete (min 3 points)' : 'Complete'}
          </GlobalText>
        </View>
      </View>

      {/* Instructions */}
      <View style={geolocationBoundaryStyles.instructionsList}>
        <GlobalText style={{ fontSize: 16, fontWeight: '700', color: '#5D4037', marginBottom: 16 }}>
          📋 {mapMode === 'manual' ? 'How to Set Boundary (Manual):' : 'How to Set Boundary (Map):'}
        </GlobalText>
        
        {mapMode === 'manual' ? (
          <>
            <View style={geolocationBoundaryStyles.instructionItem}>
              <View style={geolocationBoundaryStyles.instructionNumber}>
                <GlobalText style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>1</GlobalText>
              </View>
              <GlobalText style={geolocationBoundaryStyles.instructionText}>
                Enter latitude and longitude coordinates for each boundary point
              </GlobalText>
            </View>

            <View style={geolocationBoundaryStyles.instructionItem}>
              <View style={geolocationBoundaryStyles.instructionNumber}>
                <GlobalText style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>2</GlobalText>
              </View>
              <GlobalText style={geolocationBoundaryStyles.instructionText}>
                Add at least 3 points to create a valid boundary
              </GlobalText>
            </View>

            <View style={geolocationBoundaryStyles.instructionItem}>
              <View style={geolocationBoundaryStyles.instructionNumber}>
                <GlobalText style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>3</GlobalText>
              </View>
              <GlobalText style={geolocationBoundaryStyles.instructionText}>
                Points will be connected in order to form the boundary
              </GlobalText>
            </View>

            <View style={geolocationBoundaryStyles.instructionItem}>
              <View style={geolocationBoundaryStyles.instructionNumber}>
                <GlobalText style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>4</GlobalText>
              </View>
              <GlobalText style={geolocationBoundaryStyles.instructionText}>
                Review and save your boundary when complete
              </GlobalText>
            </View>
          </>
        ) : (
          <>
            <View style={geolocationBoundaryStyles.instructionItem}>
              <View style={geolocationBoundaryStyles.instructionNumber}>
                <GlobalText style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>1</GlobalText>
              </View>
              <GlobalText style={geolocationBoundaryStyles.instructionText}>
                Click the "Draw" button to start drawing mode
              </GlobalText>
            </View>

            <View style={geolocationBoundaryStyles.instructionItem}>
              <View style={geolocationBoundaryStyles.instructionNumber}>
                <GlobalText style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>2</GlobalText>
              </View>
              <GlobalText style={geolocationBoundaryStyles.instructionText}>
                Tap on the map to add boundary points
              </GlobalText>
            </View>

            <View style={geolocationBoundaryStyles.instructionItem}>
              <View style={geolocationBoundaryStyles.instructionNumber}>
                <GlobalText style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>3</GlobalText>
              </View>
              <GlobalText style={geolocationBoundaryStyles.instructionText}>
                Add at least 3 points to create a valid boundary
              </GlobalText>
            </View>

            <View style={geolocationBoundaryStyles.instructionItem}>
              <View style={geolocationBoundaryStyles.instructionNumber}>
                <GlobalText style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>4</GlobalText>
              </View>
              <GlobalText style={geolocationBoundaryStyles.instructionText}>
                Click "Stop" when done, then save your boundary
              </GlobalText>
            </View>
          </>
        )}
      </View>

      {/* Input Form - Only show in manual mode */}
      {mapMode === 'manual' && (
      <View style={geolocationBoundaryStyles.form}>
        <GlobalText style={{ fontSize: 16, fontWeight: '700', color: '#5D4037', marginBottom: 16 }}>
          📍 Add Boundary Point:
        </GlobalText>
        
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
          <View style={{ flex: 1 }}>
            <GlobalText style={{ fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 4 }}>
              Latitude
            </GlobalText>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#e0e0e0',
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 12,
                fontSize: 16,
                backgroundColor: '#fff',
              }}
              value={newPoint.latitude.toString()}
              onChangeText={(text) => setNewPoint({ ...newPoint, latitude: parseFloat(text) || 0 })}
              placeholder="Enter latitude"
              keyboardType="numeric"
            />
          </View>
          
          <View style={{ flex: 1 }}>
            <GlobalText style={{ fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 4 }}>
              Longitude
            </GlobalText>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#e0e0e0',
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 12,
                fontSize: 16,
                backgroundColor: '#fff',
              }}
              value={newPoint.longitude.toString()}
              onChangeText={(text) => setNewPoint({ ...newPoint, longitude: parseFloat(text) || 0 })}
              placeholder="Enter longitude"
              keyboardType="numeric"
            />
          </View>
        </View>

        <TouchableOpacity 
          style={{
            backgroundColor: '#c09a7e',
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 4,
            marginBottom: 12,
          }}
          onPress={handleAddPoint}
        >
          <GlobalText style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
            ➕ Add Point
          </GlobalText>
        </TouchableOpacity>
      </View>
      )}

      {/* Points List */}
      {boundary.length > 0 && (
        <View style={geolocationBoundaryStyles.form}>
          <GlobalText style={{ fontSize: 16, fontWeight: '700', color: '#5D4037', marginBottom: 16 }}>
            📍 Boundary Points ({boundary.length}):
          </GlobalText>
          
          {boundary.map((point, index) => (
            <View 
              key={index}
              style={{
                backgroundColor: '#fff',
                borderRadius: 8,
                padding: 12,
                marginBottom: 8,
                borderWidth: 1,
                borderColor: '#e0e0e0',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View>
                <GlobalText style={{ fontSize: 14, fontWeight: '700', color: '#111' }}>
                  Point {index + 1}
                </GlobalText>
                <GlobalText style={{ fontSize: 12, color: '#666' }}>
                  Lat: {point.latitude.toFixed(6)}, Lon: {point.longitude.toFixed(6)}
                </GlobalText>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#F44336',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 6,
                }}
                onPress={() => handleRemovePoint(index)}
              >
                <GlobalText style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>
                  Remove
                </GlobalText>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Action Buttons */}
      <View style={geolocationBoundaryStyles.actionContainer}>
        <View style={geolocationBoundaryStyles.actionButtons}>
          <TouchableOpacity 
            style={[geolocationBoundaryStyles.actionButton, geolocationBoundaryStyles.saveButton]} 
            onPress={handleSave}
            disabled={boundary.length < 3}
          >
            <GlobalText style={geolocationBoundaryStyles.actionButtonText}>
              💾 Save 
            </GlobalText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[geolocationBoundaryStyles.actionButton, geolocationBoundaryStyles.cancelButton]} 
            onPress={handleClear}
          >
            <GlobalText style={geolocationBoundaryStyles.actionButtonText}>
              🗑️ Clear All
            </GlobalText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
