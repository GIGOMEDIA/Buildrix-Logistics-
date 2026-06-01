import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  const initialRegion = {
    latitude: 6.4281,
    longitude: 3.4219,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const mapStyle = [
    { "elementType": "geometry", "stylers": [{ "color": "#212a37" }] },
    { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] },
    { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
    { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#304a7d" }] },
    { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#1f2835" }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#17263c" }] }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* Map Background View */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        customMapStyle={mapStyle}
        showsUserLocation={true}
      />

      {/* Dynamic Header Overlay Container */}
      <SafeAreaView style={styles.headerOverlay} edges={['top']}>
        <View style={styles.topMenuBar}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="menu-outline" size={26} color="#024C43" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#024C43" />
          </TouchableOpacity>
        </View>

        <View style={styles.brandTitleContainer}>
          <Text style={styles.brandTitleText}>Buildrix</Text>
          <Text style={styles.brandSubtitleText}>Dispatch</Text>
        </View>

        {/* Floating Custom Search Bar */}
        <View style={styles.searchBarContainer}>
          <Ionicons name="search-outline" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput 
            placeholder="Where to?" 
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
            editable={true}
          />
          <TouchableOpacity style={styles.historyButton}>
            <Ionicons name="time-outline" size={20} color="#374151" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Slide-Up Bottom Sheet Destination Card Container */}
      <View style={styles.bottomSheetCard}>
        <View style={styles.dragIndicator} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Destinations</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Location Items */}
        <View style={styles.destinationList}>
          {/* Home Destination Item */}
          <TouchableOpacity style={styles.destinationItem}>
            <View style={styles.iconWrapper}>
              <Ionicons name="home-outline" size={20} color="#024C43" />
            </View>
            <View style={styles.destinationDetails}>
              <Text style={styles.destinationName}>Home</Text>
              <Text style={styles.destinationAddress} numberOfLines={1}>
                12, Admiralty Way, Lekki Phase 1
              </Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={16} color="#E5E7EB" />
          </TouchableOpacity>

          {/* Office Destination Item */}
          <TouchableOpacity style={styles.destinationItem}>
            <View style={styles.iconWrapper}>
              <Ionicons name="briefcase-outline" size={20} color="#024C43" />
            </View>
            <View style={styles.destinationDetails}>
              <Text style={styles.destinationName}>Office</Text>
              <Text style={styles.destinationAddress} numberOfLines={1}>
                Central Business District, Alausa
              </Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={16} color="#E5E7EB" />
          </TouchableOpacity>
        </View>

        {/* Primary Call To Action Callout Action Button */}
        <TouchableOpacity 
          style={styles.primaryActionButton}
          onPress={() => router.push('/dashboard')} 
        >
          <View style={styles.buttonInner}>
            <Ionicons name="add-circle" size={22} color="#FFFFFF" style={styles.btnIcon} />
            <Text style={styles.primaryButtonText}>New Delivery</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  map: {
    width: width,
    height: height * 0.65,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  topMenuBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  iconButton: {
    padding: 6,
  },
  brandTitleContainer: {
    marginTop: 4,
    paddingLeft: 6,
  },
  brandTitleText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#024C43',
    lineHeight: 32,
  },
  brandSubtitleText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#024C43',
    lineHeight: 32,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    marginTop: 20,
    paddingHorizontal: 16,
    height: 54,
    shadowColor: '#000',
    shadowOffset: { 
        width: 0, 
        height: 10 
      },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  historyButton: {
    padding: 4,
  },
  bottomSheetCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 34, 
    shadowColor: '#000',
    shadowOffset: { 
        width: 0, 
        height: -10 
      },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 10,
  },
  dragIndicator: {
    width: 38,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#024C43',
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#024C43',
  },
  destinationList: {
    gap: 16,
    marginBottom: 28,
  },
  destinationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  destinationDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  destinationName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  destinationAddress: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    width: width * 0.65,
  },
  primaryActionButton: {
    backgroundColor: '#013220', 
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#013220',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnIcon: {
    marginRight: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});