import React, { useRef, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/firebase";
import { useTheme } from "../../src/ui/Themed";
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

export default function SignIn() {
  const { t } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSignIn = async () => {
    setErr("");
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/(app)/generation");
    } catch (e) {
      setErr(e?.message || "Sign in failed");
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: t.bg }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border }]}>
        <Ionicons name="sparkles" size={38} color={t.accent} style={styles.logo} />
        <Text style={[styles.title, { color: t.text }]}>Sign In</Text>

        {!!err && <Text style={[styles.err, { color: t.danger }]}>{err}</Text>}

        <Text style={[styles.label, { color: t.muted }]}>Email</Text>
        <TextInput
          style={[styles.input, { borderColor: t.border, color: t.text }]}
          placeholder="123generation@email.com"
          placeholderTextColor={t.muted}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text style={[styles.label, { color: t.muted }]}>Password</Text>
        <TextInput
          style={[styles.input, { borderColor: t.border, color: t.text }]}
          placeholder="Password"
          placeholderTextColor={t.muted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <FadePressable style={[styles.btn, { backgroundColor: t.primary }]} onPress={onSignIn}>
          <Text style={styles.btnText}>Sign in</Text>
        </FadePressable>

        <View style={styles.switchRow}>
          <Text style={{ color: t.muted }}>Don&apos;t have an account?</Text>
          <FadePressable onPress={() => router.push("/(auth)/signup")}>
            <Text style={{ color: t.accent, fontWeight: "900" }}>Sign Up</Text>
          </FadePressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: "center", justifyContent: "center", padding: 18 },
  card: { width: "100%", maxWidth: 420, padding: 18, borderRadius: 22, borderWidth: 1 },
  logo: { fontSize: 32, textAlign: "center", marginBottom: 6, fontWeight: "900", letterSpacing: 1 },
  title: { fontSize: 26, fontWeight: "900", textAlign: "center", marginBottom: 14 },
  label: { marginTop: 10, marginBottom: 6, fontWeight: "700" },
  input: { borderWidth: 1, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, fontSize: 16 },
  btn: { marginTop: 16, paddingVertical: 14, borderRadius: 16, alignItems: "center" },
  btnText: { color: "white", fontWeight: "900", fontSize: 16 },
  err: { marginBottom: 8, fontWeight: "700" },
  switchRow: { marginTop: 10, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6 },
});
