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

interface RateScreenProps {
  onSubmit: (rating: number, comment: string) => void;
  onBack: () => void;
}

export function RateScreen({ onSubmit, onBack }: RateScreenProps) {
  const isDark = useColorScheme() === 'dark';
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleStarPress = (index: number) => {
    setRating(index + 1);
  };

  const handleSubmit = () => {
    onSubmit(rating, comment);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={[styles.container, { backgroundColor: isDark ? '#111214' : '#FFFFFF' }]}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={onBack} style={styles.backButton}>
            <Text style={[styles.backIcon, { color: isDark ? '#FFFFFF' : '#000000' }]}>←</Text>
          </Pressable>
          <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
            Rate your Delivery
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Dispatcher Info */}
          <View style={styles.dispatcherCard}>
            <View style={styles.avatarBorder}>
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>CA</Text>
              </View>
            </View>
            <Text style={[styles.dispatcherName, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
              Chidi Azikiwe
            </Text>
            <Text style={[styles.dispatcherRole, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
              Your Delivery Dispatcher
            </Text>
          </View>

          {/* Rating Section */}
          <View style={styles.ratingSection}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
              HOW WAS YOUR EXPERIENCE?
            </Text>
            
            <View style={styles.starsRow}>
              {[0, 1, 2, 3, 4].map((index) => {
                const isFilled = index < rating;
                return (
                  <Pressable
                    key={index}
                    onPress={() => handleStarPress(index)}
                    style={styles.starButton}
                  >
                    <Text
                      style={[
                        styles.starIcon,
                        { color: isFilled ? '#10B981' : isDark ? '#2C2E35' : '#E4E6EB' },
                      ]}
                    >
                      ★
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Comments input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
              ADD A COMMENT
            </Text>
            <TextInput
              value={comment}
              onChangeText={setComment}
              placeholder="Tell us more about the service..."
              placeholderTextColor={isDark ? '#60646C' : '#9095A0'}
              multiline
              numberOfLines={4}
              style={[
                styles.textArea,
                {
                  backgroundColor: isDark ? '#1C1D21' : '#F4F5F7',
                  color: isDark ? '#FFFFFF' : '#000000',
                  borderColor: isDark ? '#2C2E35' : '#E4E6EB',
                },
              ]}
            />
          </View>

          {/* Submit Button */}
          <Pressable onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </Pressable>

          <Text style={[styles.infoNote, { color: isDark ? '#60646C' : '#9095A0' }]}>
            Your feedback helps us improve the Buildrix network.
          </Text>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backIcon: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 24,
    gap: 32,
    alignItems: 'center',
  },
  dispatcherCard: {
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  avatarBorder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    marginBottom: 8,
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 44,
    backgroundColor: '#0B4A3A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  dispatcherName: {
    fontSize: 20,
    fontWeight: '800',
  },
  dispatcherRole: {
    fontSize: 13,
    fontWeight: '600',
  },
  ratingSection: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  starButton: {
    padding: 4,
  },
  starIcon: {
    fontSize: 44,
  },
  inputGroup: {
    width: '100%',
    gap: 8,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  textArea: {
    height: 120,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    fontSize: 14,
    fontWeight: '500',
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#0B4A3A',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#0B4A3A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  infoNote: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 16,
  },
});
