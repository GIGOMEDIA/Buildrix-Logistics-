import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();

  const activeShipments = [
    { id: '1', tracker: 'BRX-9481-NGA', type: 'Express Document', destination: 'Lekki Phase 1, Lagos', status: 'In Transit', time: '15 mins away' },
    { id: '2', tracker: 'BRX-3042-NGA', type: 'Medical Supplies', destination: 'Garki Area 11, Abuja', status: 'Assigned Rider', time: 'Rider arriving' }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      
      {/* Header Banner */}
      <View style={styles.headerBanner}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcomeText}>Hello Adebayo,</Text>
            <Text style={styles.statusText}>Rider Profile Active • Level 2</Text>
          </View>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>AC</Text>
          </View>
        </View>

        {/* Card Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statColumn}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Active Trips</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statColumn}>
            <Text style={styles.statValue}>142</Text>
            <Text style={styles.statLabel}>Deliveries</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statColumn}>
            <Text style={styles.statValue}>98%</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Quick Actions Title */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        {/* Actions Grid */}
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIconBg, { backgroundColor: '#E0F2FE' }]}>
              <View style={styles.shipmentIcon} />
            </View>
            <Text style={styles.actionLabel}>New Pickup</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIconBg, { backgroundColor: '#E0F7FA' }]}>
              <View style={styles.trackIcon} />
            </View>
            <Text style={styles.actionLabel}>Track Map</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIconBg, { backgroundColor: '#FEF3C7' }]}>
              <View style={styles.historyIcon} />
            </View>
            <Text style={styles.actionLabel}>Earnings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIconBg, { backgroundColor: '#F3E8FF' }]}>
              <View style={styles.supportIcon} />
            </View>
            <Text style={styles.actionLabel}>Support</Text>
          </TouchableOpacity>
        </View>

        {/* Active Shipments Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Shipments</Text>
          <TouchableOpacity><Text style={styles.viewAllText}>View All</Text></TouchableOpacity>
        </View>

        {activeShipments.map((shipment) => (
          <View key={shipment.id} style={styles.shipmentCard}>
            <View style={styles.shipmentCardHeader}>
              <Text style={styles.trackerId}>{shipment.tracker}</Text>
              <View style={[
                styles.statusBadge, 
                shipment.status === 'In Transit' ? styles.statusTransit : styles.statusAssigned
              ]}>
                <Text style={[
                  styles.statusBadgeText,
                  shipment.status === 'In Transit' ? styles.statusTransitText : styles.statusAssignedText
                ]}>{shipment.status}</Text>
              </View>
            </View>
            
            <View style={styles.shipmentDetails}>
              <View style={styles.detailRow}>
                <View style={styles.bulletDot} />
                <Text style={styles.detailLabel}>Type: <Text style={styles.detailValue}>{shipment.type}</Text></Text>
              </View>
              <View style={styles.detailRow}>
                <View style={styles.bulletDot} />
                <Text style={styles.detailLabel}>Destination: <Text style={styles.detailValue} numberOfLines={1}>{shipment.destination}</Text></Text>
              </View>
            </View>

            <View style={styles.shipmentCardFooter}>
              <Text style={styles.etaText}>{shipment.time}</Text>
              <TouchableOpacity style={styles.trackMapButton}>
                <Text style={styles.trackMapButtonText}>Open Navigation</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Log Out Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/login')}>
          <Text style={styles.logoutButtonText}>Log Out Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerBanner: {
    backgroundColor: '#024C43',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 48,
    position: 'relative',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statusText: {
    fontSize: 12,
    color: '#A7F3D0',
    fontWeight: '600',
    marginTop: 4,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#047857',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#34D399',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 12,
    flexDirection: 'row',
    position: 'absolute',
    bottom: -32,
    left: 24,
    right: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  statColumn: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#024C43',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E5E7EB',
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#024C43',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 8,
  },
  actionItem: {
    flex: 1,
    alignItems: 'center',
  },
  actionIconBg: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#374151',
  },
  // Custom vector shapes for dashboard actions
  shipmentIcon: {
    width: 18,
    height: 14,
    borderWidth: 2,
    borderColor: '#0284C7',
    borderRadius: 2,
  },
  trackIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3,
    borderColor: '#0891B2',
  },
  historyIcon: {
    width: 16,
    height: 12,
    borderWidth: 2,
    borderColor: '#D97706',
    borderBottomWidth: 5,
  },
  supportIcon: {
    width: 14,
    height: 14,
    borderWidth: 2,
    borderColor: '#7C3AED',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#024C43',
  },
  shipmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 6,
    elevation: 2,
  },
  shipmentCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  trackerId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusTransit: {
    backgroundColor: '#E0F2FE',
  },
  statusAssigned: {
    backgroundColor: '#FEF3C7',
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  statusTransitText: {
    color: '#0369A1',
  },
  statusAssignedText: {
    color: '#B45309',
  },
  shipmentDetails: {
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bulletDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#024C43',
  },
  detailLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  detailValue: {
    color: '#1F2937',
    fontWeight: '700',
  },
  shipmentCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  etaText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  trackMapButton: {
    backgroundColor: '#024C43',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  trackMapButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  logoutButton: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DC2626',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#DC2626',
  },
});
