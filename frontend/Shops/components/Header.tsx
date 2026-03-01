import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text } from '../../components/GlobalComponents';

interface HeaderProps {
  displayName: string;
  showProfileMenu: boolean;
  setShowProfileMenu: (show: boolean) => void;
  setLogout: (logout: boolean) => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export default function Header({ displayName, showProfileMenu, setShowProfileMenu, setLogout, activeTab, setActiveTab }: HeaderProps) {
  const [showOffers, setShowOffers] = React.useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = React.useState(0);
  
  const banners = [
    {
      id: 1,
      badge: 'LIMITED OFFER',
      title: 'Analytics Pro',
      tagline: 'Boost Your Canteen Business',
      footer: ['Start Today', '50% OFF', '₹149/month'],
      image: require('../../assets/graphbanner.png')
    },
    {
      id: 2,
      badge: 'NEW FEATURE',
      title: 'Smart Menu',
      tagline: 'AI-Powered Menu Optimization',
      footer: ['Try Now', '30% OFF', '₹99/month'],
      image: require('../../assets/menu_image.png')
    }
  ];

  const handleOfferPress = (offerType: string) => {
    switch(offerType) {
      case 'analytics':
        console.log('Analytics subscription selected');
        break;
      case 'premium':
        console.log('Premium features selected');
        break;
      case 'marketing':
        console.log('Marketing tools selected');
        break;
    }
    setShowOffers(false);
  };

  const handleBannerScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / Dimensions.get('window').width * 0.95);
    setCurrentBannerIndex(index);
  };

  return (
    <>
      {/* Main Header Container */}
      <View style={styles.headerContainer}>
        {/* Large Promotional Poster Banner */}
        <View style={styles.promotionalPosterBanner}>
          {/* Background Image */}
          <Image
            source={require('../../assets/coffeebeans.png')}
            style={styles.backgroundImage}
          />
          
          {/* User Info - Top Section */}
          <View style={styles.posterTopSection}>
            <TouchableOpacity onPress={() => setShowProfileMenu(!showProfileMenu)} activeOpacity={0.8}>
              <Image
                source={require('../../assets/profile-icon.png')}
                style={styles.userProfilePic}
              />
            </TouchableOpacity>
            <View style={styles.userTextContainer}>
              <Text style={styles.greetingText}>Good Afternoon</Text>
              <Text style={styles.userName}>{displayName}</Text>
            </View>
          </View>

          {/* Swipeable Banners */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onMomentumScrollEnd={handleBannerScroll}
            style={styles.bannerScrollView}
            contentContainerStyle={styles.bannerScrollContent}
          >
            {banners.map((banner) => (
              <View key={banner.id} style={styles.promotionalBannerCard}>
                <Image
                  source={banner.image}
                  style={styles.promotionalBannerImage}
                />
                <View style={styles.promotionalBannerOverlay}>
                  <View style={styles.promotionalBadge}>
                    <Text style={styles.promotionalBadgeText}>{banner.badge}</Text>
                  </View>
                  <Text style={styles.promotionalCafeName}>{banner.title}</Text>
                  <Text style={styles.promotionalTagline}>{banner.tagline}</Text>
                  <View style={styles.promotionalFooter}>
                    <Text style={styles.promotionalEstDate}>{banner.footer[0]}</Text>
                    <View style={styles.springSeasonBadge}>
                      <Text style={styles.springSeasonText}>{banner.footer[1]}</Text>
                    </View>
                    <Text style={styles.promotionalNatural}>{banner.footer[2]}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          
          {/* Banner Indicators */}
          <View style={styles.bannerIndicators}>
            {banners.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentBannerIndex === index && styles.activeIndicator
                ]}
              />
            ))}
          </View>

        </View>

      </View>

      {/* Profile Menu */}
      {showProfileMenu && (
        <>
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={() => setShowProfileMenu(false)}
          />
          <View style={styles.profileMenu}>
            <TouchableOpacity style={styles.profileMenuItem} onPress={() => setLogout(true)}>
              <Text style={styles.profileMenuText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 10,

  },
  // Large Promotional Poster Banner
  promotionalPosterBanner: {
    backgroundColor: '#c09a7eff',
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  // Background Image
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  // Poster Top Section
  posterTopSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 25,
    position: 'relative',
    zIndex: 2,
  },
  userProfilePic: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginLeft: 15,
  },
  userTextContainer: {
    flex: 1,
  },
  greetingText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  // Promotional Banner Card
  promotionalBannerCard: {
    width: Dimensions.get('window').width * 0.95,
    height: 170,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 10,
    marginRight: 10,
  },
  bannerScrollView: {
    marginBottom: 8,
  },
  bannerScrollContent: {
    paddingHorizontal: 10,
  },
  bannerIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#FF6B35',
    width: 20,
  },
  promotionalBannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    opacity: 0.2,
  },
  promotionalBannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  promotionalBadge: {
    backgroundColor: '#521601',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  promotionalBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '100',
  },
  promotionalCafeName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  promotionalTagline: {
    fontSize: 13,
    color: '#fff',
    marginBottom: 16,
  },
  promotionalDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  promotionalDetailItem: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  promotionalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promotionalEstDate: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  promotionalNatural: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
    backgroundColor: 'rgba(76,175,80,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  springSeasonBadge: {
    backgroundColor: '#8BC34A',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  springSeasonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  // Carousel Dots
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 20,
  },
  // Profile Menu
  profileMenu: {
    position: 'absolute',
    top: 34,
    left: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    paddingVertical: 6,
    minWidth: 140,
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
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2000,
  },
});
