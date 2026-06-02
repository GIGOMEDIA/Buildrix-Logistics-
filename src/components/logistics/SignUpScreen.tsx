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

interface SignUpScreenProps {
  onCreateAccount: () => void;
  onSignInClick: () => void;
}

export function SignUpScreen({ onCreateAccount, onSignInClick }: SignUpScreenProps) {
  const isDark = useColorScheme() === 'dark';
  const [fullName, setFullName] = useState('Gratitude Owoade');
  const [email, setEmail] = useState('gratitude@gmail.com');
  const [phone, setPhone] = useState('+234 812 345 6789');
  const [password, setPassword] = useState('••••••••');
  const [secureText, setSecureText] = useState(true);
  const [agreed, setAgreed] = useState(true);

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
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>Buildrix</Text>
          <Text style={[styles.subtitle, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
            Create your logistics account
          </Text>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
              Full Name
            </Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="e.g. John Doe"
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
            <Text style={[styles.inputLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
              Phone Number
            </Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="e.g. +234 80 1234 5678"
              placeholderTextColor={isDark ? '#60646C' : '#9095A0'}
              keyboardType="phone-pad"
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
              Password
            </Text>
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

          {/* Terms Agreement Checkbox */}
          <Pressable onPress={() => setAgreed(!agreed)} style={styles.checkboxRow}>
            <View
              style={[
                styles.checkbox,
                {
                  backgroundColor: agreed ? '#0B4A3A' : 'transparent',
                  borderColor: agreed ? '#0B4A3A' : '#E4E6EB',
                },
              ]}
            >
              {agreed && <Text style={styles.checkIcon}>✓</Text>}
            </View>
            <Text style={[styles.checkboxLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
              I agree to the terms and conditions of service
            </Text>
          </Pressable>

          {/* Create Account Button */}
          <Pressable onPress={onCreateAccount} style={styles.createButton}>
            <Text style={styles.createButtonText}>Create Account</Text>
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

        {/* Sign In Footer */}
        <View style={styles.signInFooter}>
          <Text style={[styles.signInPrompt, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
            Already have an account?{' '}
          </Text>
          <Pressable onPress={onSignInClick}>
            <Text style={styles.signInLink}>Sign in</Text>
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
    marginBottom: 28,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
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
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  passwordInputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    height: 54,
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
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
    paddingRight: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  checkboxLabel: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  createButton: {
    backgroundColor: '#0B4A3A',
    height: 54,
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
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  oauthSection: {
    marginTop: 24,
    gap: 16,
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
    height: 50,
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
  signInFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 20,
  },
  signInPrompt: {
    fontSize: 14,
    fontWeight: '500',
  },
  signInLink: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '700',
  },
});
