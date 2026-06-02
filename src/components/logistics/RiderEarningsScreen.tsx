import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  useColorScheme,
} from 'react-native';

interface RiderEarningsScreenProps {
  onBack: () => void;
}

export function RiderEarningsScreen({ onBack }: RiderEarningsScreenProps) {
  const isDark = useColorScheme() === 'dark';

  const trips = [
    { id: '2TRP-889', dist: '3.6 km', duration: '18 mins', payout: '₦1,250.00', status: 'Completed' },
    { id: '2TRP-902', dist: '5.1 km', duration: '26 mins', payout: '₦2,800.00', status: 'Completed' },
    { id: '2TRP-007', dist: '1.6 km', duration: '10 mins', payout: '₦950.00', status: 'Completed' },
  ];

  const weeklyPerf = [
    { day: 'Mon', height: '40%' },
    { day: 'Tue', height: '60%' },
    { day: 'Wed', height: '80%' },
    { day: 'Thu', height: '55%' },
    { day: 'Fri', height: '90%' },
    { day: 'Sat', height: '30%' },
    { day: 'Sun', height: '70%' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#111214' : '#FFFFFF' }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={[styles.backIcon, { color: isDark ? '#FFFFFF' : '#000000' }]}>←</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
          Earnings
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <View style={[styles.balanceCard, { backgroundColor: '#0B4A3A' }]}>
          <Text style={styles.balanceLabel}>AVAILABLE BALANCE</Text>
          <Text style={styles.balanceValue}>₦142,500.00</Text>
          <Pressable style={styles.withdrawButton}>
            <Text style={styles.withdrawText}>Withdraw to Bank</Text>
          </Pressable>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: isDark ? '#1C1D21' : '#F4F5F7' }]}>
            <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>142</Text>
            <Text style={[styles.statLabelText, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
              Deliveries
            </Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: isDark ? '#1C1D21' : '#F4F5F7' }]}>
            <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>38.5h</Text>
            <Text style={[styles.statLabelText, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
              Hours Online
            </Text>
          </View>
        </View>

        {/* Net Earnings Summary */}
        <View style={[styles.netEarningsContainer, { backgroundColor: isDark ? '#1C1D21' : '#F4F5F7' }]}>
          <View style={styles.netHeader}>
            <Text style={[styles.netTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>Net Earnings</Text>
            <Text style={styles.netValue}>₦458,200.00</Text>
          </View>
        </View>

        {/* Weekly Performance Bar Chart */}
        <View style={[styles.chartSection, { backgroundColor: isDark ? '#1C1D21' : '#F4F5F7' }]}>
          <Text style={[styles.chartTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
            Weekly Performance
          </Text>
          <Text style={[styles.chartSub, { color: isDark ? '#60646C' : '#9095A0' }]}>Oct 15 - Oct 21</Text>
          
          <View style={styles.chartBarsContainer}>
            {weeklyPerf.map((p, idx) => (
              <View key={idx} style={styles.barCol}>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { height: p.height as any }]} />
                </View>
                <Text style={[styles.barLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                  {p.day}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Trips */}
        <View style={styles.tripsSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
              RECENT TRIPS
            </Text>
            <Text style={styles.viewAllText}>View All</Text>
          </View>

          <View style={styles.tripsList}>
            {trips.map((t, idx) => (
              <View
                key={idx}
                style={[
                  styles.tripRow,
                  { backgroundColor: isDark ? '#1C1D21' : '#F4F5F7' },
                ]}
              >
                <View style={styles.tripLeft}>
                  <View style={styles.tripIconBox}>
                    <Text style={styles.tripIcon}>🏍️</Text>
                  </View>
                  <View>
                    <Text style={[styles.tripId, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
                      {t.id}
                    </Text>
                    <Text style={[styles.tripMeta, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                      {t.dist} • {t.duration}
                    </Text>
                  </View>
                </View>
                <View style={styles.tripRight}>
                  <Text style={[styles.tripPayout, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
                    {t.payout}
                  </Text>
                  <Text style={styles.tripStatus}>{t.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backIcon: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 24,
    gap: 24,
  },
  balanceCard: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#0B4A3A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  balanceLabel: {
    color: '#A7F3D0',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  balanceValue: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
  },
  withdrawButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 8,
  },
  withdrawText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statBox: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
  },
  statLabelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  netEarningsContainer: {
    borderRadius: 20,
    padding: 16,
  },
  netHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  netTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  netValue: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '800',
  },
  chartSection: {
    borderRadius: 20,
    padding: 16,
    gap: 4,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  chartSub: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 16,
  },
  chartBarsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingTop: 10,
  },
  barCol: {
    alignItems: 'center',
    gap: 8,
  },
  barTrack: {
    width: 12,
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 6,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    backgroundColor: '#10B981',
    borderRadius: 6,
  },
  barLabel: {
    fontSize: 10,
    fontWeight: '700',
  },
  tripsSection: {
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
  viewAllText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '700',
  },
  tripsList: {
    gap: 12,
  },
  tripRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
  },
  tripLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tripIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(10, 74, 58, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripIcon: {
    fontSize: 20,
  },
  tripId: {
    fontSize: 14,
    fontWeight: '800',
  },
  tripMeta: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  tripRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  tripPayout: {
    fontSize: 14,
    fontWeight: '800',
  },
  tripStatus: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '700',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
});
