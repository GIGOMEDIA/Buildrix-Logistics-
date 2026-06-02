import React from 'react';
import { StyleSheet, View, Text, Pressable, Image, useColorScheme } from 'react-native';

interface OnboardingScreenProps {
  onNext: () => void;
  onSkip: () => void;
}

export function OnboardingScreen({ onNext, onSkip }: OnboardingScreenProps) {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#111214' : '#FFFFFF' }]}>
      {/* Top Header Section */}
      <View style={styles.header}>
        <View style={styles.brandContainer}>
          <View style={styles.logoMiniCircle}>
            <Text style={styles.logoMiniText}>R</Text>
          </View>
          <Text style={[styles.brandName, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>Buildrix</Text>
        </View>
        <Pressable onPress={onSkip} style={styles.skipButton}>
          <Text style={[styles.skipText, { color: isDark ? '#B0B4BA' : '#60646C' }]}>Skip</Text>
        </Pressable>
      </View>

      {/* Main Content Card Container */}
      <View style={styles.content}>
        <View style={[styles.imageCard, { backgroundColor: isDark ? '#1C1D21' : '#F8F9FA' }]}>
          <Image
            source={require('@/assets/images/courier_onboarding.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Text Details Section */}
        <View style={styles.textContainer}>
          <Text style={[styles.headline, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
            FAST, SAFE & RELIABLE LOGISTICS SERVICES
          </Text>
          <Text style={[styles.description, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
            Enjoy seamless delivery services from our well trained dispatch riders.
          </Text>
        </View>

        {/* Pagination Dots Indicator */}
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={[styles.dot, { backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }]} />
          <View style={[styles.dot, { backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }]} />
        </View>
      </View>

      {/* Footer Navigation Button */}
      <View style={styles.footer}>
        <Pressable onPress={onNext} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoMiniCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0B4A3A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoMiniText: {
    color: '#10B981',
    fontWeight: '900',
    fontSize: 14,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  skipButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  imageCard: {
    width: '100%',
    aspectRatio: 1.1,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  image: {
    width: '85%',
    height: '85%',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  headline: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: '#10B981',
  },
  footer: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#0B4A3A',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#0B4A3A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
