import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, useColorScheme } from 'react-native';
import { VectorMap } from './VectorMap';

interface DeliveryStatusScreenProps {
  onBack: () => void;
  onHelp: () => void;
  onCancel: () => void;
}

export function DeliveryStatusScreen({ onBack, onHelp, onCancel }: DeliveryStatusScreenProps) {
  const isDark = useColorScheme() === 'dark';

  const items = [
    { name: 'Logitech MX Master 3S', qty: 1, price: '₦18,000.00' },
    { name: 'Desk Mat - Midnight Blue', qty: 1, price: '₦3,500.00' },
  ];

  const checkpoints = [
    { title: 'Order Placed', time: '10:30 AM, Oct 24', desc: 'Order received', status: 'completed' },
    { title: 'Rider Assigned', time: '10:35 AM', desc: 'Rider Chinedu Okafor', status: 'completed' },
    { title: 'Package Picked Up', time: '11:15 AM', desc: 'Warehouse A', status: 'completed' },
    { title: 'In Transit', time: '11:30 AM', desc: 'Heading to Surulere', status: 'active' },
    { title: 'Delivered', time: 'ETA: 12:00 PM', desc: 'Awaiting drop-off', status: 'pending' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#111214' : '#FFFFFF' }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={[styles.backIcon, { color: isDark ? '#FFFFFF' : '#000000' }]}>←</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
          Delivery Status
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Map Preview Card */}
        <View style={styles.mapSection}>
          <VectorMap showRoute={true} riderMoving={true} height={150} />
        </View>

        {/* Order Header Summary */}
        <View style={styles.orderSummaryCard}>
          <View style={styles.summaryRow}>
            <Text style={[styles.orderIdText, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
              Order #EX-99201
            </Text>
            <View style={styles.transitBadge}>
              <Text style={styles.transitBadgeText}>In Transit</Text>
            </View>
          </View>
          <Text style={[styles.etaText, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
            Est. Arrival: 12:00 PM
          </Text>
        </View>

        {/* Checkpoint Stepper Timeline */}
        <View style={styles.timelineSection}>
          {checkpoints.map((cp, idx) => {
            const isCompleted = cp.status === 'completed';
            const isActive = cp.status === 'active';
            const isLast = idx === checkpoints.length - 1;

            return (
              <View key={idx} style={styles.stepRow}>
                {/* Visual Line and Indicator */}
                <View style={styles.leftCol}>
                  <View
                    style={[
                      styles.indicatorCircle,
                      {
                        backgroundColor: isCompleted
                          ? '#10B981'
                          : isActive
                          ? '#0B4A3A'
                          : isDark
                          ? '#1C1D21'
                          : '#FAFAFA',
                        borderColor: isCompleted
                          ? '#10B981'
                          : isActive
                          ? '#10B981'
                          : isDark
                          ? '#2C2E35'
                          : '#E4E6EB',
                        borderWidth: 2,
                      },
                    ]}
                  >
                    {isCompleted ? (
                      <Text style={styles.completedCheck}>✓</Text>
                    ) : isActive ? (
                      <View style={styles.activeDot} />
                    ) : null}
                  </View>
                  {!isLast && (
                    <View
                      style={[
                        styles.indicatorLine,
                        {
                          backgroundColor: isCompleted
                            ? '#10B981'
                            : isDark
                            ? '#2C2E35'
                            : '#E4E6EB',
                        },
                      ]}
                    />
                  )}
                </View>

                {/* Step Metadata text */}
                <View style={styles.rightCol}>
                  <View style={styles.stepHeader}>
                    <Text
                      style={[
                        styles.stepTitle,
                        {
                          color: isDark ? '#FFFFFF' : '#0B4A3A',
                          fontWeight: isActive || isCompleted ? '700' : '500',
                        },
                      ]}
                    >
                      {cp.title}
                    </Text>
                    <Text style={[styles.stepTime, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                      {cp.time}
                    </Text>
                  </View>
                  <Text style={[styles.stepSubtitle, { color: isDark ? '#60646C' : '#9095A0' }]}>
                    {cp.desc}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Item Pricing List */}
        <View style={styles.itemsSection}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
            Delivery Details
          </Text>
          <View style={[styles.itemsCard, { backgroundColor: isDark ? '#1C1D21' : '#F8F9FA', borderColor: isDark ? '#2C2E35' : '#E9ECEF' }]}>
            {items.map((item, idx) => (
              <View key={idx} style={styles.itemRow}>
                <View style={styles.itemLeft}>
                  <Text style={[styles.itemName, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.itemQty, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                    Qty: {item.qty}
                  </Text>
                </View>
                <Text style={[styles.itemPrice, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
                  {item.price}
                </Text>
              </View>
            ))}

            <View style={[styles.divider, { backgroundColor: isDark ? '#2C2E35' : '#E9ECEF' }]} />

            {/* Billing Total Block */}
            <View style={styles.billingRow}>
              <Text style={[styles.billingLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>Subtotal</Text>
              <Text style={[styles.billingValue, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>₦21,500.00</Text>
            </View>
            <View style={styles.billingRow}>
              <Text style={[styles.billingLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>Delivery Fee</Text>
              <Text style={[styles.billingValue, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>₦2,000.00</Text>
            </View>
            <View style={styles.billingRow}>
              <Text style={[styles.billingTotalLabel, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>Total Cost</Text>
              <Text style={[styles.billingTotalValue, { color: '#10B981' }]}>₦23,500.00</Text>
            </View>
          </View>
        </View>

        {/* Footer Support Buttons */}
        <View style={styles.footerRow}>
          <Pressable
            onPress={onHelp}
            style={[styles.footerButton, { borderColor: isDark ? '#2C2E35' : '#E4E6EB', borderWidth: 1 }]}
          >
            <Text style={[styles.footerButtonText, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>Help</Text>
          </Pressable>

          <Pressable
            onPress={onCancel}
            style={[styles.footerButton, { borderColor: '#EF4444', borderWidth: 1 }]}
          >
            <Text style={[styles.footerButtonText, { color: '#EF4444' }]}>Cancel</Text>
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
  mapSection: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  orderSummaryCard: {
    gap: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderIdText: {
    fontSize: 18,
    fontWeight: '800',
  },
  transitBadge: {
    backgroundColor: '#E0F2FE',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  transitBadgeText: {
    color: '#0284C7',
    fontSize: 11,
    fontWeight: '700',
  },
  etaText: {
    fontSize: 13,
    fontWeight: '500',
  },
  timelineSection: {
    paddingHorizontal: 4,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 16,
  },
  leftCol: {
    alignItems: 'center',
  },
  indicatorCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  completedCheck: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  indicatorLine: {
    width: 2,
    height: 44,
    marginTop: 2,
    marginBottom: 2,
  },
  rightCol: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 20,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 14,
  },
  stepTime: {
    fontSize: 12,
    fontWeight: '600',
  },
  stepSubtitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  itemsSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  itemsCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLeft: {
    gap: 4,
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
  },
  itemQty: {
    fontSize: 12,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
  },
  divider: {
    height: 1,
  },
  billingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billingLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  billingValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  billingTotalLabel: {
    fontSize: 14,
    fontWeight: '800',
  },
  billingTotalValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  footerRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  footerButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
});
