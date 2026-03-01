import { TextStyle } from 'react-native';

export const GlobalFonts = {
  // Primary font family
  primary: 'BpmfIansui-Regular' as const,
  
  // Font weights
  light: 'BpmfIansui-Regular' as const,
  regular: 'BpmfIansui-Regular' as const,
  medium: 'BpmfIansui-Regular' as const,
  bold: 'BpmfIansui-Regular' as const,
  extraBold: 'BpmfIansui-Regular' as const,
};

// Global text styles
export const GlobalTextStyles = {
  // Base text style with global font
  base: {
    fontFamily: GlobalFonts.primary,
  } as TextStyle,
  
  // Common text variations
  heading: {
    fontFamily: GlobalFonts.primary,
    fontWeight: '800' as const,
  } as TextStyle,
  
  subheading: {
    fontFamily: GlobalFonts.primary,
    fontWeight: '700' as const,
  } as TextStyle,
  
  body: {
    fontFamily: GlobalFonts.primary,
    fontWeight: '500' as const,
  } as TextStyle,
  
  caption: {
    fontFamily: GlobalFonts.primary,
    fontWeight: '400' as const,
  } as TextStyle,
  
  button: {
    fontFamily: GlobalFonts.primary,
    fontWeight: '600' as const,
  } as TextStyle,
};

// Helper function to apply global font to any style
export const withGlobalFont = (style: TextStyle): TextStyle => ({
  ...style,
  fontFamily: GlobalFonts.primary,
});
