import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OtpScreen() {
  const router = useRouter();

  // State variables
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Refs for auto-focusing next input
  const inputRef1 = useRef<TextInput>(null);
  const inputRef2 = useRef<TextInput>(null);
  const inputRef3 = useRef<TextInput>(null);
  const inputRef4 = useRef<TextInput>(null);
  const inputRefs = [inputRef1, inputRef2, inputRef3, inputRef4];

  // Countdown timer effect
  useEffect(() => {
    if (timerSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerSeconds]);

  const handleOtpChange = (value: string, index: number) => {
    // Keep only numbers
    const cleanValue = value.replace(/[^0-9]/g, '');
    
    const newOtp = [...otp];
    newOtp[index] = cleanValue;
    setOtp(newOtp);

    // Auto-focus next input if a number is typed
    if (cleanValue && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace auto-focus shifting
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 4) {
      setErrorMessage('Please enter the complete 4-digit code.');
      return;
    }
    setErrorMessage('');
    
    // Trigger Success Screen Modal
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      // Route to dashboard
      router.replace('/dashboard');
    }, 2000);
  };

  const handleResend = () => {
    if (timerSeconds > 0) return;
    setTimerSeconds(30);
    setOtp(['', '', '', '']);
    setErrorMessage('');
    inputRefs[0].current?.focus();
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          {/* Custom Back Arrow */}
          <View style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Buildrix Dispatch</Text>
        <View style={styles.placeholderWidth} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {/* Verification Icon */}
        <View style={styles.iconContainerWrapper}>
          <View style={styles.greenCircle}>
            {/* Handset/Phone vector icon inside circle */}
            <View style={styles.phoneDeviceIcon}>
              <View style={styles.deviceScreen} />
              <View style={styles.deviceKeyLine} />
            </View>
          </View>
        </View>

        {/* Text Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Verify Phone Number</Text>
          <Text style={styles.subtitle}>
            Enter the 4-digit code sent to <Text style={styles.phoneHighlight}>+234 812 345 6789</Text>
          </Text>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          {/* OTP Digit Circles */}
          <View style={styles.otpInputsContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                style={[
                  styles.otpInput,
                  digit ? styles.otpInputFilled : null
                ]}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={(val) => handleOtpChange(val, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                selectTextOnFocus
              />
            ))}
          </View>

          {/* Countdown & Resend Option */}
          <View style={styles.timerRow}>
            {timerSeconds > 0 ? (
              <Text style={styles.timerText}>Resend code in {formatTimer(timerSeconds)}</Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendText}>Resend Code</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Verify Button */}
          <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
            <Text style={styles.verifyButtonText}>Verify  →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Success Modal Overlay */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {/* Large Bouncing Success Checkmark container */}
            <View style={styles.successCheckCircle}>
              <View style={styles.successCheckmark} />
            </View>
            <Text style={styles.modalTitle}>Phone Verified!</Text>
            <Text style={styles.modalSubtitle}>Your dispatch profile has been successfully activated.</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  backArrow: {
    width: 10,
    height: 10,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#024C43',
    transform: [{ rotate: '45deg' }],
    marginLeft: 3,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#024C43',
  },
  placeholderWidth: {
    width: 40,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    alignItems: 'center',
  },
  iconContainerWrapper: {
    marginBottom: 28,
  },
  greenCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D1FAE5', // Light green
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneDeviceIcon: {
    width: 24,
    height: 38,
    borderWidth: 3,
    borderColor: '#059669', // Emerald green icon line
    borderRadius: 6,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceScreen: {
    width: 14,
    height: 22,
    borderBottomWidth: 2,
    borderColor: '#059669',
    position: 'absolute',
    top: 2,
  },
  deviceKeyLine: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#059669',
    position: 'absolute',
    bottom: 2,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 36,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#024C43',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  phoneHighlight: {
    color: '#111827',
    fontWeight: '700',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  otpInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  otpInput: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    backgroundColor: '#F9FAFB',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  otpInputFilled: {
    borderColor: '#024C43',
    backgroundColor: '#FFFFFF',
  },
  timerRow: {
    alignItems: 'center',
    marginBottom: 32,
  },
  timerText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  resendText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#024C43',
    textDecorationLine: 'underline',
  },
  verifyButton: {
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
  verifyButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Modal Overlays
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(2, 76, 67, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  successCheckCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successCheckmark: {
    width: 18,
    height: 32,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: '#059669',
    transform: [{ rotate: '40deg' }],
    marginTop: -6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#024C43',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 18,
  },
});
