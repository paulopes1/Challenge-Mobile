import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

type Result = {
  id: string;
  date: string;
  bpm: number;
  status: string;
};

const fakeData: Result[] = [
  { id: "1", date: "20/09/2025 14:05", bpm: 72, status: "✅ Apto" },
  { id: "2", date: "20/09/2025 13:42", bpm: 135, status: "❌ Não apto - Frequência alta" },
  { id: "3", date: "20/09/2025 13:10", bpm: 65, status: "✅ Apto" },
  { id: "4", date: "19/09/2025 21:33", bpm: 48, status: "❌ Não apto - Frequência baixa" },
  { id: "5", date: "19/09/2025 20:58", bpm: 88, status: "✅ Apto" },
];

export default function ResultsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Histórico de Análises</Text>
      <FlatList
        data={fakeData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.bpm}>BPM: {item.bpm}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  card: {
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  date: { fontSize: 14, color: "#666", marginBottom: 5 },
  bpm: { fontSize: 16, fontWeight: "600" },
  status: { fontSize: 16, marginTop: 5 },
});
