import React, { useRef } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Animated } from "react-native";
import { useTheme } from "../../src/ui/Themed";
import { signOut } from "firebase/auth";
import { auth } from "../../src/firebase";
import { useRouter } from "expo-router";

function FadePressable({ children, style, onPress }) {
  const opacity = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.timing(opacity, { toValue: 0.68, duration: 120, useNativeDriver: true }).start();
  };

  const onPressOut = () => {
    Animated.timing(opacity, { toValue: 1, duration: 160, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ opacity }}>
      <Pressable style={style} onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
        {children}
      </Pressable>
    </Animated.View>
  );
}

export default function Settings() {
  const { t, mode, setMode } = useTheme();
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    router.replace("/(auth)/signin");
  };

  return (
    <ScrollView
      style={{ backgroundColor: t.bg }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: t.text }]}>Settings</Text>

      <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border }]}>
        <Text style={{ color: t.text, fontWeight: "900" }}>Theme</Text>
        <Text style={{ color: t.muted, marginTop: 4 }}>Current: {mode.toUpperCase()}</Text>

        <FadePressable style={[styles.btn, { backgroundColor: t.primary }]} onPress={() => setMode(mode === "dark" ? "light" : "dark")}>
          <Text style={{ color: "white", fontWeight: "900" }}>Toggle Theme</Text>
        </FadePressable>

        <FadePressable style={[styles.btn, { backgroundColor: t.danger }]} onPress={logout}>
          <Text style={{ color: "white", fontWeight: "900" }}>Log out</Text>
        </FadePressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 18 },
  title: { fontSize: 22, fontWeight: "900", marginBottom: 12 },
  card: { borderWidth: 1, borderRadius: 22, padding: 16 },
  btn: { marginTop: 12, paddingVertical: 12, borderRadius: 16, alignItems: "center" },
});
