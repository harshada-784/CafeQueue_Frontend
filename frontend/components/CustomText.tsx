import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';

interface CustomTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  // Add any other Text props you need
  [key: string]: any;
}

export const Text = ({ children, style, ...props }: CustomTextProps) => {
  return (
    <RNText 
      style={[
        {
          fontFamily: 'BpmfIansui-Regular',
        },
        style
      ]} 
      {...props}
    >
      {children}
    </RNText>
  );
};

export const Heading = ({ children, style, ...props }: CustomTextProps) => {
  return (
    <RNText 
      style={[
        {
          fontFamily: 'BpmfIansui-Regular',
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

export const Subheading = ({ children, style, ...props }: CustomTextProps) => {
  return (
    <RNText 
      style={[
        {
          fontFamily: 'BpmfIansui-Regular',
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

export const Body = ({ children, style, ...props }: CustomTextProps) => {
  return (
    <RNText 
      style={[
        {
          fontFamily: 'BpmfIansui-Regular',
          fontWeight: '500',
        },
        style
      ]} 
      {...props}
    >
      {children}
    </RNText>
  );
};

export const Caption = ({ children, style, ...props }: CustomTextProps) => {
  return (
    <RNText 
      style={[
        {
          fontFamily: 'BpmfIansui-Regular',
          fontWeight: '400',
        },
        style
      ]} 
      {...props}
    >
      {children}
    </RNText>
  );
};
