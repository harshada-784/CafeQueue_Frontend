import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

export default function LeafletMapScreen() {
  const webViewRef = useRef<any>(null);
  const [boundary, setBoundary] = useState<any[]>([]);

  const handleMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    setBoundary(data);
  };

  const clearBoundary = () => {
    webViewRef.current.injectJavaScript(`clearMap(); true;`);
    setBoundary([]);
  };

  const saveBoundary = async () => {
    if (boundary.length < 3) {
      Alert.alert("Error", "Minimum 3 points required");
      return;
    }

    try {
      await fetch("http://192.168.1.203:8000/save-boundary/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          college_id: 1,
          boundary: boundary,
        }),
      });

      Alert.alert("Success", "Boundary saved");
    } catch (e) {
      Alert.alert("Error", "Failed to save");
    }
  };

  return (
    <View style={{ flex: 1 }}>

      <WebView
        ref={webViewRef}
        source={{ uri: 'file:///android_asset/map.html' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={handleMessage}
      />

      {/* Controls */}
      <View style={{ position: 'absolute', bottom: 40, width: '100%' }}>

        <TouchableOpacity
          style={{ backgroundColor: 'green', padding: 15, margin: 10 }}
          onPress={saveBoundary}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>
            Save Boundary
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ backgroundColor: 'red', padding: 15, margin: 10 }}
          onPress={clearBoundary}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>
            Clear
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}