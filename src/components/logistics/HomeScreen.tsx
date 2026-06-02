import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { VectorMap } from './VectorMap';

interface Transaction {
  id: string;
  destination: string;
  item: string;
  status: 'In Transit' | 'Completed' | 'Pending';
  price: string;
  date: string;
}

interface HomeScreenProps {
  onSelectTransaction: (txId: string) => void;
  onLogout: () => void;
}

export function HomeScreen({ onSelectTransaction, onLogout }: HomeScreenProps) {
  const isDark = useColorScheme() === 'dark';

  const transactions: Transaction[] = [
    {
      id: 'ID: 483984',
      destination: 'Deliv. to Ikeja',
      item: 'Box of Clothes',
      status: 'In Transit',
      price: '₦2,500',
      date: 'Today, 10:45 AM',
    },
    {
      id: 'ID: 483985',
      destination: 'Deliv. to Surulere',
      item: 'Laptop Chargers',
      status: 'Completed',
      price: '₦1,800',
      date: 'Yesterday, 3:30 PM',
    },
    {
      id: 'ID: 483986',
      destination: 'Deliv. to Lekki',
      item: 'Medical Supplies',
      status: 'Completed',
      price: '₦4,200',
      date: '28 May, 11:15 AM',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#111214' : '#FFFFFF' }]}>
      {/* Scrollable Main Area */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Dispatch Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.headerSubtitle, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
              Hello, Gratitude
            </Text>
            <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
              Riders Dispatch
            </Text>
          </View>
          <View style={styles.avatarRow}>
            {/* Notification Indicator */}
            <Pressable style={[styles.iconButton, { backgroundColor: isDark ? '#1C1D21' : '#F4F5F7' }]}>
              <Text style={styles.iconButtonText}>🔔</Text>
              <View style={styles.badgeDot} />
            </Pressable>
            {/* Logout Indicator */}
            <Pressable
              onPress={onLogout}
              style={[styles.iconButton, { backgroundColor: isDark ? '#1C1D21' : '#F4F5F7' }]}
            >
              <Text style={styles.iconButtonText}>🚪</Text>
            </Pressable>
            {/* User Profile Avatar */}
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>GO</Text>
            </View>
          </View>
        </View>

        {/* Search Bar Input */}
        <View style={[styles.searchContainer, { backgroundColor: isDark ? '#1C1D21' : '#F4F5F7' }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search delivery by ID or destination..."
            placeholderTextColor={isDark ? '#60646C' : '#9095A0'}
            style={[styles.searchInput, { color: isDark ? '#FFFFFF' : '#000000' }]}
          />
          <Pressable style={styles.filterButton}>
            <Text style={styles.filterText}>🎛️</Text>
          </Pressable>
        </View>

        {/* Live Operations Map Preview */}
        <View style={styles.mapSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
              Live Dispatch Operations
            </Text>
            <View style={styles.liveIndicator}>
              <View style={styles.livePulse} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>
          <VectorMap showRoute={true} riderMoving={false} height={180} />
        </View>

        {/* Recent Transactions List Section */}
        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
              Recent Transactions
            </Text>
            <Pressable>
              <Text style={styles.viewAllLink}>View All</Text>
            </Pressable>
          </View>

          <View style={styles.listContainer}>
            {transactions.map((tx) => {
              const isTransit = tx.status === 'In Transit';

              return (
                <Pressable
                  key={tx.id}
                  onPress={() => onSelectTransaction(tx.id)}
                  style={({ pressed }: { pressed: boolean }) => [
                    styles.txItem,
                    {
                      backgroundColor: isDark ? '#1C1D21' : '#F8F9FA',
                      borderColor: isDark ? '#2C2E35' : '#E9ECEF',
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <View style={styles.txLeft}>
                    {/* Status Icon */}
                    <View
                      style={[
                        styles.statusIconCircle,
                        {
                          backgroundColor: isTransit ? 'rgba(16,185,129,0.1)' : 'rgba(11,74,58,0.1)',
                        },
                      ]}
                    >
                      <Text style={styles.statusEmoji}>{isTransit ? '🏍️' : '📦'}</Text>
                    </View>
                    <View style={styles.txInfo}>
                      <Text style={[styles.txTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
                        {tx.destination}
                      </Text>
                      <Text style={[styles.txMeta, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                        {tx.id} • {tx.item}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.txRight}>
                    <Text style={[styles.txPrice, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
                      {tx.price}
                    </Text>
                    {/* Status Badge */}
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor: isTransit ? '#E0F2FE' : '#D1FAE5',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusBadgeText,
                          {
                            color: isTransit ? '#0284C7' : '#059669',
                          },
                        ]}
                      >
                        {tx.status}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
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
  scrollContent: {
    padding: 24,
    gap: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 2,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconButtonText: {
    fontSize: 16,
  },
  badgeDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#0B4A3A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#10B981',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: 16,
    paddingHorizontal: 16,
    gap: 10,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  filterButton: {
    padding: 4,
  },
  filterText: {
    fontSize: 16,
  },
  mapSection: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  livePulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  liveText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#EF4444',
  },
  transactionsSection: {
    gap: 12,
    marginBottom: 20,
  },
  viewAllLink: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '700',
  },
  listContainer: {
    gap: 12,
  },
  txItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusEmoji: {
    fontSize: 18,
  },
  txInfo: {
    gap: 4,
  },
  txTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  txMeta: {
    fontSize: 12,
    fontWeight: '500',
  },
  txRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  txPrice: {
    fontSize: 15,
    fontWeight: '700',
  },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
});
