import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Commented out map imports to prevent build crashes
// import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function PlanRouteScreen() {
  const router = useRouter();
  const [pickup, setPickup] = useState('32 Lekki Phase 1, Lagos');
  const [dropoff, setDropoff] = useState('');
  const [selectedRecentId, setSelectedRecentId] = useState('recent_1'); 

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      {/* Top Header Navigation Panel */}
      <SafeAreaView style={styles.headerContainer} edges={['top']}>
        <View style={styles.topMenuBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={24} color="#024C43" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Plan Route</Text>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={22} color="#024C43" />
          </TouchableOpacity>
        </View>

        <View style={styles.routeInputsCard}>
          
          <View style={styles.timelineConnectorContainer}>
            <View style={styles.pickupDot} />
            <View style={styles.dashedLine} />
            <Ionicons name="location-sharp" size={16} color="#DC2626" style={styles.dropoffMarkerIcon} />
          </View>

          <View style={styles.inputFormBody}>
            
            <View style={styles.inputBoxContainer}>
              <Text style={styles.inputLabel}>Pickup Location</Text>
              <TextInput
                style={styles.textInputField}
                value={pickup}
                onChangeText={setPickup}
                placeholder="Enter pickup address"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputBoxContainer}>
              <Text style={styles.inputLabel}>Drop-off Location</Text>
              <TextInput
                style={styles.textInputField}
                value={dropoff}
                onChangeText={setDropoff}
                placeholder="Enter destination address"
                placeholderTextColor="#9CA3AF"
                autoFocus={true}
              />
            </View>

          </View>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeadingTitle}>Recent Destinations</Text>
          <TouchableOpacity>
            <Text style={styles.clearAllButtonText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentItemsContainer}>
          
          <TouchableOpacity 
            style={styles.recentItemRow}
            onPress={() => setSelectedRecentId('recent_1')}
          >
            <View style={[
              styles.recentIconWrapper, 
              selectedRecentId === 'recent_1' ? { backgroundColor: '#62F7B5' } : { backgroundColor: '#E5E7EB' }
            ]}>
              <Ionicons 
                name="time-outline" 
                size={20} 
                color={selectedRecentId === 'recent_1' ? '#013220' : '#4B5563'} 
              />
            </View>
            <View style={styles.recentItemDetails}>
              <Text style={styles.recentPlaceName}>Shoprite, Circle Mall</Text>
              <Text style={styles.recentPlaceAddress} numberOfLines={1}>Jakande Roundabout, Lekki, Lagos</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.recentItemRow}
            onPress={() => setSelectedRecentId('recent_2')}
          >
            <View style={[
              styles.recentIconWrapper, 
              selectedRecentId === 'recent_2' ? { backgroundColor: '#62F7B5' } : { backgroundColor: '#E5E7EB' }
            ]}>
              <Ionicons 
                name="briefcase-outline" 
                size={20} 
                color={selectedRecentId === 'recent_2' ? '#013220' : '#4B5563'} 
              />
            </View>
            <View style={styles.recentItemDetails}>
              <Text style={styles.recentPlaceName}>Co-creation Hub (CcHUB)</Text>
              <Text style={styles.recentPlaceAddress} numberOfLines={1}>6th Floor, 294 Herbert Macaulay Way, Yaba</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.recentItemRow}
            onPress={() => setSelectedRecentId('recent_3')}
          >
            <View style={[
              styles.recentIconWrapper, 
              selectedRecentId === 'recent_3' ? { backgroundColor: '#62F7B5' } : { backgroundColor: '#E5E7EB' }
            ]}>
              <Ionicons 
                name="home-outline" 
                size={20} 
                color={selectedRecentId === 'recent_3' ? '#013220' : '#4B5563'} 
              />
            </View>
            <View style={styles.recentItemDetails}>
              <Text style={styles.recentPlaceName}>Victoria Island Office</Text>
              <Text style={styles.recentPlaceAddress} numberOfLines={1}>Adeola Odeku St, Lagos</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={styles.miniMapPreviewCard}>
          <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#1C313A', justifyContent: 'center', alignItems: 'center' }]}>
            <Ionicons name="navigate" size={32} color="#62F7B5" opacity={0.4} />
            <Text style={{ color: '#FFFFFF', opacity: 0.4, fontSize: 11, fontWeight: '600', marginTop: 6 }}>Map Preview Layer Disabled</Text>
          </View>

          <View style={styles.mapMetricsFloatingPanel}>
            <View style={styles.badgeRow}>
              <View style={styles.fastestRouteBadge}>
                <Text style={styles.fastestRouteBadgeText}>FASTEST ROUTE</Text>
              </View>
              <Text style={styles.etaText}>18 min</Text>
            </View>
            <Text style={styles.routeDescriptionSummaryText}>
              12.4 km via Third Mainland Bridge
            </Text>
          </View>

          <View style={styles.mockMapControlsCluster}>
            <TouchableOpacity style={styles.mockControlCircle}>
              <Ionicons name="locate" size={16} color="#024C43" />
            </TouchableOpacity>
            <View style={styles.mockZoomButtonGroup}>
              <TouchableOpacity style={styles.mockZoomHalfButton}>
                <Ionicons name="add" size={16} color="#4B5563" />
              </TouchableOpacity>
              <View style={styles.controlDividerLine} />
              <TouchableOpacity style={styles.mockZoomHalfButton}>
                <Ionicons name="remove" size={16} color="#4B5563" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomCallToActionContainer}>
        <TouchableOpacity 
          style={styles.primaryActionButton}
          onPress={() => router.push('')}
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 22,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 3,
  },
  topMenuBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 20,
    position: 'relative',
  },
  backButton: {
    paddingVertical: 6,
    paddingRight: 12, 
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#024C43',
  },
  notificationButton: {
    position: 'absolute',
    right: 0,
    padding: 6,
  },
  routeInputsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 16, 
  },
  timelineConnectorContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24, 
    marginRight: 12,
    width: 20,
  },
  pickupDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 3,
    borderColor: '#024C43',
    backgroundColor: '#FFFFFF',
  },
  dashedLine: {
    flex: 1,
    width: 1.5,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
  dropoffMarkerIcon: {
    marginTop: 2,
  },
  inputFormBody: {
    flex: 1,
    gap: 12, 
  },
  inputBoxContainer: {
    backgroundColor: '#F9FAFB', 
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    marginBottom: 2, 
  },
  textInputField: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    padding: 0,
    height: 24,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionHeadingTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#024C43',
  },
  clearAllButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  recentItemsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  recentItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  recentIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  recentItemDetails: {
    flex: 1,
  },
  recentPlaceName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  recentPlaceAddress: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  miniMapPreviewCard: {
    height: 240,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 36,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  mapMetricsFloatingPanel: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  fastestRouteBadge: {
    backgroundColor: '#62F7B5',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  fastestRouteBadgeText: {
    color: '#013220',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  etaText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1F2937',
  },
  routeDescriptionSummaryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  mockMapControlsCluster: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    gap: 8,
    alignItems: 'center',
  },
  mockControlCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  mockZoomButtonGroup: {
    width: 36,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    overflow: 'hidden',
  },
  mockZoomHalfButton: {
    width: 36,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlDividerLine: {
    width: 20,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  bottomCallToActionContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderColor: '#F3F4F6',
  },
  primaryActionButton: {
    backgroundColor: '#024C43',
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});