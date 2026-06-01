import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Commented out map imports to prevent build crashes
// import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function DispatchScreen() {
  const router = useRouter();
  const [selectedVehicle, setSelectedVehicle] = useState('bike');
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Commented out map configurations for the route
  /*
  const routeCoordinates = [
    { latitude: 6.4281, longitude: 3.4219 }, // Example pickup location
    { latitude: 6.4450, longitude: 3.4320 }, // Example dropoff location
  ];
  */

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapBackground}
        initialRegion={{
          latitude: 6.4350,
          longitude: 3.4250,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}
        showsUserLocation={true}
      >
        <Polyline coordinates={routeCoordinates} strokeWidth={4} strokeColor="#024C43" />
      </MapView>
      */}

      <View style={[styles.mapBackground, { backgroundColor: '#E8F0FE', justifyContent: 'center', alignItems: 'center' }]}>
        <Ionicons name="map-outline" size={40} color="#024C43" opacity={0.3} />
        <Text style={{ color: '#024C43', opacity: 0.5, fontWeight: '600', marginTop: 4 }}>[Map Preview Layer Disabled]</Text>
      </View>

      <SafeAreaView style={styles.headerOverlay} edges={['top']}>
        <View style={styles.topMenuBar}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={24} color="#024C43" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Buildrix Dispatch</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color="#024C43" />
          </TouchableOpacity>
        </View>

        <View style={styles.etaBadge}>
          <Text style={styles.etaLabel}>ESTIMATED ARRIVAL</Text>
          <Text style={styles.etaTime}>12 - 18 mins</Text>
        </View>
      </SafeAreaView>

      <View style={styles.bottomSheetCard}>
        <View style={styles.dragIndicator} />

        {/* Header Info */}
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>Fare Estimation</Text>
          <View style={styles.distanceBadge}>
            <Ionicons name="location-sharp" size={14} color="#024C43" style={{ marginRight: 4 }} />
            <Text style={styles.distanceText}>8.4 km</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.vehicleList}>
          
          <TouchableOpacity 
            style={[styles.vehicleCard, selectedVehicle === 'bike' && styles.selectedVehicleCard]} 
            onPress={() => setSelectedVehicle('bike')}
          >
            <View style={[styles.vehicleIconWrapper, { backgroundColor: '#62F7B5' }]}>
              <Ionicons name="bicycle-outline" size={24} color="#013220" />
            </View>
            <View style={styles.vehicleDetails}>
              <View style={styles.vehicleTitleRow}>
                <Text style={styles.vehicleName}>Bike</Text>
                <Text style={styles.vehiclePrice}>₦1,250</Text>
              </View>
              <View style={styles.tagRow}>
                <View style={styles.bestValueTag}>
                  <Text style={styles.bestValueText}>BEST VALUE</Text>
                </View>
              </View>
              <Text style={styles.vehicleDescription}>Light parcels & documents</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.vehicleCard, selectedVehicle === 'large_bike' && styles.selectedVehicleCard]} 
            onPress={() => setSelectedVehicle('large_bike')}
          >
            <View style={styles.vehicleIconWrapper}>
              <Ionicons name="bicycle" size={24} color="#555" />
            </View>
            <View style={styles.vehicleDetails}>
              <View style={styles.vehicleTitleRow}>
                <Text style={styles.vehicleName}>Large Bike</Text>
                <Text style={styles.vehiclePrice}>₦2,100</Text>
              </View>
              <Text style={styles.vehicleSubtext}>Heavy Load</Text>
              <Text style={styles.vehicleDescription}>Large boxes up to 15kg</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.vehicleCard, selectedVehicle === 'van' && styles.selectedVehicleCard]} 
            onPress={() => setSelectedVehicle('van')}
          >
            <View style={styles.vehicleIconWrapper}>
              <Ionicons name="bus-outline" size={24} color="#555" />
            </View>
            <View style={styles.vehicleDetails}>
              <View style={styles.vehicleTitleRow}>
                <Text style={styles.vehicleName}>Small Van</Text>
                <Text style={styles.vehiclePrice}>₦4,500</Text>
              </View>
              <Text style={styles.vehicleSubtext}>Bulk Delivery</Text>
              <Text style={styles.vehicleDescription}>Multi-drop or fragile furniture</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.paymentSectionTitle}>PAYMENT METHOD</Text>
        <View style={styles.paymentRow}>
          <TouchableOpacity 
            style={[styles.paymentMethodButton, paymentMethod === 'card' && styles.selectedPaymentMethod]}
            onPress={() => setPaymentMethod('card')}
          >
            <Ionicons name="card-outline" size={18} color="#024C43" style={{ marginRight: 8 }} />
            <Text style={styles.paymentMethodText}>Card</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.paymentMethodButton, paymentMethod === 'wallet' && styles.selectedPayment]}
            onPress={() => setPaymentMethod('wallet')}
          >
            <Ionicons name="wallet-outline" size={18} color="#024C43" style={{ marginRight: 8 }} />
            <Text style={styles.paymentMethodText}>Wallet</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.primaryActionButton}>
          <View style={styles.buttonInner}>
            <Text style={styles.primaryButtonText}>Confirm Delivery</Text>
            <Ionicons name="chevron-forward" size={16} color="#FFFFFF" style={styles.btnIconRight} />
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
  mapBackground: {
    width: width,
    height: height * 0.40,
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#024C43',
  },
  iconButton: {
    padding: 6,
  },
  etaBadge: {
    position: 'absolute',
    top: height * 0.14,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  etaLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  etaTime: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937',
  },
  bottomSheetCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: height * 0.34,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 10,
  },
  dragIndicator: {
    width: 38,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#024C43',
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  vehicleList: {
    gap: 12,
    paddingBottom: 12,
  },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#F3F4F6',
  },
  selectedVehicleCard: {
    borderColor: '#024C43',
    backgroundColor: '#FAFDFB',
  },
  vehicleIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  vehicleDetails: {
    flex: 1,
  },
  vehicleTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  vehiclePrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937',
  },
  tagRow: {
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 4,
  },
  bestValueTag: {
    backgroundColor: '#024C43',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  bestValueText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  vehicleSubtext: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
    marginTop: 1,
  },
  vehicleDescription: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginTop: 2,
  },
  paymentSectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#4B5563',
    letterSpacing: 0.6,
    marginTop: 14,
    marginBottom: 10,
  },
  paymentRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  paymentMethodButton: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  selectedPaymentMethod: {
    borderColor: '#024C43',
    backgroundColor: '#FAFDFB',
  },
  paymentMethodText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  primaryActionButton: {
    backgroundColor: '#024C43',
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  btnIconRight: {
    marginLeft: 6,
  },
});