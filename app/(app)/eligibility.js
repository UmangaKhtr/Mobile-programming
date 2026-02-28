import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "../../src/ui/Themed";

function getSimpleAdvice(ageText, countryText, nameText) {
  const age = Number(ageText);
  const country = (countryText || "").toLowerCase();
  const name = (nameText || "User").trim() || "User";

  if (!Number.isFinite(age) || age < 0) {
    return {
      title: "Enter a valid age",
      voting: "Please type a valid age number.",
      others: "After adding age, you will see age-group guidance.",
      enjoy: "Start with small goals, healthy routine, and learning mindset.",
    };
  }

  let votingText = "This app currently gives voting guidance for Nepal.";
  if (country.includes("nepal")) {
    if (age >= 18) {
      votingText = `${name}, you can vote in Nepal because you are ${age}.`;
    } else {
      votingText = `${name}, you cannot vote in Nepal yet. Voting starts at age 18.`;
    }
  }

  if (age < 16) {
    return {
      title: "Teen stage",
      voting: votingText,
      others: "Many people your age focus on school, hobbies, and basic life skills.",
      enjoy: "Play sports, build one creative hobby, and spend quality time with friends/family.",
    };
  }

  if (age < 25) {
    return {
      title: "Young adult stage",
      voting: votingText,
      others: "Many people your age focus on studies, first jobs, and learning independence.",
      enjoy: "Try internships/projects, build strong friendships, and take care of sleep and health.",
    };
  }

  if (age < 40) {
    return {
      title: "Adult stage",
      voting: votingText,
      others: "Many people your age focus on career growth, money planning, and relationships.",
      enjoy: "Balance work and life, save money regularly, and keep one hobby active.",
    };
  }

  if (age < 60) {
    return {
      title: "Mid-life stage",
      voting: votingText,
      others: "Many people your age focus on family responsibilities and stable long-term planning.",
      enjoy: "Protect your health, reduce stress, and spend more time on meaningful relationships.",
    };
  }

  return {
    title: "Senior stage",
    voting: votingText,
    others: "Many people your age focus on health, peace of mind, and sharing life experience.",
    enjoy: "Stay active, stay connected with community, and continue hobbies you enjoy.",
  };
}

export default function Eligibility() {
  const { t } = useTheme();
  const params = useLocalSearchParams();
  const [name, setName] = useState("User");
  const [age, setAge] = useState("21");
  const [country, setCountry] = useState("Nepal");

  useEffect(() => {
    if (typeof params.age === "string" && params.age.trim() !== "") {
      setAge(params.age);
    }
  }, [params.age]);

  const advice = getSimpleAdvice(age, country, name);

  return (
    <ScrollView
      style={{ backgroundColor: t.bg }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.title, { color: t.text }]}>Eligibility</Text>
      <Text style={{ color: t.muted, marginBottom: 12 }}>Simple age-based guidance for your presentation.</Text>

      <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border }]}>
        <Text style={[styles.label, { color: t.muted }]}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={[styles.input, { borderColor: t.border, color: t.text }]}
        />

        <Text style={[styles.label, { color: t.muted }]}>Age</Text>
        <TextInput
          value={age}
          onChangeText={setAge}
          keyboardType="number-pad"
          style={[styles.input, { borderColor: t.border, color: t.text }]}
        />

        <Text style={[styles.label, { color: t.muted }]}>Country</Text>
        <TextInput
          value={country}
          onChangeText={setCountry}
          style={[styles.input, { borderColor: t.border, color: t.text }]}
        />

        <View style={[styles.result, { borderColor: t.border }]}>
          <Text style={{ color: t.text, fontWeight: "900", fontSize: 17 }}>{advice.title}</Text>
          <Text style={{ color: t.muted, marginTop: 8 }}>Voting: {advice.voting}</Text>
          <Text style={{ color: t.muted, marginTop: 8 }}>Others your age: {advice.others}</Text>
          <Text style={{ color: t.muted, marginTop: 8 }}>Enjoy life: {advice.enjoy}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 18 },
  title: { fontSize: 22, fontWeight: "900", marginBottom: 6 },
  card: { borderWidth: 1, borderRadius: 22, padding: 16 },
  label: { marginTop: 10, marginBottom: 6, fontWeight: "800" },
  input: { borderWidth: 1, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 10 },
  result: { marginTop: 14, borderWidth: 1, borderRadius: 16, padding: 12 },
});
