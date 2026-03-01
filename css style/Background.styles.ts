import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#c09a7eff',
  },
  backgroundImage: {
    opacity: 0.15, 
  },
});

// Background options for canteen admin
export const backgroundOptions = {
  // Option 1: Current coffee theme
  coffee: {
    backgroundColor: '#c09a7eff',
    image: require('../frontend/assets/coffeebeans.png'),
    imageOpacity: 0.3,
  },
  
  // Option 2: Modern gradient theme
  modern: {
    backgroundColor: '#c8b7acff',
    image: require('../frontend/assets/coffeebeans.png'),
    imageOpacity: 0.45,
  },
  
  // Option 3: Food theme
  food: {
    backgroundColor: '#fff5e6',
    image: require('../frontend/assets/food_home_user.png'),
    imageOpacity: 0.12,
  },
  
  // Option 4: Clean minimal theme
  minimal: {
    backgroundColor: '#ffffff',
    image: null, // No image background
    imageOpacity: 0,
  },
  
  // Option 5: Professional theme
  professional: {
    backgroundColor: '#f5f7fa',
    image: require('../frontend/assets/doodles.png'),
    imageOpacity: 0.05,
  },
  
  // Option 6: Warm theme
  warm: {
    backgroundColor: '#fef3e2',
    image: require('../frontend/assets/coffeebeans.png'),
    imageOpacity: 0.1,
  },
  
  // Option 7: Fresh theme
  fresh: {
    backgroundColor: '#e8f5e8',
    image: require('../frontend/assets/food_home_user2.png'),
    imageOpacity: 0.1,
  },
  
  // Option 8: Dark theme
  dark: {
    backgroundColor: '#2c3e50',
    image: require('../frontend/assets/doodles.png'),
    imageOpacity: 0.03,
  },
};
