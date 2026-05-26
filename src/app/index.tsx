import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, Easing, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen() {
  const router = useRouter();
  
  // Animation values
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  
  const dot1Opacity = useRef(new Animated.Value(0.3)).current;
  const dot2Opacity = useRef(new Animated.Value(0.3)).current;
  const dot3Opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Logo entrance animation
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Footer text fade-in
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 1200,
      delay: 500,
      useNativeDriver: true,
    }).start();

    // Loading dots pulsing animation loop
    const createDotAnimation = (dot: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            delay: delay,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const anim1 = createDotAnimation(dot1Opacity, 0);
    const anim2 = createDotAnimation(dot2Opacity, 150);
    const anim3 = createDotAnimation(dot3Opacity, 300);

    anim1.start();
    anim2.start();
    anim3.start();

    // Navigation timer
    const navigateTimer = setTimeout(() => {
      router.replace('/onboarding');
    }, 3800);

    return () => {
      clearTimeout(navigateTimer);
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Stylized Checkmark Logo */}
        <Animated.View style={[styles.logoContainer, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
          <View style={styles.logoSymbol}>
            {/* The stylized "R" checkmark letter */}
            <View style={styles.verticalBar} />
            <View style={styles.loopContainer}>
              <View style={styles.loop} />
            </View>
            <View style={styles.checkmarkLegContainer}>
              <View style={styles.checkmarkLeg} />
            </View>
          </View>
        </Animated.View>

        {/* Three Loading Dots */}
        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, { opacity: dot1Opacity }]} />
          <Animated.View style={[styles.dot, { opacity: dot2Opacity }]} />
          <Animated.View style={[styles.dot, { opacity: dot3Opacity }]} />
        </View>
      </View>

      {/* Footer Branding */}
      <Animated.View style={[styles.footer, { opacity: textOpacity }]}>
        <Text style={styles.tagline}>FAST  •  RELIABLE  •  SECURE</Text>
        <Text style={styles.copyright}>© 2026 Buildrix Logistics v2.0</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#024C43', // Brand dark green/teal
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  logoSymbol: {
    width: 90,
    height: 90,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // High-fidelity stylized checkmark letter "R" build
  verticalBar: {
    position: 'absolute',
    left: 20,
    top: 15,
    width: 14,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
  },
  loopContainer: {
    position: 'absolute',
    left: 20,
    top: 15,
    width: 48,
    height: 36,
    overflow: 'hidden',
  },
  loop: {
    width: 48,
    height: 36,
    borderWidth: 14,
    borderColor: '#FFFFFF',
    borderRadius: 18,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  checkmarkLegContainer: {
    position: 'absolute',
    left: 32,
    top: 40,
    width: 40,
    height: 40,
    overflow: 'hidden',
  },
  checkmarkLeg: {
    width: 14,
    height: 45,
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    position: 'absolute',
    top: 0,
    left: 8,
    transform: [{ rotate: '-35deg' }],
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 24,
    gap: 8,
  },
  tagline: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  copyright: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 11,
    fontWeight: '400',
  },
});
