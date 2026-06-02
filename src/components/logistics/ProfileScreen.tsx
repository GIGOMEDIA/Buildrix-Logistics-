import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  useColorScheme,
  Image,
} from 'react-native';

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

export function ProfileScreen({ onBack, onLogout }: ProfileScreenProps) {
  const isDark = useColorScheme() === 'dark';

  const settingsItems = [
    {
      section: 'ACCOUNT SETTINGS',
      items: [
        { label: 'Personal Info', icon: '👤' },
        { label: 'Payment Methods', icon: '💳' },
        { label: 'Addresses', icon: '📍' },
      ],
    },
    {
      section: 'GENERAL',
      items: [
        { label: 'Support', icon: '💬' },
        { label: 'Security', icon: '🔒' },
      ],
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#111214' : '#FFFFFF' }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={[styles.backIcon, { color: isDark ? '#FFFFFF' : '#000000' }]}>←</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
          Settings
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: '#0B4A3A' }]}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBorder}>
              {/* Fallback to initials if image loads fail, or simple styled placeholder */}
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>CO</Text>
              </View>
            </View>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedIcon}>✓</Text>
            </View>
          </View>

          <Text style={styles.profileName}>Chukwudi Okafor</Text>
          <Text style={styles.profileMeta}>Member since Nov 2023 • ID: 89431</Text>

          <View style={styles.statsRow}>
            <View style={styles.statCol}>
              <Text style={styles.statVal}>1,204</Text>
              <Text style={styles.statLbl}>Deliveries</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCol}>
              <Text style={styles.statVal}>87</Text>
              <Text style={styles.statLbl}>Points</Text>
            </View>
          </View>
        </View>

        {/* Settings Lists */}
        {settingsItems.map((section, idx) => (
          <View key={idx} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
              {section.section}
            </Text>
            <View style={[styles.itemsContainer, { backgroundColor: isDark ? '#1C1D21' : '#F4F5F7' }]}>
              {section.items.map((item, itemIdx) => (
                <Pressable
                  key={itemIdx}
                  style={[
                    styles.itemRow,
                    { borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
                    itemIdx === section.items.length - 1 && { borderBottomWidth: 0 },
                  ]}
                >
                  <View style={styles.itemLeft}>
                    <Text style={styles.itemIcon}>{item.icon}</Text>
                    <Text style={[styles.itemLabel, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
                      {item.label}
                    </Text>
                  </View>
                  <Text style={[styles.chevron, { color: isDark ? '#60646C' : '#9095A0' }]}>→</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* Log Out Button */}
        <Pressable
          onPress={onLogout}
          style={[styles.logoutButton, { backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : '#FEE2E2' }]}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>

        <View style={styles.footerBrand}>
          <Text style={[styles.footerText, { color: isDark ? '#60646C' : '#9095A0' }]}>
            BUILDRIX LOGISTICS v1.0.0 (NIGERIA)
          </Text>
          <Text style={[styles.footerSubtext, { color: isDark ? '#60646C' : '#9095A0' }]}>
            © 2026 Buildrix. All rights reserved.
          </Text>
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
  profileCard: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#0B4A3A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarBorder: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#0B4A3A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedIcon: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  profileMeta: {
    color: '#A7F3D0',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statVal: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  statLbl: {
    color: '#A7F3D0',
    fontSize: 11,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  itemsContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemIcon: {
    fontSize: 18,
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  chevron: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '800',
  },
  footerBrand: {
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  footerSubtext: {
    fontSize: 9,
    fontWeight: '600',
  },
});
