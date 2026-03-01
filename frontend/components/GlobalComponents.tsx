import React from 'react';
import { Text as RNText, TextInput as RNTextInput, TextStyle, TextInputProps, TextProps, TouchableOpacity as RNTouchableOpacity, TouchableOpacityProps } from 'react-native';

// Global font family
const GLOBAL_FONT_FAMILY = 'BpmfIansui-Regular';

// Custom Text component with global font
export const Text = ({ children, style, ...props }: TextProps) => {
  return (
    <RNText 
      style={[
        {
          fontFamily: GLOBAL_FONT_FAMILY,
        },
        style
      ]} 
      {...props}
    >
      {children}
    </RNText>
  );
};

// Custom Title component with global font for headings
export const Title = ({ children, style, ...props }: TextProps) => {
  return (
    <RNText 
      style={[
        {
          fontFamily: GLOBAL_FONT_FAMILY,
          fontWeight: '800',
        },
        style
      ]} 
      {...props}
    >
      {children}
    </RNText>
  );
};

// Custom Heading component with global font
export const Heading = ({ children, style, ...props }: TextProps) => {
  return (
    <RNText 
      style={[
        {
          fontFamily: GLOBAL_FONT_FAMILY,
          fontWeight: '700',
        },
        style
      ]} 
      {...props}
    >
      {children}
    </RNText>
  );
};

// Custom Subheading component with global font
export const Subheading = ({ children, style, ...props }: TextProps) => {
  return (
    <RNText 
      style={[
        {
          fontFamily: GLOBAL_FONT_FAMILY,
          fontWeight: '600',
        },
        style
      ]} 
      {...props}
    >
      {children}
    </RNText>
  );
};

// Custom TextInput component with global font
export const TextInput = ({ children, style, ...props }: TextInputProps) => {
  return (
    <RNTextInput 
      style={[
        {
          fontFamily: GLOBAL_FONT_FAMILY,
        },
        style
      ]} 
      {...props}
    >
      {children}
    </RNTextInput>
  );
};

// Custom Button component with global font for buttons
export const Button = ({ children, style, ...props }: TouchableOpacityProps) => {
  return (
    <RNTouchableOpacity 
      style={style}
      {...props}
    >
      <Text style={{ fontFamily: GLOBAL_FONT_FAMILY }}>
        {children}
      </Text>
    </RNTouchableOpacity>
  );
};

// Export the global font constant for use in styles
export { GLOBAL_FONT_FAMILY };
