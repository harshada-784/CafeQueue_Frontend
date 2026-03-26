import { StyleSheet } from 'react-native';

export const shopManagementStyles = StyleSheet.create({
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
    paddingTop: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  backIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  headerRightPlaceholder: {
    width: 80,
  },
  profileSection: {
    backgroundColor: '#fff',
    borderRadius: 16, // More modern radius
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(192, 154, 126, 0.15)', // Theme color border
    shadowColor: '#000',
    shadowOpacity: 0.06, // More subtle shadow
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  addButton: {
    backgroundColor: '#5D4037', // Theme color
    paddingVertical: 16,
    borderRadius: 16, // Modern radius
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#c09a7e',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(192, 154, 126, 0.3)',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  // Stats Section
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(192, 154, 126, 0.15)',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '900',
    color: '#c09a7e',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8D6E63',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(192, 154, 126, 0.1)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5D4037',
  },
  shopCount: {
    fontSize: 14,
    color: '#c09a7e',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#c09a7e',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  shopList: {
    gap: 16, // Modern spacing
    marginBottom: 16,
  },
  shopItem: {
    backgroundColor: '#fff',
    borderRadius: 16, // Modern radius
    padding: 20, // More padding
    borderWidth: 1,
    borderColor: 'rgba(192, 154, 126, 0.15)', // Theme color border
    shadowColor: '#000',
    shadowOpacity: 0.06, // More subtle shadow
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  shopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  shopName: {
    fontSize: 18, // Larger for emphasis
    fontWeight: '800',
    color: '#5D4037',
    flex: 1,
  },
  shopStatus: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12, // More modern
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusOpen: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
  statusClosed: {
    backgroundColor: '#F44336',
    color: '#fff',
  },
  statusBadge: {
    width: 8, // Small circle like tick
    height: 8,
    borderRadius: 4, // Makes it circular
    // No padding for small size
    // No text, just color indicator
  },
  shopInfo: {
    marginBottom: 16, // More space before actions
  },
  shopDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    lineHeight: 20,
  },
  shopId: {
    fontSize: 12,
    color: '#c09a7e',
    fontWeight: '700',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(192, 154, 126, 0.1)',
  },
  shopActions: {
    flexDirection: 'row',
    gap: 6, // Balanced spacing
    marginTop: 12, // Proper spacing from content
    alignItems: 'stretch', // Make all buttons same height
  },
  editButton: {
    backgroundColor: '#c09a7e', // Theme color
    paddingVertical: 10, // Consistent vertical padding
    paddingHorizontal: 8, // Consistent horizontal padding
    borderRadius: 8,
    shadowColor: '#c09a7e',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    flex: 1, // Equal width distribution
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36, // Minimum height for consistency
  },
  closeButton: {
    backgroundColor: '#FF9800', // Orange for close
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    shadowColor: '#FF9800',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
  },
  openButton: {
    backgroundColor: '#4CAF50', // Green for open
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    shadowColor: '#4CAF50',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    shadowColor: '#F44336',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  deactivateButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  openButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  actionContainer: {
    marginTop: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  // Remove duplicate addButton - already defined above
  // Remove duplicate addButtonText - already defined above
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'e0e0e0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fafafa',
    color: '#333',
    fontWeight: '500',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 6,
  },
  inputGroup: {
    marginBottom: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60, // More padding
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(192, 154, 126, 0.15)',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#8D6E63',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '500',
  },
});
