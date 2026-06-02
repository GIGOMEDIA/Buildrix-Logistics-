import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, useColorScheme, Platform, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

// Group A: Onboarding & Auth
import { SplashScreen } from '@/components/logistics/SplashScreen';
import { OnboardingScreen } from '@/components/logistics/OnboardingScreen';
import { LoginScreen } from '@/components/logistics/LoginScreen';
import { SignUpScreen } from '@/components/logistics/SignUpScreen';
import { OTPScreen } from '@/components/logistics/OTPScreen';

// Group B: Customer Portal
import { HomeScreen } from '@/components/logistics/HomeScreen';
import { CreateDeliveryScreen } from '@/components/logistics/CreateDeliveryScreen';
import { RiderResponseScreen } from '@/components/logistics/RiderResponseScreen';
import { TrackDeliveryScreen } from '@/components/logistics/TrackDeliveryScreen';
import { DeliveryStatusScreen } from '@/components/logistics/DeliveryStatusScreen';
import { OrderHistoryScreen } from '@/components/logistics/OrderHistoryScreen';
import { WalletScreen } from '@/components/logistics/WalletScreen';
import { NotificationsScreen } from '@/components/logistics/NotificationsScreen';
import { ProfileScreen } from '@/components/logistics/ProfileScreen';
import { ChatScreen } from '@/components/logistics/ChatScreen';
import { RateScreen } from '@/components/logistics/RateScreen';

// Group C: Rider Portal
import { RiderDashboardScreen } from '@/components/logistics/RiderDashboardScreen';
import { RiderIncomingScreen } from '@/components/logistics/RiderIncomingScreen';
import { RiderNavigationScreen } from '@/components/logistics/RiderNavigationScreen';
import { RiderEarningsScreen } from '@/components/logistics/RiderEarningsScreen';
import { RiderSuccessScreen } from '@/components/logistics/RiderSuccessScreen';

type ScreenName =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'signup'
  | 'otp'
  // Customer Portal
  | 'home'
  | 'create_delivery'
  | 'rider'
  | 'track'
  | 'delivery_status'
  | 'order_history'
  | 'wallet'
  | 'notifications'
  | 'profile'
  | 'chat'
  | 'rate'
  // Rider Portal
  | 'rider_dashboard'
  | 'rider_incoming'
  | 'rider_navigation'
  | 'rider_earnings'
  | 'rider_success';

interface ScreenItem {
  id: ScreenName;
  label: string;
  number: number;
}

