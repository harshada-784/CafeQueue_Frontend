import React, { PropsWithChildren } from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';
import { styles, backgroundOptions } from '../css style/Background.styles';

interface BackgroundProps extends PropsWithChildren {
  theme?: keyof typeof backgroundOptions;
}

export default function Background({ children, theme = 'coffee' }: BackgroundProps) {
  const selectedTheme = backgroundOptions[theme];
  
  if (selectedTheme.image) {
    return (
      <ImageBackground
        source={selectedTheme.image}
        style={[styles.background, { backgroundColor: selectedTheme.backgroundColor }]}
        imageStyle={[styles.backgroundImage, { opacity: selectedTheme.imageOpacity }]}
      >
        {children}
      </ImageBackground>
    );
  }
  
  // For minimal theme or themes without images
  return (
    <View style={[styles.background, { backgroundColor: selectedTheme.backgroundColor }]}>
      {children}
    </View>
  );
}

/*
import Background from './Background';

export default function SomeScreen() {
  return (
    <Background>
      {/* your screen layout }
      </Background>
    );
}*/