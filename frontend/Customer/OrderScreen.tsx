import React, { useEffect, useState } from 'react';
import { View, Button, Alert } from 'react-native';
import { getUserLocation } from '../services/locationServices';
import { fetchBoundary, checkInsideBoundary } from '../services/boundaryServices';

export default function OrderScreen() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      const user = await getUserLocation();
      const boundary = await fetchBoundary();

      const inside = checkInsideBoundary(user, boundary);

      setAllowed(inside);

      if (!inside) {
        Alert.alert("Blocked", "You are outside campus");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const placeOrder = () => {
    if (!allowed) {
      Alert.alert("Error", "Outside boundary");
      return;
    }

    Alert.alert("Success", "Order placed");
  };

  return (
    <View style={{ marginTop: 100 }}>
      <Button title="Place Order" onPress={placeOrder} />
    </View>
  );
}