import { StyleSheet } from 'react-native';

export const mainLayoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  pageContent: {
    flex: 1,
    marginTop: 80, // Reduced space for floating header only
    paddingHorizontal: 20,
  },
  scrollableContent: {
    flex: 1,
  },
  greetingSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  greetingTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#5D4037',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'BpmfIansui-Regular',
  },
  greetingSubtitle: {
    fontSize: 16,
    color: '#8D6E63',
    fontFamily: 'BpmfIansui-Regular',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5D4037',
    marginBottom: 16,
    fontFamily: 'BpmfIansui-Regular',
  },
});
