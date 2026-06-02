import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, useColorScheme } from 'react-native';
import { VectorMap } from './VectorMap';

interface RiderIncomingScreenProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function RiderIncomingScreen({ onAccept, onDecline }: RiderIncomingScreenProps) {
  const isDark = useColorScheme() === 'dark';
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    if (timeLeft <= 0) {
      onDecline();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#111214' : '#FFFFFF' }]}>
      {/* Background Map */}
      <View style={styles.mapContainer}>
        <VectorMap showRoute={true} riderMoving={false} height={600} />
      </View>

      {/* Header Overlay */}
      <View style={[styles.headerOverlay, { backgroundColor: isDark ? 'rgba(17,18,20,0.9)' : 'rgba(255,255,255,0.9)' }]}>
        <Pressable onPress={onDecline} style={styles.closeButton}>
          <Text style={[styles.closeIcon, { color: isDark ? '#FFFFFF' : '#000000' }]}>✕</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
          Incoming Request
        </Text>
        <View style={styles.timerBadge}>
          <Text style={styles.timerText}>{timeLeft}s</Text>
        </View>
      </View>

      {/* Floating Request Card */}
      <View
        style={[
          styles.requestCard,
          {
            backgroundColor: isDark ? '#1C1D21' : '#FFFFFF',
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 10,
          },
        ]}
      >
        <View style={styles.earningsRow}>
          <View>
            <Text style={styles.earningsLabel}>EST. EARNINGS</Text>
            <Text style={[styles.earningsValue, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
              ₦2,400.00
            </Text>
          </View>
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceText}>4.2 km</Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }]} />

        <View style={styles.addressList}>
          <View style={styles.addressLine}>
            <Text style={styles.dotPin}>🟢</Text>
            <View>
              <Text style={[styles.addressTitle, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                PICKUP FROM
              </Text>
              <Text style={[styles.addressDesc, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
                Ikeja Logistics Hub, Lagos
              </Text>
            </View>
          </View>

          <View style={[styles.addressLine, { marginTop: 12 }]}>
            <Text style={styles.dotPin}>🔴</Text>
            <View>
              <Text style={[styles.addressTitle, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                DELIVER TO
              </Text>
              <Text style={[styles.addressDesc, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
                Chevron Drive, Lekki Phase 2
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }]} />

        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: isDark ? '#60646C' : '#9095A0' }]}>
            Package: <Text style={{ color: isDark ? '#FFFFFF' : '#0B4A3A', fontWeight: 'bold' }}>Documents</Text>
          </Text>
          <Text style={[styles.infoLabel, { color: isDark ? '#60646C' : '#9095A0' }]}>
            Payment: <Text style={{ color: '#10B981', fontWeight: 'bold' }}>Wallet</Text>
          </Text>
        </View>

        <View style={styles.btnRow}>
          <Pressable onPress={onDecline} style={[styles.declineBtn, { borderColor: isDark ? '#2C2E35' : '#E4E6EB' }]}>
            <Text style={[styles.declineText, { color: isDark ? '#FFFFFF' : '#60646C' }]}>Decline</Text>
          </Pressable>
          <Pressable onPress={onAccept} style={styles.acceptBtn}>
            <Text style={styles.acceptText}>ACCEPT ORDER</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  timerBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  timerText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  requestCard: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    borderRadius: 24,
    padding: 20,
    gap: 16,
  },
  earningsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  earningsLabel: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  earningsValue: {
    fontSize: 26,
    fontWeight: '900',
    marginTop: 2,
  },
  distanceBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  distanceText: {
    color: '#10B981',
    fontWeight: '800',
    fontSize: 13,
  },
  divider: {
    height: 1,
    width: '100%',
  },
  addressList: {
    gap: 4,
  },
  addressLine: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  dotPin: {
    fontSize: 14,
    marginTop: 2,
  },
  addressTitle: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  addressDesc: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  declineBtn: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  declineText: {
    fontSize: 14,
    fontWeight: '800',
  },
  acceptBtn: {
    flex: 2,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#0B4A3A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0B4A3A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  acceptText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
