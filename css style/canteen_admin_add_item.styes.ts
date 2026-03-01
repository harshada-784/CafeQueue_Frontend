import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, paddingHorizontal: 24, alignItems: 'center' },
  topBar: { width: '100%', height: 32, justifyContent: 'center', marginBottom: 8 },
  backButton: { paddingHorizontal: 4, paddingVertical: 2 },
  backIcon: { fontSize: 22, fontWeight: '700', color: '#111' },
  title: { fontSize: 26, fontWeight: '800', color: '#111', textAlign: 'center', marginBottom: 50, marginTop: 120 },
  input: { width: '100%', height: 54, borderWidth: 1, borderColor: '#ddd', borderRadius: 12, paddingHorizontal: 14, backgroundColor: 'rgba(255,255,255,0.95)', marginBottom: 14 },
  previewWrap: { width: '100%', alignItems: 'center', marginBottom: 14 },
  preview: { width: '100%', height: 140, borderRadius: 12, backgroundColor: '#f3f3f3' },
  button: { width: '100%', height: 52, borderRadius: 10, backgroundColor: '#4CAF50', alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  buttonText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
