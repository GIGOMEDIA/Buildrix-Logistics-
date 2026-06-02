import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

interface LoginScreenProps {
  onSignIn: () => void;
  onSignUpClick: () => void;
}

export function LoginScreen({ onSignIn, onSignUpClick }: LoginScreenProps) {
  const isDark = useColorScheme() === 'dark';
  const [email, setEmail] = useState('manager@buildrix.com');
  const [password, setPassword] = useState('••••••••');
  const [secureText, setSecureText] = useState(true);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: isDark ? '#111214' : '#FFFFFF' },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Header */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>R</Text>
          </View>
          <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>Buildrix</Text>
          <Text style={[styles.subtitle, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
            Logistics & Dispatch Management
          </Text>
        </View>

        {/* Input Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
              Email Address
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="e.g. yourname@domain.com"
              placeholderTextColor={isDark ? '#60646C' : '#9095A0'}
              keyboardType="email-address"
              autoCapitalize="none"
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
            <View style={styles.passwordHeader}>
              <Text style={[styles.inputLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                Password
              </Text>
              <Pressable>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </Pressable>
            </View>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                placeholderTextColor={isDark ? '#60646C' : '#9095A0'}
                secureTextEntry={secureText}
                style={[
                  styles.input,
                  {
                    backgroundColor: isDark ? '#1C1D21' : '#F4F5F7',
                    color: isDark ? '#FFFFFF' : '#000000',
                    borderColor: isDark ? '#2C2E35' : '#E4E6EB',
                    paddingRight: 50,
                  },
                ]}
              />
              <Pressable
                onPress={() => setSecureText(!secureText)}
                style={styles.eyeButton}
              >
                <Text style={styles.eyeIcon}>{secureText ? '👁️' : '🔒'}</Text>
              </Pressable>
            </View>
          </View>

          {/* Sign In Button */}
          <Pressable onPress={onSignIn} style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </Pressable>
        </View>

        {/* OAuth / Social Logins */}
        <View style={styles.oauthSection}>
          <View style={styles.dividerRow}>
            <View style={[styles.dividerLine, { backgroundColor: isDark ? '#2C2E35' : '#E4E6EB' }]} />
            <Text style={[styles.dividerText, { color: isDark ? '#60646C' : '#9095A0' }]}>
              or connect with
            </Text>
            <View style={[styles.dividerLine, { backgroundColor: isDark ? '#2C2E35' : '#E4E6EB' }]} />
          </View>

          <View style={styles.socialButtonsRow}>
            <Pressable
              style={[
                styles.socialButton,
                {
                  backgroundColor: isDark ? '#1C1D21' : '#F4F5F7',
                  borderColor: isDark ? '#2C2E35' : '#E4E6EB',
                },
              ]}
            >
              <Text style={styles.socialIcon}>📘</Text>
              <Text style={[styles.socialText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                Facebook
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.socialButton,
                {
                  backgroundColor: isDark ? '#1C1D21' : '#F4F5F7',
                  borderColor: isDark ? '#2C2E35' : '#E4E6EB',
                },
              ]}
            >
              <Text style={styles.socialIcon}>🔴</Text>
              <Text style={[styles.socialText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                Google
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signUpFooter}>
          <Text style={[styles.signUpPrompt, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
            Don't have an account?{' '}
          </Text>
          <Pressable onPress={onSignUpClick}>
            <Text style={styles.signUpLink}>Sign up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 36,
    marginTop: 20,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0B4A3A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    color: '#10B981',
    fontWeight: '900',
    fontSize: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '600',
  },
  passwordInputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 15,
    fontWeight: '500',
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: {
    fontSize: 18,
  },
  signInButton: {
    backgroundColor: '#0B4A3A',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#0B4A3A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  oauthSection: {
    marginTop: 32,
    gap: 20,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 13,
    fontWeight: '500',
  },
  socialButtonsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  socialIcon: {
    fontSize: 16,
  },
  socialText: {
    fontSize: 14,
    fontWeight: '600',
  },
  signUpFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
    marginBottom: 20,
  },
  signUpPrompt: {
    fontSize: 14,
    fontWeight: '500',
  },
  signUpLink: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '700',
  },
});
