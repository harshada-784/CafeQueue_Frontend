import React, { createContext, useContext } from 'react';
import { TextStyle } from 'react-native';

interface FontContextType {
  fontFamily: string;
  textStyles: {
    heading: TextStyle;
    subheading: TextStyle;
    body: TextStyle;
    caption: TextStyle;
    button: TextStyle;
  };
}

const FontContext = createContext<FontContextType>({
  fontFamily: 'BpmfIansui-Regular',
  textStyles: {
    heading: {
      fontFamily: 'BpmfIansui-Regular',
      fontWeight: '800',
    },
    subheading: {
      fontFamily: 'BpmfIansui-Regular',
      fontWeight: '700',
    },
    body: {
      fontFamily: 'BpmfIansui-Regular',
      fontWeight: '500',
    },
    caption: {
      fontFamily: 'BpmfIansui-Regular',
      fontWeight: '400',
    },
    button: {
      fontFamily: 'BpmfIansui-Regular',
      fontWeight: '600',
    },
  },
});

export const FontProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const fontContext: FontContextType = {
    fontFamily: 'BpmfIansui-Regular',
    textStyles: {
      heading: {
        fontFamily: 'BpmfIansui-Regular',
        fontWeight: '800',
      },
      subheading: {
        fontFamily: 'BpmfIansui-Regular',
        fontWeight: '700',
      },
      body: {
        fontFamily: 'BpmfIansui-Regular',
        fontWeight: '500',
      },
      caption: {
        fontFamily: 'BpmfIansui-Regular',
        fontWeight: '400',
      },
      button: {
        fontFamily: 'BpmfIansui-Regular',
        fontWeight: '600',
      },
    },
  };

  return (
    <FontContext.Provider value={fontContext}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
};
