import React, { useEffect } from 'react';
import { StyleSheet, View, Text, useColorScheme } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const logoScale = useSharedValue(0.3);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);

  useEffect(() => {
    // Logo animation
    logoScale.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.back(1.5)),
    });
    logoOpacity.value = withTiming(1, { duration: 800 });

    // Text animation
    textOpacity.value = withDelay(
      600,
      withTiming(1, { duration: 800 })
    );
    textTranslateY.value = withDelay(
      600,
      withTiming(0, { duration: 800, easing: Easing.out(Easing.quad) })
    );

    // Auto-progress to onboarding after 3.5 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const logoStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: logoScale.value }],
      opacity: logoOpacity.value,
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [{ translateY: textTranslateY.value }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Animated Brand Logo */}
        <Animated.View style={[styles.logoContainer, logoStyle]}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoR}>R</Text>
            {/* Styled Arrow Motif */}
            <View style={styles.arrowHead} />
            <View style={styles.arrowTail} />
          </View>
        </Animated.View>

        {/* Animated Title */}
        <Animated.View style={[styles.titleContainer, textStyle]}>
          <Text style={styles.brandTitle}>Buildrix</Text>
          <Text style={styles.brandSubtitle}>Logistics & Dispatch</Text>
        </Animated.View>
      </View>

      {/* Footer */}
      <Animated.View style={[styles.footer, textStyle]}>
        <Text style={styles.footerText}>FAST • SAFE • RELIABLE</Text>
        <Text style={styles.copyright}>© 2026 Buildrix Inc.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B4A3A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  logoR: {
    fontSize: 64,
    fontWeight: '900',
    color: '#10B981',
    fontStyle: 'italic',
    marginRight: 6,
  },
  arrowHead: {
    position: 'absolute',
    right: 32,
    top: 50,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 18,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFFFFF',
    transform: [{ rotate: '90deg' }],
  },
  arrowTail: {
    position: 'absolute',
    right: 46,
    top: 58,
    width: 14,
    height: 4,
    backgroundColor: '#FFFFFF',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  brandTitle: {
    fontSize: 38,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  brandSubtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#A7F3D0',
    marginTop: 4,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    color: '#A7F3D0',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 4,
    marginBottom: 8,
  },
  copyright: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 11,
    fontWeight: '500',
  },
});
