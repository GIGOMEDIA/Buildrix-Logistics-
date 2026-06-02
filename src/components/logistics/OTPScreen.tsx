import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface OTPScreenProps {
  onVerify: () => void;
  onBack: () => void;
}

export function OTPScreen({ onVerify, onBack }: OTPScreenProps) {
  const isDark = useColorScheme() === 'dark';
  const [code, setCode] = useState('');
  const inputRef = useRef<TextInput>(null);

  const handlePressBoxes = () => {
    inputRef.current?.focus();
  };

  const codeArray = code.split('');
  const boxCount = 4;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={[styles.container, { backgroundColor: isDark ? '#111214' : '#FFFFFF' }]}>
        {/* Top Header Row with Back Button */}
        <View style={styles.header}>
          <Pressable onPress={onBack} style={styles.backButton}>
            <Text style={[styles.backIcon, { color: isDark ? '#FFFFFF' : '#000000' }]}>←</Text>
          </Pressable>
          <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
            Verification
          </Text>
          <View style={{ width: 40 }} /> {/* Spacer */}
        </View>

        {/* Content Container */}
        <View style={styles.content}>
          <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
            Verify Account
          </Text>
          <Text style={[styles.subtitle, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
            We sent a 4-digit code to{' '}
            <Text style={{ fontWeight: '700', color: isDark ? '#FFF' : '#0B4A3A' }}>
              gratitude@gmail.com
            </Text>
          </Text>

          {/* OTP Code Circles Input */}
          <Pressable onPress={handlePressBoxes} style={styles.boxesContainer}>
            {Array.from({ length: boxCount }).map((_, index) => {
              const digit = codeArray[index] || '';
              const isFocused = code.length === index;

              return (
                <View
                  key={index}
                  style={[
                    styles.box,
                    {
                      backgroundColor: isDark ? '#1C1D21' : '#F4F5F7',
                      borderColor: isFocused
                        ? '#10B981'
                        : isDark
                        ? '#2C2E35'
                        : '#E4E6EB',
                      borderWidth: isFocused ? 2 : 1,
                    },
                  ]}
                >
                  <Text style={[styles.boxText, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
                    {digit}
                  </Text>
                </View>
              );
            })}
          </Pressable>

          {/* Hidden Input field to control keyboards */}
          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={(text: string) => {
              if (text.length <= boxCount) {
                setCode(text);
              }
            }}
            keyboardType="number-pad"
            maxLength={boxCount}
            style={styles.hiddenInput}
            autoFocus={true}
          />

          {/* Resend Link */}
          <View style={styles.resendContainer}>
            <Text style={[styles.resendLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
              Didn't receive code?{' '}
            </Text>
            <Pressable>
              <Text style={styles.resendLink}>Resend Code</Text>
            </Pressable>
          </View>
        </View>

        {/* Action Button at bottom */}
        <View style={styles.footer}>
          <Pressable
            onPress={() => {
              if (code.length === boxCount) {
                onVerify();
              }
            }}
            disabled={code.length !== boxCount}
            style={[
              styles.verifyButton,
              {
                backgroundColor: code.length === boxCount ? '#0B4A3A' : 'rgba(11, 74, 58, 0.4)',
              },
            ]}
          >
            <Text style={styles.verifyButtonText}>Verify</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  boxesContainer: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 80,
  },
  box: {
    width: 60,
    height: 60,
    borderRadius: 30, // Perfect circle placeholder
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  boxText: {
    fontSize: 22,
    fontWeight: '700',
  },
  hiddenInput: {
    opacity: 0,
    position: 'absolute',
    width: 0,
    height: 0,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  resendLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  resendLink: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    marginBottom: 16,
  },
  verifyButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0B4A3A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
