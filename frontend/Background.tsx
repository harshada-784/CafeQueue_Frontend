import React, { PropsWithChildren } from 'react';
import { ImageBackground } from 'react-native';
import { styles } from '../css style/Background.styles';

export default function Background({ children }: PropsWithChildren) {
  return (
    <ImageBackground
      source={require('./assets/coffeebeans.png')}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      {children}
    </ImageBackground>
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