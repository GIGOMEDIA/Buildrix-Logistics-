import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface ChatScreenProps {
  onBack: () => void;
}

interface Message {
  id: string;
  sender: 'rider' | 'customer';
  text: string;
  time: string;
}

export function ChatScreen({ onBack }: ChatScreenProps) {
  const isDark = useColorScheme() === 'dark';
  const scrollViewRef = useRef<ScrollView>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'rider',
      text: "Hello! I've picked up your package from the Ikeja hub. I'm currently 15 minutes away from your location.",
      time: '10:10 AM',
    },
    {
      id: '2',
      sender: 'customer',
      text: 'Great, thank you Chinedu! Please call me once you arrive at the gate. The security might need to confirm your details.',
      time: '10:12 AM',
    },
    {
      id: '3',
      sender: 'rider',
      text: "Noted. I just reached Maryland. Traffic is a bit heavy but I'll try my best to be there on time.",
      time: '10:15 AM',
    },
    {
      id: '4',
      sender: 'customer',
      text: "Safe travels! We've sent you the gate pass code via SMS as well, just in case.",
      time: '10:20 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'customer',
      text: inputText.trim(),
      time: formattedTime,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={[styles.container, { backgroundColor: isDark ? '#111214' : '#FFFFFF' }]}>
        {/* Chat Header */}
        <View style={[styles.header, { borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
          <View style={styles.headerLeft}>
            <Pressable onPress={onBack} style={styles.backButton}>
              <Text style={[styles.backIcon, { color: isDark ? '#FFFFFF' : '#000000' }]}>←</Text>
            </Pressable>
            <View style={styles.riderAvatar}>
              <Text style={styles.avatarText}>CO</Text>
              <View style={styles.activeDot} />
            </View>
            <View style={styles.riderInfo}>
              <Text style={[styles.riderName, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
                Chinedu Okafor
              </Text>
              <Text style={[styles.riderStatus, { color: '#10B981' }]}>Active Now</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Pressable style={styles.iconButton}>
              <Text style={styles.actionIcon}>📞</Text>
            </Pressable>
            <Pressable style={styles.iconButton}>
              <Text style={styles.actionIcon}>⋮</Text>
            </Pressable>
          </View>
        </View>

        {/* Messages Scroll Area */}
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          <View style={styles.dateSeparator}>
            <Text style={[styles.dateText, { color: isDark ? '#60646C' : '#9095A0' }]}>TODAY</Text>
          </View>

          {messages.map((msg) => {
            const isRider = msg.sender === 'rider';
            return (
              <View
                key={msg.id}
                style={[
                  styles.messageWrapper,
                  isRider ? styles.msgLeft : styles.msgRight,
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    isRider
                      ? [styles.bubbleRider, { backgroundColor: isDark ? '#1C1D21' : '#F4F5F7' }]
                      : [styles.bubbleCustomer, { backgroundColor: '#0B4A3A' }],
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      { color: isRider ? (isDark ? '#FFFFFF' : '#0B4A3A') : '#FFFFFF' },
                    ]}
                  >
                    {msg.text}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.messageTime,
                    isRider ? styles.timeLeft : styles.timeRight,
                    { color: isDark ? '#60646C' : '#9095A0' },
                  ]}
                >
                  {msg.time}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        {/* Input Bar */}
        <View
          style={[
            styles.inputBar,
            {
              borderTopColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              backgroundColor: isDark ? '#111214' : '#FFFFFF',
            },
          ]}
        >
          <Pressable style={styles.attachButton}>
            <Text style={styles.attachIcon}>📎</Text>
          </Pressable>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor={isDark ? '#60646C' : '#9095A0'}
            onSubmitEditing={handleSend}
            style={[
              styles.input,
              {
                backgroundColor: isDark ? '#1C1D21' : '#F4F5F7',
                color: isDark ? '#FFFFFF' : '#000000',
              },
            ]}
          />
          <Pressable onPress={handleSend} style={styles.sendButton}>
            <Text style={styles.sendIcon}>➔</Text>
          </Pressable>
        </View>
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backButton: {
    paddingRight: 8,
  },
  backIcon: {
    fontSize: 22,
    fontWeight: '700',
  },
  riderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0B4A3A',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  activeDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  riderInfo: {
    justifyContent: 'center',
  },
  riderName: {
    fontSize: 14,
    fontWeight: '700',
  },
  riderStatus: {
    fontSize: 11,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 16,
  },
  scrollContent: {
    padding: 16,
    gap: 20,
  },
  dateSeparator: {
    alignItems: 'center',
    marginVertical: 8,
  },
  dateText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  messageWrapper: {
    maxWidth: '80%',
    gap: 4,
  },
  msgLeft: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  msgRight: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  messageBubble: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  bubbleRider: {
    borderTopLeftRadius: 4,
  },
  bubbleCustomer: {
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  messageTime: {
    fontSize: 10,
    fontWeight: '500',
  },
  timeLeft: {
    marginLeft: 4,
  },
  timeRight: {
    marginRight: 4,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    gap: 8,
  },
  attachButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachIcon: {
    fontSize: 20,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0B4A3A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
