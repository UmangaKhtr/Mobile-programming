import React, { useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView, TextInput, Animated, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/ui/Themed";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../src/firebase";

function getGenerationFromBirthYear(birthYear) {
  // Exact generation boundaries requested.
  if (birthYear >= 1901 && birthYear <= 1927) return "Greatest (1901-1927)";
  if (birthYear >= 1928 && birthYear <= 1945) return "Silent (1928-1945)";
  if (birthYear >= 1946 && birthYear <= 1964) return "Baby Boomer (1946-1964)";
  if (birthYear >= 1965 && birthYear <= 1980) return "Gen X (1965-1980)";
  if (birthYear >= 1981 && birthYear <= 1996) return "Millennial (1981-1996)";
  if (birthYear >= 1997 && birthYear <= 2012) return "Gen Z (1997-2012)";
  if (birthYear >= 2013 && birthYear <= 2026) return "Gen Alpha (2013-2026)";
  return "Generation not found";
}

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

export default function Generation() {
  const { t } = useTheme();
  const router = useRouter();
  const [age, setAge] = useState(21);
  const [ageText, setAgeText] = useState("21");
  const [result, setResult] = useState(null);

  // Simple Animated API: fade + scale when result appears.
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.96)).current;

  const handleAgeTextChange = (value) => {
    setAgeText(value);
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      const clamped = Math.max(0, Math.min(120, Math.floor(parsed)));
      setAge(clamped);
    }
  };
  const changeAge = (nextAge) => {
    const clamped = Math.max(0, Math.min(120, nextAge));
    setAge(clamped);
    setAgeText(String(clamped));
  };
  const showResult = () => {
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - age;
    const generation = getGenerationFromBirthYear(birthYear);
    setResult({ generation, birthYear });

    fadeAnim.setValue(0);
    scaleAnim.setValue(0.96);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 260, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 260, useNativeDriver: true }),
    ]).start();
  };
  const tryAgain = () => {
    setAge(21);
    setAgeText("21");
    setResult(null);
  };
  const copyResult = async () => {
    if (!result) {
      Alert.alert("No result", "Tap 'Check Generation' first.");
      return;
    }

    const textToCopy = `Age: ${age}\nBirth year: ${result.birthYear}\nGeneration: ${result.generation}`;
    try {
      if (globalThis?.navigator?.clipboard?.writeText) {
        await globalThis.navigator.clipboard.writeText(textToCopy);
        Alert.alert("Copied", "Result copied to clipboard.");
      } else {
        Alert.alert("Clipboard not available", "Clipboard API is not available on this device.");
      }
    } catch (_e) {
      Alert.alert("Copy failed", "Could not copy result.");
    }
  };
  const useEligibility = async () => {
    if (!result) {
      Alert.alert("No result", "Tap 'Check Generation' first.");
      return;
    }

    try {
      await addDoc(collection(db, "eligibilityHistory"), {
        uid: auth.currentUser?.uid || null,
        email: auth.currentUser?.email || null,
        age,
        birthYear: result.birthYear,
        generation: result.generation,
        createdAt: serverTimestamp(),
        source: "generation",
      });
    } catch (_e) {
      Alert.alert("Save failed", "Could not store this record in Firebase.");
    }

    router.push({ pathname: "/(app)/eligibility", params: { age: String(age) } });
  };

  return (
    <ScrollView style={{ backgroundColor: t.bg }} contentContainerStyle={styles.container}>
      <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border }]}>
        <View style={styles.titleRow}>
          <Ionicons name="sparkles" size={24} color={t.accent} />
          <Text style={[styles.title, { color: "#00FFFF" }]}>Generation Determiner</Text>
        </View>
        <Text style={{ color: t.muted, marginTop: 4 }}>Change age and see your generation.</Text>
      </View>

      <View style={[styles.ageBox, { backgroundColor: t.card, borderColor: t.border }]}>
        <FadePressable style={[styles.circle, { borderColor: t.border }]} onPress={() => changeAge(age - 1)}>
          <Text style={[styles.circleText, { color: t.text }]}>-</Text>
        </FadePressable>

        <View style={[styles.pill, { backgroundColor: t.primary }]}>
          <TextInput
            value={ageText}
            onChangeText={handleAgeTextChange}
            keyboardType="number-pad"
            maxLength={3}
            style={styles.ageInput}
          />
        </View>

        <FadePressable style={[styles.circle, { borderColor: t.border }]} onPress={() => changeAge(age + 1)}>
          <Text style={[styles.circleText, { color: t.text }]}>+</Text>
        </FadePressable>
      </View>

      <View style={styles.rowButtons}>
        <FadePressable style={[styles.actionBtn, { backgroundColor: t.primary }]} onPress={showResult}>
          <Text style={styles.btnText}>Check Generation</Text>
        </FadePressable>
        <FadePressable style={[styles.actionBtn, { backgroundColor: t.card, borderColor: t.border, borderWidth: 1 }]} onPress={tryAgain}>
          <Text style={{ color: t.text, fontWeight: "900" }}>Try Again</Text>
        </FadePressable>
      </View>

      {result ? (
        <Animated.View
          style={[
            styles.resultCard,
            { backgroundColor: t.card, borderColor: t.border, opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Text style={[styles.resultLabel, { color: t.muted }]}>Estimated birth year: {result.birthYear}</Text>
          <Text style={[styles.resultText, { color: t.text }]}>{result.generation}</Text>
          <View style={styles.resultActions}>
            <FadePressable style={[styles.smallBtn, { backgroundColor: t.primary }]} onPress={copyResult}>
              <Text style={styles.btnText}>Copy Result</Text>
            </FadePressable>
            <FadePressable style={[styles.smallBtn, { backgroundColor: t.accent }]} onPress={useEligibility}>
              <Text style={{ color: "#0B1020", fontWeight: "900" }}>Use in Eligibility</Text>
            </FadePressable>
          </View>
        </Animated.View>
      ) : null}

      <Text style={{ color: t.muted, marginBottom: 8, fontWeight: "700" }}>Generation ranges</Text>

      <View style={[styles.row, { backgroundColor: t.card, borderColor: t.border }]}>
        <Text style={{ color: t.text, fontSize: 15 }}>Greatest (1901-1927)</Text>
      </View>
      <View style={[styles.row, { backgroundColor: t.card, borderColor: t.border }]}>
        <Text style={{ color: t.text, fontSize: 15 }}>Silent (1928-1945)</Text>
      </View>
      <View style={[styles.row, { backgroundColor: t.card, borderColor: t.border }]}>
        <Text style={{ color: t.text, fontSize: 15 }}>Baby Boomer (1946-1964)</Text>
      </View>
      <View style={[styles.row, { backgroundColor: t.card, borderColor: t.border }]}>
        <Text style={{ color: t.text, fontSize: 15 }}>Gen X (1965-1980)</Text>
      </View>
      <View style={[styles.row, { backgroundColor: t.card, borderColor: t.border }]}>
        <Text style={{ color: t.text, fontSize: 15 }}>Millennial (1981-1996)</Text>
      </View>
      <View style={[styles.row, { backgroundColor: t.card, borderColor: t.border }]}>
        <Text style={{ color: t.text, fontSize: 15 }}>Gen Z (1997-2012)</Text>
      </View>
      <View style={[styles.row, { backgroundColor: t.card, borderColor: t.border }]}>
        <Text style={{ color: t.text, fontSize: 15 }}>Gen Alpha (2013-2026)</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 18 },
  card: { borderWidth: 1, borderRadius: 20, padding: 16, marginBottom: 14 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { fontSize: 24, fontWeight: "900" },
  ageBox: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  circle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  circleText: { fontSize: 22, fontWeight: "900" },
  pill: { minWidth: 90, paddingVertical: 14, borderRadius: 16, alignItems: "center" },
  ageInput: { color: "white", fontSize: 24, fontWeight: "900", minWidth: 70, textAlign: "center" },
  rowButtons: { flexDirection: "row", gap: 10, marginTop: 12, marginBottom: 12 },
  actionBtn: { flex: 1, paddingVertical: 12, borderRadius: 14, alignItems: "center" },
  resultCard: {
    marginTop: 4,
    marginBottom: 14,
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  resultLabel: { fontSize: 15 },
  resultText: { fontSize: 22, fontWeight: "900", marginTop: 8 },
  resultActions: { flexDirection: "row", gap: 10, marginTop: 12 },
  smallBtn: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: "center" },
  btnText: { color: "white", fontWeight: "900" },
  row: { borderWidth: 1, borderRadius: 16, padding: 14, marginBottom: 10 },
});
