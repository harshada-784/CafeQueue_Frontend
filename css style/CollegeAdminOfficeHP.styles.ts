import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
    marginTop: 80, // Space for floating header
  },
  scrollableContent: {
    flex: 1,
    paddingHorizontal: 18,
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profilePic: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  greetingWrap: {
    flexDirection: 'column',
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#111',
    fontWeight: '600',
    fontFamily: 'BpmfIansui-Regular'
  },
  collegeName: {
    fontSize: 18,
    color: '#111',
    fontWeight: '800',
    fontFamily: 'BpmfIansui-Regular'
  },
  backButton: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    zIndex: 2
  },
  backIcon: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
    fontFamily: 'BpmfIansui-Regular'
  },
  headerRightPlaceholder: {
    width: 36,
    height: 36
  },
  profileMenu: {
    position: 'absolute',
    top: 44,
    left: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    paddingVertical: 6,
    minWidth: 140,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    zIndex: 3000,
  },
  profileMenuItem: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  profileMenuText: {
    fontSize: 16,
    color: '#111',
    fontWeight: '600',
    fontFamily: 'BpmfIansui-Regular'
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2000,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'BpmfIansui-Regular'
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'BpmfIansui-Regular'
  },
  tilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 20,
    columnGap: 20,
  },
  tile: {
    width: '46%',
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#c09a7e',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#c09a7e',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    padding: 10,
  },
  tileIconImage: {
    width: 72,
    height: 72,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c09a7e',
    borderRadius: 36,
  },
  tileImageContent: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  tileLabel: {
    fontSize: 18,
    color: '#5D4037',
    fontWeight: '700',
    textAlign: 'center',
  },
});
