import React from 'react';
import { StyleSheet, View, Text, Pressable, useColorScheme } from 'react-native';
import { VectorMap } from './VectorMap';

interface RiderResponseScreenProps {
  onTrack: () => void;
  onBack: () => void;
}

export function RiderResponseScreen({ onTrack, onBack }: RiderResponseScreenProps) {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#111214' : '#FFFFFF' }]}>
      {/* Top Header Row with Back Button */}
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={[styles.backIcon, { color: isDark ? '#FFFFFF' : '#000000' }]}>←</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
          Rider Response
        </Text>
        <Pressable style={styles.moreButton}>
          <Text style={[styles.moreText, { color: isDark ? '#FFFFFF' : '#000000' }]}>•••</Text>
        </Pressable>
      </View>

      {/* Main Map Area (takes full space in center) */}
      <View style={styles.mapContainer}>
        <VectorMap showRoute={true} riderMoving={false} height={280} />
      </View>

      {/* Bottom Panel - Rider Details */}
      <View
        style={[
          styles.bottomPanel,
          {
            backgroundColor: isDark ? '#1C1D21' : '#FFFFFF',
            borderTopColor: isDark ? '#2C2E35' : '#E9ECEF',
          },
        ]}
      >
        {/* Rider Info Row */}
        <View style={styles.riderRow}>
          <View style={styles.riderAvatar}>
            <Text style={styles.riderAvatarText}>AG</Text>
          </View>
          <View style={styles.riderInfo}>
            <Text style={[styles.riderName, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
              Abel Gabriel
            </Text>
            <View style={styles.ratingBadge}>
              <Text style={styles.starIcon}>⭐</Text>
              <Text style={styles.ratingText}>4.8 • On the way</Text>
            </View>
          </View>

          {/* Contact Actions */}
          <View style={styles.contactRow}>
            <Pressable
              style={[styles.contactButton, { backgroundColor: isDark ? '#2E3135' : '#E6F4EA' }]}
            >
              <Text style={styles.contactIcon}>📞</Text>
            </Pressable>
            <Pressable
              style={[styles.contactButton, { backgroundColor: isDark ? '#2E3135' : '#E6F4EA' }]}
            >
              <Text style={styles.contactIcon}>💬</Text>
            </Pressable>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: isDark ? '#2C2E35' : '#E9ECEF' }]} />

        {/* Package details info */}
        <View style={styles.packageDetails}>
          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
              Package Description
            </Text>
            <Text style={[styles.detailValue, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
              Box of Clothes
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
              Total Cost
            </Text>
            <Text style={[styles.detailValue, { color: '#10B981', fontWeight: '800' }]}>
              ₦2,500
            </Text>
          </View>
        </View>

        {/* CTA Track Button */}
        <Pressable onPress={onTrack} style={styles.trackButton}>
          <Text style={styles.trackButtonText}>Track Delivery</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
  moreButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  moreText: {
    fontSize: 20,
    letterSpacing: -1,
  },
  mapContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  bottomPanel: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    padding: 24,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 8,
  },
  riderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  riderAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0B4A3A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  riderAvatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  riderInfo: {
    flex: 1,
    gap: 4,
  },
  riderName: {
    fontSize: 16,
    fontWeight: '800',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  starIcon: {
    fontSize: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  contactRow: {
    flexDirection: 'row',
    gap: 8,
  },
  contactButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactIcon: {
    fontSize: 16,
  },
  divider: {
    height: 1,
  },
  packageDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  detailItem: {
    gap: 4,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '700',
  },
  trackButton: {
    backgroundColor: '#0B4A3A',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#0B4A3A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  trackButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
