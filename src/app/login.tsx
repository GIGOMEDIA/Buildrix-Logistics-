import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  
  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Biometrics simulation state
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [biometricSuccess, setBiometricSuccess] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    // Simulate successful login -> goes to dashboard
    setErrorMessage('');
    router.replace('/dashboard');
  };

  const handleBiometrics = () => {
    setShowBiometricModal(true);
    setBiometricSuccess(false);
    setTimeout(() => {
      setBiometricSuccess(true);
      setTimeout(() => {
        setShowBiometricModal(false);
        router.replace('/dashboard');
      }, 1000);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {/* Brand Logo */}
        <View style={styles.logoWrapper}>
          <View style={styles.logoSquare}>
            <View style={styles.logoCheck} />
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Buildrix Dispatch</Text>
          <Text style={styles.subtitle}>Logistics intelligence for every mile.</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          {/* Email field */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
            <View style={styles.inputWrapper}>
              {/* Mail Icon */}
              <View style={styles.iconContainer}>
                <View style={styles.mailEnvelope}>
                  <View style={styles.mailTriangle} />
                </View>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="name@company.com"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password field */}
          <View style={styles.inputGroup}>
            <View style={styles.passwordHeader}>
              <Text style={styles.inputLabel}>PASSWORD</Text>
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              {/* Lock Icon */}
              <View style={styles.iconContainer}>
                <View style={styles.lockBody}>
                  <View style={styles.lockShackle} />
                </View>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
              {/* Eye Icon toggle */}
              <TouchableOpacity 
                style={styles.eyeButton} 
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <View style={styles.eyeIconOuter}>
                  <View style={[styles.eyePupil, isPasswordVisible ? styles.eyePupilActive : null]} />
                  {!isPasswordVisible && <View style={styles.eyeSlash} />}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember device checkbox */}
          <TouchableOpacity 
            style={styles.checkboxRow} 
            activeOpacity={0.8} 
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[styles.checkboxSquare, rememberMe ? styles.checkboxChecked : null]}>
              {rememberMe && <View style={styles.checkboxCheckmark} />}
            </View>
            <Text style={styles.checkboxLabel}>Remember this device</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login  →</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Biometric Button */}
        <TouchableOpacity style={styles.biometricButton} onPress={handleBiometrics}>
          {/* Fingerprint icon shape */}
          <View style={styles.biometricIconWrapper}>
            <View style={styles.fingerprint1} />
            <View style={styles.fingerprint2} />
            <View style={styles.fingerprint3} />
          </View>
          <Text style={styles.biometricText}>Device Key</Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={styles.signUpLinkRow}>
          <Text style={styles.signupPrompt}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.signupLinkText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footerLinks}>
          <TouchableOpacity><Text style={styles.footerLink}>Privacy Policy</Text></TouchableOpacity>
          <Text style={styles.footerDot}>•</Text>
          <TouchableOpacity><Text style={styles.footerLink}>Terms of Service</Text></TouchableOpacity>
          <Text style={styles.footerDot}>•</Text>
          <TouchableOpacity><Text style={styles.footerLink}>Support</Text></TouchableOpacity>
        </View>
      </ScrollView>

      {/* Biometric Animation Overlay */}
      {showBiometricModal && (
        <View style={styles.overlayContainer}>
          <View style={styles.biometricCard}>
            <Text style={styles.biometricModalTitle}>Device Key Sign-In</Text>
            
            <View style={[styles.biometricScanArea, biometricSuccess ? styles.scanSuccess : null]}>
              {biometricSuccess ? (
                // Checkmark
                <View style={styles.scanSuccessCheck} />
              ) : (
                // Fingerprint scanner wave
                <View style={styles.fingerprintWaves}>
                  <View style={styles.wave1} />
                  <View style={styles.wave2} />
                  <View style={styles.wave3} />
                </View>
              )}
            </View>

            <Text style={styles.biometricModalStatus}>
              {biometricSuccess ? 'Authentication Success!' : 'Verifying fingerprint/face...'}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    justifyContent: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoSquare: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#024C43',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCheck: {
    width: 8,
    height: 16,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: '#FFFFFF',
    transform: [{ rotate: '40deg' }],
    marginTop: -3,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#024C43',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 24,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#374151',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  forgotPassword: {
    fontSize: 11,
    fontWeight: '700',
    color: '#024C43',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: 8,
  },
  // Custom envelope icon
  mailEnvelope: {
    width: 18,
    height: 13,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    borderRadius: 2,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mailTriangle: {
    width: 10,
    height: 10,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderColor: '#9CA3AF',
    transform: [{ rotate: '45deg' }, { translateY: -1 }],
    position: 'absolute',
    top: 0,
  },
  // Custom lock icon
  lockBody: {
    width: 16,
    height: 12,
    backgroundColor: '#9CA3AF',
    borderRadius: 2,
    position: 'relative',
    marginTop: 6,
  },
  lockShackle: {
    width: 10,
    height: 10,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: '#9CA3AF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    position: 'absolute',
    top: -8,
    left: 3,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
    height: '100%',
  },
  // Custom eye icon
  eyeButton: {
    padding: 4,
  },
  eyeIconOuter: {
    width: 20,
    height: 12,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  eyePupil: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9CA3AF',
  },
  eyePupilActive: {
    backgroundColor: '#024C43',
  },
  eyeSlash: {
    position: 'absolute',
    width: 22,
    height: 2,
    backgroundColor: '#9CA3AF',
    transform: [{ rotate: '-35deg' }],
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 10,
  },
  checkboxSquare: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#024C43',
    borderColor: '#024C43',
  },
  checkboxCheckmark: {
    width: 5,
    height: 10,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#FFFFFF',
    transform: [{ rotate: '40deg' }],
    marginTop: -2,
  },
  checkboxLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4B5563',
  },
  loginButton: {
    height: 52,
    backgroundColor: '#024C43',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#024C43',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    marginHorizontal: 12,
    letterSpacing: 0.5,
  },
  biometricButton: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 26,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 32,
  },
  biometricIconWrapper: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  fingerprint1: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderBottomWidth: 0,
    borderColor: '#4B5563',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: 'absolute',
  },
  fingerprint2: {
    width: 10,
    height: 10,
    borderWidth: 1.5,
    borderBottomWidth: 0,
    borderColor: '#4B5563',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    position: 'absolute',
    top: 3,
  },
  fingerprint3: {
    width: 4,
    height: 4,
    backgroundColor: '#4B5563',
    borderRadius: 2,
    position: 'absolute',
    top: 6,
  },
  biometricText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4B5563',
  },
  signUpLinkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  signupPrompt: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  signupLinkText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#024C43',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 16,
  },
  footerLink: {
    fontSize: 11,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  footerDot: {
    fontSize: 11,
    color: '#D1D5DB',
  },
  // Biometric Overlay Style
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(2, 76, 67, 0.4)',
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  biometricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  biometricModalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#024C43',
    marginBottom: 24,
  },
  biometricScanArea: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  scanSuccess: {
    backgroundColor: '#E6F4EA',
    borderColor: '#34A853',
  },
  scanSuccessCheck: {
    width: 20,
    height: 36,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: '#34A853',
    transform: [{ rotate: '40deg' }],
    marginTop: -8,
  },
  biometricModalStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    textAlign: 'center',
  },
  fingerprintWaves: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  wave1: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: '#024C43',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'absolute',
  },
  wave2: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: '#024C43',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    top: 6,
  },
  wave3: {
    width: 8,
    height: 8,
    backgroundColor: '#024C43',
    borderRadius: 4,
    position: 'absolute',
    top: 12,
  },
});
