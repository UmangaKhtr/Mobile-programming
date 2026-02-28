import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert, ScrollView } from "react-native";
import { useTheme } from "../../src/ui/Themed";

export default function Contact() {
  const { t } = useTheme();
  const [msg, setMsg] = useState("");

  const send = () => {
    Alert.alert("Sent!", "Your feedback was recorded (demo).");
    setMsg("");
  };

  return (
    <ScrollView
      style={{ backgroundColor: t.bg }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.title, { color: t.text }]}>Contact Us</Text>
      <Text style={{ color: t.muted, marginBottom: 12 }}>Give feedback - your feedback is important!</Text>

      <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border }]}>
        <TextInput
          value={msg}
          onChangeText={setMsg}
          placeholder="Type your message..."
          placeholderTextColor={t.muted}
          multiline
          style={[styles.box, { borderColor: t.border, color: t.text }]}
        />

        <Pressable style={[styles.btn, { backgroundColor: t.accent }]} onPress={send}>
          <Text style={{ color: "#0B1020", fontWeight: "900" }}>Send</Text>
        </Pressable>

        <View style={styles.icons}>
          <Text style={[styles.icon, { color: t.text }]}>FAQ</Text>
          <Text style={[styles.icon, { color: t.text }]}>Email</Text>
          <Text style={[styles.icon, { color: t.text }]}>Phone</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 18 },
  title: { fontSize: 22, fontWeight: "900", marginBottom: 6 },
  card: { borderWidth: 1, borderRadius: 22, padding: 16 },
  box: { minHeight: 160, borderWidth: 1, borderRadius: 16, padding: 12, textAlignVertical: "top" },
  btn: { marginTop: 12, paddingVertical: 12, borderRadius: 16, alignItems: "center" },
  icons: { marginTop: 16, flexDirection: "row", justifyContent: "space-around" },
  icon: { fontSize: 14, fontWeight: "700" },
});
