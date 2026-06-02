import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface CreateDeliveryScreenProps {
  onSubmit: () => void;
  onBack: () => void;
}

export function CreateDeliveryScreen({ onSubmit, onBack }: CreateDeliveryScreenProps) {
  const isDark = useColorScheme() === 'dark';
  const [packageType, setPackageType] = useState<'Documents' | 'Box' | 'Food' | 'Others'>('Documents');
  const [description, setDescription] = useState('Box of Clothes');
  const [pickup, setPickup] = useState('Logistics Hub, Ikeja');
  const [delivery, setDelivery] = useState('14, Surulere Avenue');
  const [deliveryType, setDeliveryType] = useState<'Instant' | 'Scheduled'>('Instant');

  const typesList: { id: typeof packageType; label: string; icon: string }[] = [
    { id: 'Documents', label: 'Documents', icon: '📄' },
    { id: 'Box', label: 'Box', icon: '📦' },
    { id: 'Food', label: 'Food', icon: '🍲' },
    { id: 'Others', label: 'Others', icon: '📎' },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={[styles.container, { backgroundColor: isDark ? '#111214' : '#FFFFFF' }]}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={onBack} style={styles.backButton}>
            <Text style={[styles.backIcon, { color: isDark ? '#FFFFFF' : '#000000' }]}>←</Text>
          </Pressable>
          <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
            New Delivery
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Subtitle intro */}
          <View style={styles.introContainer}>
            <Text style={[styles.introTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
              Send a Package
            </Text>
            <Text style={[styles.introDesc, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
              Share details of your package. The rider position details and pricing estimates will show safely on the map.
            </Text>
          </View>

          {/* Package Type Grid */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
              Package Type
            </Text>
            <View style={styles.gridRow}>
              {typesList.map((type) => {
                const isActive = packageType === type.id;
                return (
                  <Pressable
                    key={type.id}
                    onPress={() => setPackageType(type.id)}
                    style={[
                      styles.gridCard,
                      {
                        backgroundColor: isActive
                          ? isDark
                            ? 'rgba(16,185,129,0.1)'
                            : '#E6F4EA'
                          : isDark
                          ? '#1C1D21'
                          : '#F4F5F7',
                        borderColor: isActive ? '#10B981' : 'transparent',
                        borderWidth: 1,
                      },
                    ]}
                  >
                    <Text style={styles.cardIcon}>{type.icon}</Text>
                    <Text
                      style={[
                        styles.cardLabel,
                        {
                          color: isActive ? '#10B981' : isDark ? '#FFFFFF' : '#0B4A3A',
                          fontWeight: isActive ? '700' : '500',
                        },
                      ]}
                    >
                      {type.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Text fields form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                Package Description
              </Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="e.g. Box of clothes"
                placeholderTextColor={isDark ? '#60646C' : '#9095A0'}
                style={[
                  styles.input,
                  {
                    backgroundColor: isDark ? '#1C1D21' : '#F4F5F7',
                    color: isDark ? '#FFFFFF' : '#000000',
                    borderColor: isDark ? '#2C2E35' : '#E4E6EB',
                  },
                ]}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                Pickup Address
              </Text>
              <TextInput
                value={pickup}
                onChangeText={setPickup}
                placeholder="Enter pickup address"
                placeholderTextColor={isDark ? '#60646C' : '#9095A0'}
                style={[
                  styles.input,
                  {
                    backgroundColor: isDark ? '#1C1D21' : '#F4F5F7',
                    color: isDark ? '#FFFFFF' : '#000000',
                    borderColor: isDark ? '#2C2E35' : '#E4E6EB',
                  },
                ]}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                Delivery Address
              </Text>
              <TextInput
                value={delivery}
                onChangeText={setDelivery}
                placeholder="Enter delivery address"
                placeholderTextColor={isDark ? '#60646C' : '#9095A0'}
                style={[
                  styles.input,
                  {
                    backgroundColor: isDark ? '#1C1D21' : '#F4F5F7',
                    color: isDark ? '#FFFFFF' : '#000000',
                    borderColor: isDark ? '#2C2E35' : '#E4E6EB',
                  },
                ]}
              />
            </View>
          </View>

          {/* Delivery Type Option */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
              Delivery Type
            </Text>
            <View style={styles.optionsCol}>
              <Pressable
                onPress={() => setDeliveryType('Instant')}
                style={[
                  styles.optionRow,
                  {
                    backgroundColor: isDark ? '#1C1D21' : '#F4F5F7',
                    borderColor: deliveryType === 'Instant' ? '#10B981' : 'transparent',
                    borderWidth: 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.radio,
                    {
                      backgroundColor: deliveryType === 'Instant' ? '#10B981' : 'transparent',
                      borderColor: deliveryType === 'Instant' ? '#10B981' : '#E4E6EB',
                    },
                  ]}
                />
                <View style={styles.optionInfo}>
                  <Text style={[styles.optionTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
                    Instant Delivery
                  </Text>
                  <Text style={[styles.optionDesc, { color: isDark ? '#60646C' : '#9095A0' }]}>
                    Rider is assigned immediately
                  </Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() => setDeliveryType('Scheduled')}
                style={[
                  styles.optionRow,
                  {
                    backgroundColor: isDark ? '#1C1D21' : '#F4F5F7',
                    borderColor: deliveryType === 'Scheduled' ? '#10B981' : 'transparent',
                    borderWidth: 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.radio,
                    {
                      backgroundColor: deliveryType === 'Scheduled' ? '#10B981' : 'transparent',
                      borderColor: deliveryType === 'Scheduled' ? '#10B981' : '#E4E6EB',
                    },
                  ]}
                />
                <View style={styles.optionInfo}>
                  <Text style={[styles.optionTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
                    Scheduled
                  </Text>
                  <Text style={[styles.optionDesc, { color: isDark ? '#60646C' : '#9095A0' }]}>
                    Set a time for pick up later
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* Pricing Estimation Card */}
          <View style={[styles.promoCard, { backgroundColor: '#0B4A3A' }]}>
            <View style={styles.promoLeft}>
              <Text style={styles.promoTitle}>General Logistics</Text>
              <Text style={styles.promoDesc}>Estimated cost for this delivery route</Text>
              <View style={styles.priceBadge}>
                <Text style={styles.priceText}>₦2,500.00</Text>
              </View>
            </View>
            <View style={styles.promoRight}>
              <Text style={styles.promoRightIcon}>🏍️</Text>
            </View>
          </View>

          {/* Submit Action Button */}
          <Pressable onPress={onSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Proceed to Delivery</Text>
          </Pressable>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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
  introContainer: {
    gap: 6,
  },
  introTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  introDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  section: {
    gap: 12,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  gridRow: {
    flexDirection: 'row',
    gap: 8,
  },
  gridCard: {
    flex: 1,
    height: 80,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardLabel: {
    fontSize: 11,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  optionsCol: {
    gap: 12,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  optionInfo: {
    gap: 2,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  optionDesc: {
    fontSize: 12,
    fontWeight: '500',
  },
  promoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  promoLeft: {
    gap: 6,
    flex: 1,
  },
  promoTitle: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '800',
  },
  promoDesc: {
    color: '#A7F3D0',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  priceBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  priceText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
  promoRight: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoRightIcon: {
    fontSize: 32,
  },
  submitButton: {
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
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
