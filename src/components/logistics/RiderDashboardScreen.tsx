import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  useColorScheme,
  Switch,
} from 'react-native';

interface RiderDashboardScreenProps {
  onAcceptIncoming: () => void;
  onViewNavigation: () => void;
  onViewEarnings: () => void;
  onLogout: () => void;
}

export function RiderDashboardScreen({
  onAcceptIncoming,
  onViewNavigation,
  onViewEarnings,
  onLogout,
}: RiderDashboardScreenProps) {
  const isDark = useColorScheme() === 'dark';
  const [isOnline, setIsOnline] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#111214' : '#FFFFFF' }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandTitle}>Buildrix</Text>
          <Text style={[styles.headerSubtitle, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
            Rider Dashboard
          </Text>
        </View>
        <Pressable onPress={onLogout} style={styles.logoutButton}>
          <Text style={styles.logoutIcon}>🚪</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Online Toggle Card */}
        <View
          style={[
            styles.toggleCard,
            { backgroundColor: isOnline ? 'rgba(16, 185, 129, 0.08)' : isDark ? '#1C1D21' : '#F4F5F7' },
            { borderColor: isOnline ? '#10B981' : 'transparent', borderWidth: 1 },
          ]}
        >
          <View style={styles.toggleRow}>
            <View>
              <Text style={[styles.toggleTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
                {isOnline ? "You're Online" : "You're Offline"}
              </Text>
              <Text style={[styles.toggleDesc, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                {isOnline ? 'Ready for new delivery orders' : 'Go online to receive jobs'}
              </Text>
            </View>
            <Switch
              value={isOnline}
              onValueChange={setIsOnline}
              trackColor={{ false: '#767577', true: '#A7F3D0' }}
              thumbColor={isOnline ? '#10B981' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Today's Earnings Card */}
        <Pressable
          onPress={onViewEarnings}
          style={[styles.earningsCard, { backgroundColor: '#0B4A3A' }]}
        >
          <View style={styles.earningsHeader}>
            <Text style={styles.earningsLabel}>TODAY'S EARNINGS</Text>
            <Text style={styles.earningsDetailLink}>View Details →</Text>
          </View>
          <Text style={styles.earningsValue}>₦24,500.00</Text>

          <View style={styles.statsRow}>
            <View style={styles.statCol}>
              <Text style={styles.statVal}>17</Text>
              <Text style={styles.statLbl}>Deliveries</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCol}>
              <Text style={styles.statVal}>4.5h</Text>
              <Text style={styles.statLbl}>Hours</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCol}>
              <Text style={styles.statVal}>4.9 ★</Text>
              <Text style={styles.statLbl}>Top Rider</Text>
            </View>
          </View>
        </Pressable>

        {/* Active Deliveries */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
            ACTIVE DELIVERIES
          </Text>
          <View style={[styles.orderCard, { backgroundColor: isDark ? '#1C1D21' : '#F4F5F7' }]}>
            <View style={styles.orderHeader}>
              <View>
                <Text style={[styles.orderId, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
                  Order #EX-99201
                </Text>
                <Text style={[styles.orderTime, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                  Est. Arrival: 15 mins
                </Text>
              </View>
              <View style={styles.statusPill}>
                <Text style={styles.statusText}>Running</Text>
              </View>
            </View>
            <View style={styles.orderAddresses}>
              <View style={styles.addressLine}>
                <Text style={styles.dotPin}>🟢</Text>
                <Text style={[styles.addressText, { color: isDark ? '#FFFFFF' : '#000000' }]} numberOfLines={1}>
                  Pickup: Ikeja Logistics Hub
                </Text>
              </View>
              <View style={styles.addressLine}>
                <Text style={styles.dotPin}>🔴</Text>
                <Text style={[styles.addressText, { color: isDark ? '#FFFFFF' : '#000000' }]} numberOfLines={1}>
                  Dropoff: Victoria Island
                </Text>
              </View>
            </View>
            <Pressable onPress={onViewNavigation} style={styles.navigationButton}>
              <Text style={styles.navigationButtonText}>View Navigation</Text>
            </Pressable>
          </View>
        </View>

        {/* Pending Requests */}
        {isOnline && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                PENDING REQUESTS
              </Text>
              <Text style={styles.incomingCount}>1 New</Text>
            </View>

            <Pressable
              onPress={onAcceptIncoming}
              style={[styles.requestCard, { backgroundColor: isDark ? '#1C1D21' : '#F4F5F7' }]}
            >
              <View style={styles.requestHeader}>
                <View style={styles.requestCategory}>
                  <Text style={styles.catIcon}>🍲</Text>
                  <View>
                    <Text style={[styles.catName, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
                      Restaurant Delivery
                    </Text>
                    <Text style={[styles.catDist, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                      2.4 km away • Food Item
                    </Text>
                  </View>
                </View>
                <Text style={[styles.requestPayout, { color: '#10B981' }]}>₦2,500</Text>
              </View>
              <View style={styles.requestCTARow}>
                <View style={styles.declineBtn}>
                  <Text style={[styles.declineText, { color: isDark ? '#B0B4BA' : '#60646C' }]}>Decline</Text>
                </View>
                <View style={styles.acceptBtn}>
                  <Text style={styles.acceptText}>Accept Job</Text>
                </View>
              </View>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0B4A3A',
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutIcon: {
    fontSize: 18,
  },
  scrollContent: {
    padding: 24,
    gap: 24,
  },
  toggleCard: {
    borderRadius: 20,
    padding: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  toggleDesc: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  earningsCard: {
    borderRadius: 24,
    padding: 24,
    shadowColor: '#0B4A3A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  earningsLabel: {
    color: '#A7F3D0',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  earningsDetailLink: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  earningsValue: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statVal: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  statLbl: {
    color: '#A7F3D0',
    fontSize: 10,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  incomingCount: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '700',
  },
  orderCard: {
    borderRadius: 20,
    padding: 16,
    gap: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 16,
    fontWeight: '800',
  },
  orderTime: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  statusPill: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  statusText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '700',
  },
  orderAddresses: {
    gap: 8,
  },
  addressLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dotPin: {
    fontSize: 12,
  },
  addressText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  navigationButton: {
    backgroundColor: '#0B4A3A',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  requestCard: {
    borderRadius: 20,
    padding: 16,
    gap: 16,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  requestCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  catIcon: {
    fontSize: 28,
  },
  catName: {
    fontSize: 14,
    fontWeight: '800',
  },
  catDist: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  requestPayout: {
    fontSize: 18,
    fontWeight: '900',
  },
  requestCTARow: {
    flexDirection: 'row',
    gap: 8,
  },
  declineBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  declineText: {
    fontSize: 14,
    fontWeight: '700',
  },
  acceptBtn: {
    flex: 2,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
