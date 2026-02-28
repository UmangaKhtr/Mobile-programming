import React from "react";
import { Text, ScrollView } from "react-native";

export default function NotFound() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center", padding: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={{ fontSize: 18, fontWeight: "700" }}>Route not found</Text>
      <Text style={{ marginTop: 8, textAlign: "center" }}>
        Check your file names in the app folder (signin.js, generation.js, etc.).
      </Text>
    </ScrollView>
  );
}
