import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, useColorScheme } from 'react-native';

interface NotificationsScreenProps {
  onBack: () => void;
}

export function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  const isDark = useColorScheme() === 'dark';
  const [activeFilter, setActiveFilter] = useState<'All' | 'Delivery' | 'Promos' | 'System'>('All');

  const notifications = [
    {
      group: 'TODAY',
      items: [
        {
          id: 'n1',
          title: 'Rider is 2 mins away',
          desc: 'Your order #EX-99201 is arriving soon. Please be ready to receive it at your doorstep.',
          time: '10:45 AM',
          type: 'Delivery',
          icon: '🏍️',
        },
        {
          id: 'n2',
          title: 'Promo: 20% off your next delivery',
          desc: 'Get a discount on your next hour. Valid for all intermediate delivery options. Use code BUILD20.',
          time: '9:00 AM',
          type: 'Promos',
          icon: '🏷️',
        },
      ],
    },
    {
      group: 'YESTERDAY',
      items: [
        {
          id: 'n3',
          title: 'Wallet Recharged',
          desc: 'Success! ₦15,000 has been added to your Buildrix wallet card payment.',
          time: 'Yesterday, 9:00 AM',
          type: 'System',
          icon: '💳',
        },
        {
          id: 'n4',
          title: 'Security Alert',
          desc: "New login detected on a Samsung Galaxy S21 in Lagos, Nigeria. If this wasn't you, secure your account.",
          time: 'Yesterday, 8:15 AM',
          type: 'System',
          icon: '🔒',
        },
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
          Notifications
        </Text>
        <Pressable>
          <Text style={styles.clearAllText}>Clear All</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Category Filter Pills */}
        <View style={styles.filtersRow}>
          {(['All', 'Delivery', 'Promos', 'System'] as const).map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <Pressable
                key={filter}
                onPress={() => setActiveFilter(filter)}
                style={[
                  styles.filterPill,
                  {
                    backgroundColor: isActive ? '#0B4A3A' : isDark ? '#1C1D21' : '#F4F5F7',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    {
                      color: isActive ? '#FFFFFF' : isDark ? '#B0B4BA' : '#60646C',
                      fontWeight: isActive ? '700' : '500',
                    },
                  ]}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Notifications list grouped by date */}
        <View style={styles.listSection}>
          {notifications.map((group, groupIdx) => {
            // Filter items based on selected filter
            const filteredItems = group.items.filter(
              (item) => activeFilter === 'All' || item.type === activeFilter
            );

            if (filteredItems.length === 0) return null;

            return (
              <View key={groupIdx} style={styles.groupContainer}>
                <Text style={[styles.groupHeader, { color: isDark ? '#60646C' : '#9095A0' }]}>
                  {group.group}
                </Text>
                <View style={styles.groupItems}>
                  {filteredItems.map((item) => (
                    <View
                      key={item.id}
                      style={[
                        styles.notiCard,
                        {
                          backgroundColor: isDark ? '#1C1D21' : '#F8F9FA',
                          borderColor: isDark ? '#2C2E35' : '#E9ECEF',
                        },
                      ]}
                    >
                      <View style={styles.cardHeader}>
                        <View style={styles.cardHeaderLeft}>
                          <View style={[styles.iconBg, { backgroundColor: isDark ? '#2C2E35' : '#E6F4EA' }]}>
                            <Text style={styles.iconText}>{item.icon}</Text>
                          </View>
                          <Text style={[styles.notiTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
                            {item.title}
                          </Text>
                        </View>
                        <Text style={[styles.notiTime, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                          {item.time}
                        </Text>
                      </View>
                      <Text style={[styles.notiDesc, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                        {item.desc}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
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
  clearAllText: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 24,
    gap: 24,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterPill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterPillText: {
    fontSize: 12,
  },
  listSection: {
    gap: 24,
  },
  groupContainer: {
    gap: 12,
  },
  groupHeader: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  groupItems: {
    gap: 12,
  },
  notiCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  iconBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 14,
  },
  notiTitle: {
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  notiTime: {
    fontSize: 11,
    fontWeight: '500',
  },
  notiDesc: {
    fontSize: 13,
    lineHeight: 18,
    paddingLeft: 42,
  },
});
