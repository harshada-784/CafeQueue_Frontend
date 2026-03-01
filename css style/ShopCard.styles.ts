import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerRow: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 28,
    marginBottom: 0,
    position: 'relative'
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
  titleCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '900',
    color: '#111',
    fontFamily: 'BpmfIansui-Regular'
  },
  headerRightPlaceholder: {
    width: 36,
    height: 36
  },
  card: {
    backgroundColor: '#FF9800',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    fontFamily: 'BpmfIansui-Regular'
  },
  cardLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
    fontFamily: 'BpmfIansui-Regular'
  },
  cardContent: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    opacity: 0.9,
    fontFamily: 'BpmfIansui-Regular'
  },
  value: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'right',
    maxWidth: '60%',
    fontFamily: 'BpmfIansui-Regular'
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginVertical: 8,
  },
  cardFooter: {
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
  },
  footerText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'BpmfIansui-Regular'
  },
  footerSubtext: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.8,
    fontFamily: 'BpmfIansui-Regular'
  },
  infoContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
    marginBottom: 12,
    fontFamily: 'BpmfIansui-Regular'
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'BpmfIansui-Regular',
    marginBottom: 6,
    lineHeight: 20,
  },
});