export default function AppIndex() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('splash');
  const [inspectorTab, setInspectorTab] = useState<'auth' | 'customer' | 'rider'>('auth');
  const isDark = useColorScheme() === 'dark';

  // Navigation handlers for each screen
  const renderScreen = () => {
    switch (currentScreen) {
      // 1. Onboarding & Auth
      case 'splash':
        return <SplashScreen onComplete={() => setCurrentScreen('onboarding')} />;
      case 'onboarding':
        return (
          <OnboardingScreen
            onNext={() => setCurrentScreen('login')}
            onSkip={() => setCurrentScreen('login')}
          />
        );
      case 'login':
        return (
          <LoginScreen
            onSignIn={() => setCurrentScreen('otp')}
            onSignUpClick={() => setCurrentScreen('signup')}
          />
        );
      case 'signup':
        return (
          <SignUpScreen
            onCreateAccount={() => setCurrentScreen('otp')}
            onSignInClick={() => setCurrentScreen('login')}
          />
        );
      case 'otp':
        return (
          <OTPScreen
            onVerify={() => setCurrentScreen('home')}
            onBack={() => setCurrentScreen('login')}
          />
        );

      // 2. Customer Portal
      case 'home':
        return (
          <HomeScreen
            onSelectTransaction={(txId) => setCurrentScreen('delivery_status')}
            onLogout={() => setCurrentScreen('login')}
          />
        );
      case 'create_delivery':
        return (
          <CreateDeliveryScreen
            onSubmit={() => setCurrentScreen('rider')}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'rider':
        return (
          <RiderResponseScreen
            onTrack={() => setCurrentScreen('track')}
            onBack={() => setCurrentScreen('create_delivery')}
          />
        );
      case 'track':
        return (
          <TrackDeliveryScreen
            onComplete={() => setCurrentScreen('delivery_status')}
            onBack={() => setCurrentScreen('rider')}
          />
        );
      case 'delivery_status':
        return (
          <DeliveryStatusScreen
            onBack={() => setCurrentScreen('home')}
            onHelp={() => setCurrentScreen('chat')}
            onCancel={() => setCurrentScreen('rate')}
          />
        );
      case 'order_history':
        return (
          <OrderHistoryScreen
            onSelectOrder={(id) => setCurrentScreen('delivery_status')}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'wallet':
        return (
          <WalletScreen
            onBack={() => setCurrentScreen('home')}
            onAddFunds={() => alert('Add Funds initiated')}
            onWithdraw={() => alert('Withdrawal initiated')}
          />
        );
      case 'notifications':
        return <NotificationsScreen onBack={() => setCurrentScreen('home')} />;
      case 'profile':
        return (
          <ProfileScreen
            onBack={() => setCurrentScreen('home')}
            onLogout={() => setCurrentScreen('login')}
          />
        );
      case 'chat':
        return <ChatScreen onBack={() => setCurrentScreen('delivery_status')} />;
      case 'rate':
        return (
          <RateScreen
            onSubmit={(r, c) => {
              alert(`Rated ${r} stars: "${c}"`);
              setCurrentScreen('home');
            }}
            onBack={() => setCurrentScreen('home')}
          />
        );

      // 3. Rider Portal
      case 'rider_dashboard':
        return (
          <RiderDashboardScreen
            onAcceptIncoming={() => setCurrentScreen('rider_incoming')}
            onViewNavigation={() => setCurrentScreen('rider_navigation')}
            onViewEarnings={() => setCurrentScreen('rider_earnings')}
            onLogout={() => setCurrentScreen('login')}
          />
        );
      case 'rider_incoming':
        return (
          <RiderIncomingScreen
            onAccept={() => setCurrentScreen('rider_navigation')}
            onDecline={() => setCurrentScreen('rider_dashboard')}
          />
        );
      case 'rider_navigation':
        return (
          <RiderNavigationScreen
            onArrive={() => setCurrentScreen('rider_success')}
            onBack={() => setCurrentScreen('rider_dashboard')}
          />
        );
      case 'rider_earnings':
        return <RiderEarningsScreen onBack={() => setCurrentScreen('rider_dashboard')} />;
      case 'rider_success':
        return <RiderSuccessScreen onFinish={() => setCurrentScreen('rider_dashboard')} />;

      default:
        return <SplashScreen onComplete={() => setCurrentScreen('onboarding')} />;
    }
  };

  // Screen Lists by Flow Group
  const authScreens: ScreenItem[] = [
    { id: 'splash', label: 'Splash Screen', number: 1 },
    { id: 'onboarding', label: 'Onboarding Info', number: 2 },
    { id: 'login', label: 'Login screen', number: 3 },
    { id: 'signup', label: 'Register Account', number: 4 },
    { id: 'otp', label: 'OTP Pin Verification', number: 5 },
  ];

  const customerScreens: ScreenItem[] = [
    { id: 'home', label: 'Riders Dispatch Map', number: 6 },
    { id: 'create_delivery', label: 'New Delivery form', number: 7 },
    { id: 'rider', label: 'Assigned Rider Alert', number: 8 },
    { id: 'track', label: 'Route Tracker Stepper', number: 9 },
    { id: 'delivery_status', label: 'Pricing details card', number: 10 },
    { id: 'order_history', label: 'Orders list history', number: 11 },
    { id: 'wallet', label: 'Savings & Wallet', number: 12 },
    { id: 'notifications', label: 'Inbox & Promos list', number: 13 },
    { id: 'profile', label: 'Settings & Profile', number: 14 },
    { id: 'chat', label: 'Rider In-App Chat', number: 15 },
    { id: 'rate', label: 'Stars Review Feed', number: 16 },
  ];

  const riderScreens: ScreenItem[] = [
    { id: 'rider_dashboard', label: 'Online stats dash', number: 17 },
    { id: 'rider_incoming', label: 'New Job Accept banner', number: 18 },
    { id: 'rider_navigation', label: 'GPS Turn Guidance Map', number: 19 },
    { id: 'rider_earnings', label: 'Statements list', number: 20 },
    { id: 'rider_success', label: 'Handover complete card', number: 21 },
  ];

  const getActiveScreens = () => {
    switch (inspectorTab) {
      case 'auth':
        return authScreens;
      case 'customer':
        return customerScreens;
      case 'rider':
        return riderScreens;
    }
  };

  const getScreenLabel = (id: ScreenName) => {
    const found = [...authScreens, ...customerScreens, ...riderScreens].find((s) => s.id === id);
    return found ? `${found.number}. ${found.label}` : id;
  };

  // Helper lists to decide bottom tab displays
  const isCustomerLoggedIn = ['home', 'create_delivery', 'order_history', 'wallet', 'profile'].includes(currentScreen);
  const isRiderLoggedIn = ['rider_dashboard', 'rider_earnings'].includes(currentScreen);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: isDark ? '#111214' : '#F4F5F7' }]}
        edges={['top', 'left', 'right']}
      >
        <View style={styles.deviceFrame}>
          {/* Main App Content Viewport */}
          <View style={styles.appViewport}>{renderScreen()}</View>

          {/* Customer Global Bottom Navigation Bar */}
          {isCustomerLoggedIn && (
            <View style={[styles.bottomTabBar, { backgroundColor: isDark ? '#1C1D21' : '#FFFFFF', borderTopColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
              <Pressable onPress={() => setCurrentScreen('home')} style={styles.tabItem}>
                <Text style={[styles.tabEmoji, currentScreen === 'home' && styles.activeTabEmoji]}>🏍️</Text>
                <Text style={[styles.tabLabel, { color: currentScreen === 'home' ? '#10B981' : isDark ? '#B0B4BA' : '#60646C' }]}>Dispatch</Text>
              </Pressable>
              <Pressable onPress={() => setCurrentScreen('create_delivery')} style={styles.tabItem}>
                <Text style={[styles.tabEmoji, currentScreen === 'create_delivery' && styles.activeTabEmoji]}>➕</Text>
                <Text style={[styles.tabLabel, { color: currentScreen === 'create_delivery' ? '#10B981' : isDark ? '#B0B4BA' : '#60646C' }]}>Send</Text>
              </Pressable>
              <Pressable onPress={() => setCurrentScreen('order_history')} style={styles.tabItem}>
                <Text style={[styles.tabEmoji, currentScreen === 'order_history' && styles.activeTabEmoji]}>🧾</Text>
                <Text style={[styles.tabLabel, { color: currentScreen === 'order_history' ? '#10B981' : isDark ? '#B0B4BA' : '#60646C' }]}>Orders</Text>
              </Pressable>
              <Pressable onPress={() => setCurrentScreen('wallet')} style={styles.tabItem}>
                <Text style={[styles.tabEmoji, currentScreen === 'wallet' && styles.activeTabEmoji]}>💳</Text>
                <Text style={[styles.tabLabel, { color: currentScreen === 'wallet' ? '#10B981' : isDark ? '#B0B4BA' : '#60646C' }]}>Wallet</Text>
              </Pressable>
              <Pressable onPress={() => setCurrentScreen('profile')} style={styles.tabItem}>
                <Text style={[styles.tabEmoji, currentScreen === 'profile' && styles.activeTabEmoji]}>👤</Text>
                <Text style={[styles.tabLabel, { color: currentScreen === 'profile' ? '#10B981' : isDark ? '#B0B4BA' : '#60646C' }]}>Profile</Text>
              </Pressable>
            </View>
          )}

          {/* Rider Global Bottom Navigation Bar */}
          {isRiderLoggedIn && (
            <View style={[styles.bottomTabBar, { backgroundColor: isDark ? '#1C1D21' : '#FFFFFF', borderTopColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
              <Pressable onPress={() => setCurrentScreen('rider_dashboard')} style={styles.tabItem}>
                <Text style={[styles.tabEmoji, currentScreen === 'rider_dashboard' && styles.activeTabEmoji]}>📊</Text>
                <Text style={[styles.tabLabel, { color: currentScreen === 'rider_dashboard' ? '#10B981' : isDark ? '#B0B4BA' : '#60646C' }]}>Dashboard</Text>
              </Pressable>
              <Pressable onPress={() => setCurrentScreen('rider_earnings')} style={styles.tabItem}>
                <Text style={[styles.tabEmoji, currentScreen === 'rider_earnings' && styles.activeTabEmoji]}>💰</Text>
                <Text style={[styles.tabLabel, { color: currentScreen === 'rider_earnings' ? '#10B981' : isDark ? '#B0B4BA' : '#60646C' }]}>Earnings</Text>
              </Pressable>
              <Pressable onPress={() => setCurrentScreen('login')} style={styles.tabItem}>
                <Text style={styles.tabEmoji}>🚪</Text>
                <Text style={[styles.tabLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>Log Out</Text>
              </Pressable>
            </View>
          )}

          {/* Categorized Quick Inspector drawer */}
          <View
            style={[
              styles.inspectorContainer,
              {
                backgroundColor: isDark ? 'rgba(28, 29, 33, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
              },
            ]}
          >
            <View style={styles.inspectorHeader}>
              <Text style={[styles.inspectorTitle, { color: isDark ? '#FFF' : '#0B4A3A' }]}>
                📐 Mockups Quick Inspector
              </Text>
              <Text style={[styles.inspectorActiveText, { color: '#10B981' }]}>
                Active: {getScreenLabel(currentScreen)}
              </Text>
            </View>

            {/* Selector tabs for flows */}
            <View style={styles.flowTabsRow}>
              {(['auth', 'customer', 'rider'] as const).map((tab) => {
                const isActive = inspectorTab === tab;
                const tabLabel = tab === 'auth' ? 'Auth & Intro' : tab === 'customer' ? 'Customer Flow' : 'Rider Portal';
                return (
                  <Pressable
                    key={tab}
                    onPress={() => setInspectorTab(tab)}
                    style={[
                      styles.flowTabButton,
                      {
                        backgroundColor: isActive ? '#0B4A3A' : 'transparent',
                        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.flowTabButtonText,
                        { color: isActive ? '#FFFFFF' : isDark ? '#B0B4BA' : '#60646C' },
                      ]}
                    >
                      {tabLabel}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Horizontal list of target screen buttons */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.screensButtonsRow}>
              {getActiveScreens().map((sc) => {
                const isActive = currentScreen === sc.id;
                return (
                  <Pressable
                    key={sc.id}
                    onPress={() => setCurrentScreen(sc.id)}
                    style={[
                      styles.inspectorScreenButton,
                      {
                        backgroundColor: isActive ? '#10B981' : isDark ? '#2C2E35' : '#F4F5F7',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.inspectorScreenButtonText,
                        { color: isActive ? '#FFFFFF' : isDark ? '#FFFFFF' : '#0B4A3A' },
                      ]}
                    >
                      {sc.number}. {sc.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deviceFrame: {
    flex: 1,
    position: 'relative',
    maxWidth: Platform.OS === 'web' ? 480 : undefined,
    width: '100%',
    alignSelf: 'center',
    height: '100%',
    backgroundColor: '#000000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  appViewport: {
    flex: 1,
    paddingBottom: 0, // dynamic safe inset handled by component scrolling
  },
  bottomTabBar: {
    flexDirection: 'row',
    height: 64,
    borderTopWidth: 1,
    paddingBottom: 8,
    paddingTop: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 900,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 2,
  },
  tabEmoji: {
    fontSize: 18,
    opacity: 0.6,
  },
  activeTabEmoji: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
  },
  inspectorContainer: {
    borderTopWidth: 1,
    padding: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 15,
    zIndex: 1000,
  },
  inspectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inspectorTitle: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inspectorActiveText: {
    fontSize: 11,
    fontWeight: '700',
  },
  flowTabsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  flowTabButton: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flowTabButtonText: {
    fontSize: 11,
    fontWeight: '700',
  },
  screensButtonsRow: {
    gap: 8,
    paddingRight: 16,
    paddingVertical: 2,
  },
  inspectorScreenButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inspectorScreenButtonText: {
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
  },
});
