import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, useColorScheme } from 'react-native';

interface WalletScreenProps {
  onBack: () => void;
  onAddFunds: () => void;
  onWithdraw: () => void;
}

export function WalletScreen({ onBack, onAddFunds, onWithdraw }: WalletScreenProps) {
  const isDark = useColorScheme() === 'dark';

  const txs = [
    { name: 'Delivery Payment', time: 'Today, 7:45 AM', type: 'debit', amount: '-₦2,500.00', status: 'Success' },
    { name: 'Withdrawal to GTBank', time: 'Yesterday, 10:15 AM', type: 'debit', amount: '-₦10,000.00', status: 'Completed' },
    { name: 'Wallet Top-up', time: '28 May, 9:00 AM', type: 'credit', amount: '+₦15,000.00', status: 'Success' },
    { name: 'Fuel Purchase', time: '25 May, 2:30 PM', type: 'debit', amount: '-₦4,500.00', status: 'Success' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#111214' : '#FFFFFF' }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={[styles.backIcon, { color: isDark ? '#FFFFFF' : '#000000' }]}>←</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
          Wallet
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Wallet Balance Card (Beautiful Green Gradient style) */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>AVAILABLE BALANCE</Text>
          <Text style={styles.balanceAmount}>₦24,500.00</Text>
          
          <View style={styles.cardButtonsRow}>
            <Pressable onPress={onAddFunds} style={styles.addFundsBtn}>
              <Text style={styles.addFundsBtnText}>➕ Add Funds</Text>
            </Pressable>
            <Pressable onPress={onWithdraw} style={styles.withdrawBtn}>
              <Text style={styles.withdrawBtnText}>💳 Withdraw</Text>
            </Pressable>
          </View>
        </View>

        {/* Quick Links Row */}
        <View style={styles.quickLinksRow}>
          <View style={styles.linkContainer}>
            <View style={[styles.linkIconCircle, { backgroundColor: isDark ? '#1C1D21' : '#F4F5F7' }]}>
              <Text style={styles.linkEmoji}>💸</Text>
            </View>
            <Text style={[styles.linkLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>Transfer</Text>
          </View>
          <View style={styles.linkContainer}>
            <View style={[styles.linkIconCircle, { backgroundColor: isDark ? '#1C1D21' : '#F4F5F7' }]}>
              <Text style={styles.linkEmoji}>🔍</Text>
            </View>
            <Text style={[styles.linkLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>Scan QR</Text>
          </View>
          <View style={styles.linkContainer}>
            <View style={[styles.linkIconCircle, { backgroundColor: isDark ? '#1C1D21' : '#F4F5F7' }]}>
              <Text style={styles.linkEmoji}>🧾</Text>
            </View>
            <Text style={[styles.linkLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>Bills</Text>
          </View>
          <View style={styles.linkContainer}>
            <View style={[styles.linkIconCircle, { backgroundColor: isDark ? '#1C1D21' : '#F4F5F7' }]}>
              <Text style={styles.linkEmoji}>📅</Text>
            </View>
            <Text style={[styles.linkLabel, { color: isDark ? '#B0B4BA' : '#60646C' }]}>History</Text>
          </View>
        </View>

        {/* Recent Transactions List */}
        <View style={styles.txSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
              Recent Transactions
            </Text>
            <Pressable>
              <Text style={styles.viewAllText}>View All</Text>
            </Pressable>
          </View>

          <View style={styles.txList}>
            {txs.map((tx, idx) => {
              const isCredit = tx.type === 'credit';
              return (
                <View
                  key={idx}
                  style={[
                    styles.txRow,
                    {
                      backgroundColor: isDark ? '#1C1D21' : '#F8F9FA',
                      borderColor: isDark ? '#2C2E35' : '#E9ECEF',
                    },
                  ]}
                >
                  <View style={styles.txLeft}>
                    <View
                      style={[
                        styles.txIconBg,
                        {
                          backgroundColor: isCredit ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                        },
                      ]}
                    >
                      <Text style={styles.txIconText}>{isCredit ? '📥' : '📤'}</Text>
                    </View>
                    <View style={styles.txMeta}>
                      <Text style={[styles.txTitle, { color: isDark ? '#FFFFFF' : '#0B4A3A' }]}>
                        {tx.name}
                      </Text>
                      <Text style={[styles.txTime, { color: isDark ? '#B0B4BA' : '#60646C' }]}>
                        {tx.time}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.txRight}>
                    <Text
                      style={[
                        styles.txAmount,
                        { color: isCredit ? '#10B981' : isDark ? '#FFFFFF' : '#0B4A3A' },
                      ]}
                    >
                      {tx.amount}
                    </Text>
                    <Text style={[styles.txStatus, { color: '#10B981' }]}>{tx.status}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Smart Savings Card */}
        <View style={[styles.savingsCard, { backgroundColor: isDark ? '#1C1D21' : '#E6F4EA', borderColor: isDark ? '#2C2E35' : '#D1E7DD' }]}>
          <View style={styles.savingsHeader}>
            <Text style={[styles.savingsTitle, { color: isDark ? '#10B981' : '#0F5132' }]}>
              Smart Savings
            </Text>
            <Text style={styles.savingsIcon}>🍯</Text>
          </View>
          <Text style={[styles.savingsDesc, { color: isDark ? '#B0B4BA' : '#0F5132' }]}>
            You have saved ₦3,000 in your savings bucket this month.
          </Text>
          <View style={styles.progressRow}>
            <View style={[styles.progressBarBg, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }]}>
              <View style={[styles.progressBarFill, { width: '30%' }]} />
            </View>
            <Text style={[styles.progressValText, { color: isDark ? '#FFF' : '#0F5132' }]}>
              30%
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
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
    gap: 24,
  },
  balanceCard: {
    backgroundColor: '#0B4A3A',
    borderRadius: 24,
    padding: 24,
    gap: 12,
    shadowColor: '#0B4A3A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  balanceLabel: {
    color: '#A7F3D0',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    marginVertical: 4,
  },
  cardButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  addFundsBtn: {
    flex: 1,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFundsBtnText: {
    color: '#0B4A3A',
    fontWeight: '700',
    fontSize: 13,
  },
  withdrawBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  withdrawBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  quickLinksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  linkContainer: {
    alignItems: 'center',
    gap: 8,
  },
  linkIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  linkEmoji: {
    fontSize: 20,
  },
  linkLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  txSection: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  viewAllText: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '700',
  },
  txList: {
    gap: 12,
  },
  txRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  txIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txIconText: {
    fontSize: 16,
  },
  txMeta: {
    gap: 2,
  },
  txTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  txTime: {
    fontSize: 11,
    fontWeight: '500',
  },
  txRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  txAmount: {
    fontSize: 14,
    fontWeight: '800',
  },
  txStatus: {
    fontSize: 10,
    fontWeight: '700',
  },
  savingsCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    gap: 8,
    marginBottom: 20,
  },
  savingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savingsTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  savingsIcon: {
    fontSize: 18,
  },
  savingsDesc: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 6,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
  },
  progressValText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
