import React from 'react';
import { Tabs } from "expo-router";
import { View, StyleSheet, Text, Platform } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  const BRAND_DARK_TEAL = "#024C43";
  const ACTIVE_MINT = "#22C55E"; 
  const INACTIVE_GRAY = "#9CA3AF";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: BRAND_DARK_TEAL,
        tabBarInactiveTintColor: INACTIVE_GRAY,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginTop: 4,
        },
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 65 + insets.bottom : 70,
          paddingTop: 10,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 12,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.04,
          shadowRadius: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.labelText, { color: focused ? BRAND_DARK_TEAL : INACTIVE_GRAY }]}>Home</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={22} 
                color={focused ? BRAND_DARK_TEAL : INACTIVE_GRAY} 
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.labelText, { color: focused ? BRAND_DARK_TEAL : INACTIVE_GRAY }]}>Orders</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
              <Feather 
                name="box" 
                size={22} 
                color={focused ? BRAND_DARK_TEAL : INACTIVE_GRAY} 
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.labelText, { color: focused ? BRAND_DARK_TEAL : INACTIVE_GRAY }]}>Wallet</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
              <MaterialCommunityIcons 
                name={focused ? "wallet" : "wallet-outline"} 
                size={22} 
                color={focused ? BRAND_DARK_TEAL : INACTIVE_GRAY} 
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.labelText, { color: focused ? BRAND_DARK_TEAL : INACTIVE_GRAY }]}>Profile</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
              <Feather 
                name="user" 
                size={22} 
                color={focused ? BRAND_DARK_TEAL : INACTIVE_GRAY} 
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  activeIconWrapper: {
    backgroundColor: '#CCFBF1', 
  },
  labelText: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  }
});