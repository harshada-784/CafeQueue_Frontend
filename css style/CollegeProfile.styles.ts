import { StyleSheet } from 'react-native';

export const collegeProfileStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingTop: 30, // Reduced for more content space
    paddingHorizontal: 16, // Modern padding
  },
  formTitle: {
    fontSize: 22, // Slightly smaller for modern look
    fontWeight: '800',
    color: '#5D4037',
    marginBottom: 16, // Reduced spacing
    textAlign: 'center',
  },
  profileSection: {
    backgroundColor: '#fff',
    borderRadius: 16, // Modern radius
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(192, 154, 126, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(192, 154, 126, 0.2)',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#5D4037',
    marginBottom: 4,
  },
  profileType: {
    fontSize: 14,
    color: '#8D6E63',
    fontWeight: '600',
  },
  quickStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(192, 154, 126, 0.05)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#c09a7e',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 9,
    color: '#8D6E63',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(192, 154, 126, 0.2)',
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5D4037',
    marginBottom: 16,
  },
  infoGrid: {
    gap: 12,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(192, 154, 126, 0.03)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(192, 154, 126, 0.1)',
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8D6E63',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    color: '#5D4037',
    fontWeight: '500',
  },
  actionContainer: {
    marginTop: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#28a745',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
  editButton: {
    backgroundColor: '#c09a7e',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  // Prominent Edit Button Styles
  prominentEditContainer: {
    alignItems: 'center',
    paddingBottom: 15,
  },
  prominentEditButton: {
    backgroundColor: '#604029ff',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(192, 154, 126, 0.4)',
  },
  prominentEditText: {
    color: '#fff',
    fontSize: 15,
    letterSpacing: 0.5,
  },
});
