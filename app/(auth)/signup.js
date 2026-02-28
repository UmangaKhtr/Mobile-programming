import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/firebase";
import { useTheme } from "../../src/ui/Themed";
import { useRouter } from "expo-router";

export default function SignUp() {
  const { t } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState("");

  const onSignUp = async () => {
    setErr("");
    if (!agree) return setErr("Please agree to Terms & Privacy.");
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/(app)/generation");
    } catch (e) {
      setErr(e?.message || "Sign up failed");
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
        <Text style={[styles.title, { color: t.text }]}>Sign Up</Text>

        {!!err && <Text style={[styles.err, { color: t.danger }]}>{err}</Text>}

        <Text style={[styles.label, { color: t.muted }]}>Email</Text>
        <TextInput
          style={[styles.input, { borderColor: t.border, color: t.text }]}
          placeholder="youremail@email.com"
          placeholderTextColor={t.muted}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text style={[styles.label, { color: t.muted }]}>Password</Text>
        <TextInput
          style={[styles.input, { borderColor: t.border, color: t.text }]}
          placeholder="Create a password"
          placeholderTextColor={t.muted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable
          style={[styles.checkRow, { borderColor: t.border }]}
          onPress={() => setAgree((v) => !v)}
        >
          <View style={[styles.checkbox, { borderColor: t.border, backgroundColor: agree ? t.accent : "transparent" }]} />
          <Text style={{ color: t.muted, flex: 1 }}>
            I agree to the <Text style={{ color: t.text, fontWeight: "800" }}>Terms</Text> and{" "}
            <Text style={{ color: t.text, fontWeight: "800" }}>Privacy Policy</Text>
          </Text>
        </Pressable>

        <Pressable style={[styles.btn, { backgroundColor: t.primary }]} onPress={onSignUp}>
          <Text style={styles.btnText}>Continue</Text>
        </Pressable>

        <Text style={{ color: t.muted, textAlign: "center", marginTop: 10 }}>
          Have an account?{" "}
          <Text style={{ color: t.accent, fontWeight: "900" }} onPress={() => router.replace("/(auth)/signin")}>
            Sign In
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: "center", justifyContent: "center", padding: 18 },
  card: { width: "100%", maxWidth: 420, padding: 18, borderRadius: 22, borderWidth: 1 },
  logo: { textAlign: "center", marginBottom: 6 },
  title: { fontSize: 26, fontWeight: "900", textAlign: "center", marginBottom: 14 },
  label: { marginTop: 10, marginBottom: 6, fontWeight: "700" },
  input: { borderWidth: 1, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, fontSize: 16 },
  btn: { marginTop: 16, paddingVertical: 14, borderRadius: 16, alignItems: "center" },
  btnText: { color: "white", fontWeight: "900", fontSize: 16 },
  err: { marginBottom: 8, fontWeight: "700" },
  checkRow: { marginTop: 12, borderWidth: 1, borderRadius: 16, padding: 12, flexDirection: "row", gap: 10, alignItems: "center" },
  checkbox: { width: 20, height: 20, borderWidth: 1, borderRadius: 6 },
});
