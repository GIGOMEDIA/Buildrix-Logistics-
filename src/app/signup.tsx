import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  const router = useRouter();

  // State variables
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateAccount = () => {
    if (!fullName || !email || !phoneNumber || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    if (!agreeTerms) {
      setErrorMessage('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }
    setErrorMessage('');
    // Route to OTP screen
    router.push('/otp');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.brandTitle}>Buildrix</Text>
          <Text style={styles.createAccountText}>Create your account</Text>
          <Text style={styles.subtitleText}>Start your journey as a dispatch professional today.</Text>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          {/* Full Name field */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>FULL NAME</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.iconContainer}>
                {/* Profile Icon shape */}
                <View style={styles.profileIconWrapper}>
                  <View style={styles.profileHead} />
                  <View style={styles.profileShoulders} />
                </View>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Adebayo Chukwuma"
                placeholderTextColor="#9CA3AF"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>

          {/* Email field */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.iconContainer}>
                {/* Mail Icon shape */}
                <View style={styles.mailEnvelope}>
                  <View style={styles.mailTriangle} />
                </View>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="adebayo@example.com"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Phone Number field */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>PHONE NUMBER</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.iconContainer}>
                {/* Phone Icon shape */}
                <View style={styles.phoneIcon}>
                  <View style={styles.phoneReceiver} />
                </View>
              </View>
              <Text style={styles.countryCode}>+234</Text>
              <TextInput
                style={[styles.textInput, { paddingLeft: 6 }]}
                placeholder="800 000 0000"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
          </View>

          {/* Password field */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>PASSWORD</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.iconContainer}>
                {/* Lock Icon shape */}
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

          {/* Agreement Checkbox */}
          <TouchableOpacity 
            style={styles.checkboxRow} 
            activeOpacity={0.8}
            onPress={() => setAgreeTerms(!agreeTerms)}
          >
            <View style={[styles.checkboxSquare, agreeTerms ? styles.checkboxChecked : null]}>
              {agreeTerms && <View style={styles.checkboxCheckmark} />}
            </View>
            <Text style={styles.checkboxLabel}>
              I agree to the <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          {/* Create Account Button */}
          <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount}>
            <Text style={styles.createButtonText}>Create Account  →</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Alternatives row */}
        <View style={styles.alternativesRow}>
          {/* Google Button */}
          <TouchableOpacity style={styles.altButton}>
            <View style={styles.googleIconWrapper}>
              <View style={styles.googleIconCircle}>
                <Text style={styles.googleLetter}>G</Text>
              </View>
            </View>
            <Text style={styles.altButtonText}>Google</Text>
          </TouchableOpacity>

          {/* Passkey Button */}
          <TouchableOpacity style={styles.altButton}>
            <View style={styles.keyIconWrapper}>
              <View style={styles.biometricIconWrapper}>
                <View style={styles.fingerprint1} />
                <View style={styles.fingerprint2} />
                <View style={styles.fingerprint3} />
              </View>
            </View>
            <Text style={styles.altButtonText}>Passkey</Text>
          </TouchableOpacity>
        </View>

        {/* Already have an account row */}
        <View style={styles.signInRow}>
          <Text style={styles.signInPrompt}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.signInLinkText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingTop: 36,
    paddingBottom: 24,
    justifyContent: 'center',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#024C43',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  createAccountText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 6,
  },
  subtitleText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 12,
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
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4B5563',
    letterSpacing: 0.5,
    marginBottom: 8,
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
  // Custom profile icon
  profileIconWrapper: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileHead: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9CA3AF',
    position: 'absolute',
    top: 0,
  },
  profileShoulders: {
    width: 16,
    height: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#9CA3AF',
    position: 'absolute',
    bottom: 0,
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
  // Custom phone icon
  phoneIcon: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneReceiver: {
    width: 12,
    height: 12,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#9CA3AF',
    borderBottomLeftRadius: 4,
    transform: [{ rotate: '-45deg' }],
  },
  countryCode: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginRight: 4,
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
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
    height: '100%',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    gap: 10,
  },
  checkboxSquare: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#024C43',
    borderColor: '#024C43',
  },
  checkboxCheckmark: {
    width: 4,
    height: 8,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#FFFFFF',
    transform: [{ rotate: '40deg' }],
    marginTop: -2,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
    lineHeight: 18,
  },
  linkText: {
    color: '#024C43',
    fontWeight: '700',
  },
  createButton: {
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
  createButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#9CA3AF',
    marginHorizontal: 12,
    letterSpacing: 0.5,
  },
  alternativesRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  altButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  altButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4B5563',
  },
  googleIconWrapper: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIconCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EA4335',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleLetter: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '900',
  },
  keyIconWrapper: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  biometricIconWrapper: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  fingerprint1: {
    width: 14,
    height: 14,
    borderWidth: 1.5,
    borderBottomWidth: 0,
    borderColor: '#4B5563',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    position: 'absolute',
  },
  fingerprint2: {
    width: 8,
    height: 8,
    borderWidth: 1.5,
    borderBottomWidth: 0,
    borderColor: '#4B5563',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    position: 'absolute',
    top: 3,
  },
  fingerprint3: {
    width: 3,
    height: 3,
    backgroundColor: '#4B5563',
    borderRadius: 1.5,
    position: 'absolute',
    top: 5,
  },
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 24,
  },
  signInPrompt: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  signInLinkText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#024C43',
  },
});
