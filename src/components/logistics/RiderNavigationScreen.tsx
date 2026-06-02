import React from 'react';
import { StyleSheet, View, Text, Pressable, useColorScheme } from 'react-native';
import { VectorMap } from './VectorMap';

interface RiderNavigationScreenProps {
  onArrive: () => void;
  onBack: () => void;
}

export function RiderNavigationScreen({ onArrive, onBack }: RiderNavigationScreenProps) {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#111214' : '#FFFFFF' }]}>
      {/* Background Map */}
      <View style={styles.mapContainer}>
        <VectorMap showRoute={true} riderMoving={true} height={600} />
      </View>

      {/* Turn-by-turn Navigation Instruction Card */}
      <View style={[styles.navInstructionCard, { backgroundColor: '#0B4A3A' }]}>
        <View style={styles.navRow}>
          <View style={styles.arrowBadge}>
            <Text style={styles.arrowText}>↰</Text>
          </View>
          <View>
            <Text style={styles.navText}>Turn Left on Admiralty Way</Text>
            <Text style={styles.navSubtext}>in 200m</Text>
          </View>
        </View>
      </View>

      {/* Back button overlay */}
      <Pressable onPress={onBack} style={[styles.backButton, { backgroundColor: isDark ? '#1C1D21' : '#FFFFFF' }]}>
        <Text style={[styles.backText, { color: isDark ? '#FFFFFF' : '#000000' }]}>←</Text>
      </Pressable>

      {/* Rider Bottom Sheet overlay */}
      <View
        style={[
          styles.bottomSheet,
          {
            backgroundColor: isDark ? '#1C1D21' : '#FFFFFF',
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 10,
          },
        ]}
      >
        <View style={styles.clientRow}>
          <View style={styles.clientAvatar}>
            <Text style={styles.avatarText}>TA</Text>
          </View>
          <View style={styles.clientInfo}>
            <Text style={[styles.clientName, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
              Tunde Adeyemi
            </Text>
            <Text style={[styles.orderId, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
              Order #554-9783 • Documents
            </Text>
          </View>
          <View style={styles.actionIcons}>
            <Pressable style={[styles.iconBtn, { backgroundColor: isDark ? '#2C2E35' : '#F4F5F7' }]}>
              <Text style={styles.actionIcon}>💬</Text>
            </Pressable>
            <Pressable style={[styles.iconBtn, { backgroundColor: isDark ? '#2C2E35' : '#F4F5F7' }]}>
              <Text style={styles.actionIcon}>📞</Text>
            </Pressable>
          </View>
        </View>

        <Pressable onPress={onArrive} style={styles.arrivedButton}>
          <Text style={styles.arrivedButtonText}>ARRIVED AT DESTINATION</Text>
        </Pressable>
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
  navInstructionCard: {
    position: 'absolute',
    top: 24,
    left: 16,
    right: 16,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 10,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  arrowBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  navText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  navSubtext: {
    color: '#A7F3D0',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  backButton: {
    position: 'absolute',
    top: 110,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  backText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    borderRadius: 24,
    padding: 20,
    gap: 20,
  },
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  clientAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  clientInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  clientName: {
    fontSize: 15,
    fontWeight: '800',
  },
  orderId: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  actionIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 16,
  },
  arrivedButton: {
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
  arrivedButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
