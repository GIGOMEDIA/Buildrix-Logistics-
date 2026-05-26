import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: 1,
    title: 'Fast Logistics at Your Fingertips',
    description: 'Experience the most reliable dispatch service in Nigeria. Real-time tracking and professional riders at your service.',
  },
  {
    id: 2,
    title: 'Real-Time Tracking & Intelligence',
    description: 'Track your packages dynamically in real-time. Know exactly where your dispatch rider is and get instant status alerts.',
  },
  {
    id: 3,
    title: 'Secure & Insured Deliveries',
    description: 'Every package is handled by a thoroughly vetted professional. Enjoy secure, fast, and fully tracked logistics every time.',
  }
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Animation for transitioning text
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      Animated.timing(slideAnimation, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentSlide(prev => prev + 1);
        slideAnimation.setValue(width);
        Animated.timing(slideAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    } else {
      router.push('/login');
    }
  };

  const handleSkip = () => {
    router.push('/login');
  };

  const slide = SLIDES[currentSlide];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.brand}>
          {/* Small green logo */}
          <View style={styles.logoBadge}>
            <View style={styles.logoCheck} />
          </View>
          <Text style={styles.brandText}>Buildrix</Text>
        </View>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Illustration Card */}
      <View style={styles.imageCardContainer}>
        <View style={styles.imageCard}>
          <Image 
            source={require('@/assets/images/delivery_moto.png')} 
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <Animated.View style={[styles.textSlide, { transform: [{ translateX: slideAnimation }] }]}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>
        </Animated.View>

        {/* Pager Dots */}
        <View style={styles.dotsContainer}>
          {SLIDES.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.dot, 
                index === currentSlide ? styles.activeDot : null
              ]} 
            />
          ))}
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentSlide === SLIDES.length - 1 ? 'Get Started' : 'Next  →'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Sleek light background
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#024C43',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCheck: {
    width: 6,
    height: 12,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#FFFFFF',
    transform: [{ rotate: '40deg' }],
    marginTop: -2,
  },
  brandText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#024C43',
  },
  skipButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  skipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  imageCardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  imageCard: {
    width: '100%',
    height: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 3,
  },
  illustration: {
    width: '90%',
    height: '90%',
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 32,
    paddingTop: 36,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.03,
    shadowRadius: 20,
    elevation: 10,
    alignItems: 'center',
  },
  textSlide: {
    width: '100%',
    alignItems: 'center',
    minHeight: 120,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#024C43',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
    marginBottom: 32,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
  },
  activeDot: {
    width: 20,
    backgroundColor: '#024C43',
  },
  nextButton: {
    width: '100%',
    height: 54,
    backgroundColor: '#024C43',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#024C43',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
