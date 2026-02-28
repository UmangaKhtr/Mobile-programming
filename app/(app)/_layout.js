import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { useTheme } from "../../src/ui/Themed";
import { auth } from "../../src/firebase";

export default function AppLayout() {
  const { t } = useTheme();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });
    return unsub;
  }, []);

  
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: t.bg }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/signin" />;
  }

  return (
    <Drawer
      initialRouteName="generation"
      drawerContent={(props) => (
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{ backgroundColor: t.card, flexGrow: 1, paddingTop: 10 }}
        >
          <View
            style={{
              paddingHorizontal: 16,
              paddingBottom: 12,
              borderBottomWidth: 1,
              borderBottomColor: t.border,
              alignItems: "center",
            }}
          >
            <Ionicons name="person-circle" size={44} color={t.accent} />
            <Text style={{ color: t.muted, marginTop: 6, textAlign: "center" }}>
              {auth.currentUser?.email || "Signed in user"}
            </Text>
          </View>
          <View style={{ marginTop: 8 }}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
      )}
      screenOptions={{
        headerStyle: { backgroundColor: t.bg },
        headerTintColor: t.text,
        headerTitleStyle: { fontWeight: "800" },
        headerTitle: () => <Ionicons name="sparkles" size={30} color={t.accent} />,
        sceneContainerStyle: { backgroundColor: t.bg },
        drawerStyle: { backgroundColor: t.card, paddingTop: 10 },
        drawerActiveTintColor: t.accent,
        drawerInactiveTintColor: t.muted,
        drawerLabelStyle: { marginLeft: -4, fontSize: 15, fontWeight: "700" },
        drawerActiveBackgroundColor: "rgba(36,210,181,0.15)",
        drawerItemStyle: { borderRadius: 12, marginHorizontal: 8, marginVertical: 2 },
      }}
    >
      <Drawer.Screen
        name="profile"
        options={{
          title: "User Profile",
          drawerIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="generation"
        options={{
          title: "Generation Determiner",
          drawerIcon: ({ color, size }) => <Ionicons name="sparkles-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="eligibility"
        options={{
          title: "Eligibility",
          drawerIcon: ({ color, size }) => <Ionicons name="checkmark-circle-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="contact"
        options={{
          title: "Contact Us",
          drawerIcon: ({ color, size }) => <Ionicons name="chatbubbles-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: "Settings",
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" color={color} size={size} />,
        }}
      />
    </Drawer>
  );
}
