import React from 'react';
import { StyleSheet, View, Text, Pressable, useColorScheme, ScrollView } from 'react-native';

interface RiderSuccessScreenProps {
  onFinish: () => void;
}

export function RiderSuccessScreen({ onFinish }: RiderSuccessScreenProps) {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#111214' : '#FFFFFF' }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Success Icon & Heading */}
        <View style={styles.successHeader}>
          <View style={styles.iconCircle}>
            <Text style={styles.checkIcon}>✓</Text>
          </View>
          <Text style={[styles.successTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
            Delivery Successful!
          </Text>
          <Text style={[styles.successDesc, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
            Good job! The package was successfully handed over.
          </Text>
        </View>

        {/* Customer & Status Summary */}
        <View style={[styles.infoCard, { backgroundColor: isDark ? '#1C1D21' : '#F4F5F7' }]}>
          <View style={styles.infoRow}>
            <View>
              <Text style={[styles.infoLabel, { color: isDark ? '#60646C' : '#9095A0' }]}>CUSTOMER</Text>
              <Text style={[styles.infoValue, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
                Chidi Okechukwu
              </Text>
            </View>
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>Completed</Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]} />

          <View style={styles.metricsGrid}>
            <View style={styles.metricCol}>
              <Text style={[styles.metricLabel, { color: isDark ? '#60646C' : '#9095A0' }]}>FARE EARNED</Text>
              <Text style={[styles.metricValue, { color: '#10B981' }]}>₦2,400.00</Text>
            </View>
            <View style={styles.metricCol}>
              <Text style={[styles.metricLabel, { color: isDark ? '#60646C' : '#9095A0' }]}>EST. TIP</Text>
              <Text style={[styles.metricValue, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>Pending</Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]} />

          <View style={styles.metricsGrid}>
            <View style={styles.metricCol}>
              <Text style={[styles.metricLabel, { color: isDark ? '#60646C' : '#9095A0' }]}>TRIP DURATION</Text>
              <Text style={[styles.metricValue, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>31 mins</Text>
            </View>
            <View style={styles.metricCol}>
              <Text style={[styles.metricLabel, { color: isDark ? '#60646C' : '#9095A0' }]}>DISTANCE COVERED</Text>
              <Text style={[styles.metricValue, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>8.2 km</Text>
            </View>
          </View>
        </View>

        {/* Buttons CTA */}
        <View style={styles.btnCol}>
          <Pressable onPress={onFinish} style={styles.finishBtn}>
            <Text style={styles.finishText}>Back to Dashboard</Text>
          </Pressable>
          <Pressable style={[styles.detailsBtn, { borderColor: isDark ? '#2C2E35' : '#E4E6EB' }]}>
            <Text style={[styles.detailsText, { color: isDark ? '#FFFFFF' : '#60646C' }]}>
              View Trip Details
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    gap: 32,
    alignItems: 'center',
    paddingTop: 48,
  },
  successHeader: {
    alignItems: 'center',
    gap: 16,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  checkIcon: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  successDesc: {
    fontSize: 14,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 20,
    fontWeight: '500',
  },
  infoCard: {
    borderRadius: 24,
    padding: 20,
    width: '100%',
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 2,
  },
  statusPill: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  statusText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    width: '100%',
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricCol: {
    flex: 1,
    gap: 4,
  },
  metricLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '800',
  },
  btnCol: {
    width: '100%',
    gap: 12,
    marginTop: 8,
  },
  finishBtn: {
    backgroundColor: '#0B4A3A',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0B4A3A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  finishText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  detailsBtn: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  detailsText: {
    fontSize: 15,
    fontWeight: '800',
  },
});
