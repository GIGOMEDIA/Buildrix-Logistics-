import React from 'react';
import { StyleSheet, View, Text, Pressable, useColorScheme, ScrollView } from 'react-native';
import { VectorMap } from './VectorMap';

interface TrackStep {
  title: string;
  subtitle: string;
  time: string;
  status: 'completed' | 'active' | 'pending';
}

interface TrackDeliveryScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export function TrackDeliveryScreen({ onComplete, onBack }: TrackDeliveryScreenProps) {
  const isDark = useColorScheme() === 'dark';

  const steps: TrackStep[] = [
    {
      title: 'Order Placed',
      subtitle: 'We received your order successfully',
      time: '10:30 AM',
      status: 'completed',
    },
    {
      title: 'Rider Accepted',
      subtitle: 'Rider Abel Gabriel is assigned',
      time: '10:35 AM',
      status: 'completed',
    },
    {
      title: 'In Transit',
      subtitle: 'Courier is heading to your destination',
      time: '10:45 AM',
      status: 'active',
    },
    {
      title: 'Delivered',
      subtitle: 'Courier delivers package to Ikeja',
      time: 'ETA: 11:15 AM',
      status: 'pending',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#111214' : '#FFFFFF' }]}>
      {/* Scrollable Tracker */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={onBack} style={styles.backButton}>
            <Text style={[styles.backIcon, { color: isDark ? '#FFFFFF' : '#000000' }]}>←</Text>
          </Pressable>
          <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
            Track Order
          </Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Checkpoint Stepper */}
        <View style={styles.stepperContainer}>
          {steps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';
            const isLast = idx === steps.length - 1;

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
                      {step.title}
                    </Text>
                    <Text style={[styles.stepTime, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                      {step.time}
                    </Text>
                  </View>
                  <Text style={[styles.stepSubtitle, { color: isDark ? '#60646C' : '#9095A0' }]}>
                    {step.subtitle}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Live Vector Map Card */}
        <View style={styles.mapSection}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
            Live Tracking Map
          </Text>
          <VectorMap showRoute={true} riderMoving={true} height={200} />
        </View>

        {/* Submit Finish button */}
        <Pressable onPress={onComplete} style={styles.completeButton}>
          <Text style={styles.completeButtonText}>Complete Delivery</Text>
        </Pressable>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
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
  stepperContainer: {
    paddingHorizontal: 8,
    gap: 0,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 16,
  },
  leftCol: {
    alignItems: 'center',
  },
  indicatorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  completedCheck: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
  },
  indicatorLine: {
    width: 2,
    height: 48,
    marginTop: 2,
    marginBottom: 2,
  },
  rightCol: {
    flex: 1,
    paddingTop: 2,
    paddingBottom: 24,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 15,
  },
  stepTime: {
    fontSize: 12,
    fontWeight: '600',
  },
  stepSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  mapSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  completeButton: {
    backgroundColor: '#0B4A3A',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
    shadowColor: '#0B4A3A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
