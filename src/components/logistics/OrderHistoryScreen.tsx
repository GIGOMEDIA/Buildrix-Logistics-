import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, useColorScheme } from 'react-native';

interface OrderHistoryScreenProps {
  onSelectOrder: (orderId: string) => void;
  onBack: () => void;
}

export function OrderHistoryScreen({ onSelectOrder, onBack }: OrderHistoryScreenProps) {
  const isDark = useColorScheme() === 'dark';
  const [activeTab, setActiveTab] = useState<'All' | 'Progress' | 'Completed'>('All');

  const orders = [
    {
      id: 'ID: #9231',
      date: 'Today, 7:45 AM',
      route: 'Hub (Ikeja) to Deliver (Surulere)',
      item: 'Box of Clothes',
      price: '₦2,500.00',
      status: 'Completed',
    },
    {
      id: 'ID: #9219',
      date: 'Yesterday, 3:30 PM',
      route: 'Hub (Ikeja) to Lekki Phase 1',
      item: 'Laptop Chargers',
      price: '₦1,800.00',
      status: 'Cancelled',
    },
    {
      id: 'ID: #9201',
      date: '28 May, 11:15 AM',
      route: 'Hub (Ikeja) to Victoria Island',
      item: 'Logitech MX Master',
      price: '₦6,500.00',
      status: 'Completed',
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
          Order History
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statsCard, { backgroundColor: isDark ? '#1C1D21' : '#F4F5F7' }]}>
            <Text style={[styles.statsLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
              Completed Orders
            </Text>
            <Text style={[styles.statsValue, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>142</Text>
          </View>

          <View style={[styles.statsCard, { backgroundColor: isDark ? '#1C1D21' : '#F4F5F7' }]}>
            <Text style={[styles.statsLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
              Total Expenses
            </Text>
            <Text style={[styles.statsValue, { color: '#10B981' }]}>₦24.5k</Text>
          </View>
        </View>

        {/* Tab Filters */}
        <View style={[styles.tabBar, { backgroundColor: isDark ? '#1C1D21' : '#F4F5F7' }]}>
          {(['All', 'Progress', 'Completed'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.tabButton,
                  {
                    backgroundColor: isActive ? '#0B4A3A' : 'transparent',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    {
                      color: isActive ? '#FFFFFF' : isDark ? '#B0B4BA' : '#60646C',
                      fontWeight: isActive ? '700' : '500',
                    },
                  ]}
                >
                  {tab === 'Progress' ? 'In Progress' : tab}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* History List */}
        <View style={styles.listSection}>
          {orders.map((order) => {
            const isCompleted = order.status === 'Completed';

            return (
              <Pressable
                key={order.id}
                onPress={() => onSelectOrder(order.id)}
                style={({ pressed }) => [
                  styles.orderCard,
                  {
                    backgroundColor: isDark ? '#1C1D21' : '#F8F9FA',
                    borderColor: isDark ? '#2C2E35' : '#E9ECEF',
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.cardHeaderLeft}>
                    <Text style={[styles.orderId, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
                      {order.id}
                    </Text>
                    <Text style={[styles.orderDate, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                      {order.date}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor: isCompleted ? '#D1FAE5' : '#FEE2E2',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color: isCompleted ? '#059669' : '#DC2626',
                        },
                      ]}
                    >
                      {order.status}
                    </Text>
                  </View>
                </View>

                <View style={[styles.divider, { backgroundColor: isDark ? '#2C2E35' : '#E9ECEF' }]} />

                <View style={styles.cardBody}>
                  <Text style={[styles.routeText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                    📍 {order.route}
                  </Text>
                  <Text style={[styles.itemText, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                    📦 {order.item}
                  </Text>
                </View>

                <View style={[styles.divider, { backgroundColor: isDark ? '#2C2E35' : '#E9ECEF' }]} />

                <View style={styles.cardFooter}>
                  <Text style={[styles.footerLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                    Delivery Cost
                  </Text>
                  <Text style={[styles.footerPrice, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
                    {order.price}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Weekly Challenge Promo Banner */}
        <View style={[styles.promoCard, { backgroundColor: '#1A2E26' }]}>
          <Text style={styles.promoTitle}>Weekly Challenge</Text>
          <Text style={styles.promoDesc}>
            Complete 5 deliveries this week to unlock a free ₦1,000 delivery coupon!
          </Text>
          <View style={styles.progressRow}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '60%' }]} />
            </View>
            <Text style={styles.progressText}>3 / 5</Text>
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
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statsCard: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
    gap: 6,
  },
  statsLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsValue: {
    fontSize: 24,
    fontWeight: '800',
  },
  tabBar: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 14,
    gap: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabButtonText: {
    fontSize: 13,
  },
  listSection: {
    gap: 16,
  },
  orderCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeaderLeft: {
    gap: 2,
  },
  orderId: {
    fontSize: 15,
    fontWeight: '800',
  },
  orderDate: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: 1,
  },
  cardBody: {
    gap: 8,
  },
  routeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  itemText: {
    fontSize: 13,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  footerPrice: {
    fontSize: 15,
    fontWeight: '800',
  },
  promoCard: {
    padding: 20,
    borderRadius: 20,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.15)',
    marginBottom: 20,
  },
  promoTitle: {
    color: '#10B981',
    fontSize: 15,
    fontWeight: '800',
  },
  promoDesc: {
    color: '#A7F3D0',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
