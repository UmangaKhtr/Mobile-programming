import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../src/ui/Themed";
import { auth } from "../../src/firebase";

export default function Profile() {
  const { t, mode } = useTheme();
  const user = auth.currentUser;
  const email = user?.email || "Signed in user";
  const createdAt = user?.metadata?.creationTime || "Not available";

  return (
    <ScrollView
      style={{ backgroundColor: t.bg }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.headerCard, { backgroundColor: t.card, borderColor: t.border }]}>
        <Ionicons name="person-circle" size={68} color={t.accent} />
        <Text style={{ color: t.text, fontSize: 18, fontWeight: "900", marginTop: 8 }}>User Profile</Text>
        <Text style={{ color: t.muted, marginTop: 4 }}>{email}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border }]}>
        <Text style={[styles.cardTitle, { color: t.text }]}>Account Details</Text>
        <Text style={{ color: t.muted, marginTop: 8 }}>Email: {email}</Text>
        <Text style={{ color: t.muted, marginTop: 8 }}>Theme: {mode}</Text>
        <Text style={{ color: t.muted, marginTop: 8 }}>Account created: {createdAt}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border }]}>
        <Text style={[styles.cardTitle, { color: t.text }]}>What You Can Do</Text>
        <View style={styles.row}>
          <Ionicons name="sparkles-outline" size={18} color={t.accent} />
          <Text style={[styles.rowText, { color: t.muted }]}>Use Generation Determiner to check your generation.</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="checkmark-circle-outline" size={18} color={t.accent} />
          <Text style={[styles.rowText, { color: t.muted }]}>Use Eligibility to get age-based guidance.</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="chatbubbles-outline" size={18} color={t.accent} />
          <Text style={[styles.rowText, { color: t.muted }]}>Use Contact Us to send your feedback.</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="settings-outline" size={18} color={t.accent} />
          <Text style={[styles.rowText, { color: t.muted }]}>Use Settings to toggle theme and log out.</Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border }]}>
        <Text style={[styles.cardTitle, { color: t.text }]}>Quick Tip</Text>
        <Text style={{ color: t.muted, marginTop: 10, textAlign: "center" }}>
          Open the navbar from top-left and explore all pages in order for the best demo flow.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 18 },
  headerCard: { borderWidth: 1, borderRadius: 22, padding: 18, alignItems: "center", marginBottom: 14 },
  card: { borderWidth: 1, borderRadius: 22, padding: 16, marginBottom: 12 },
  cardTitle: { fontSize: 17, fontWeight: "900" },
  row: { flexDirection: "row", alignItems: "center", marginTop: 10, gap: 8 },
  rowText: { flex: 1 },
});
