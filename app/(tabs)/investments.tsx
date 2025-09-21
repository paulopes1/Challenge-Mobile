import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useAuth } from "../../src/contexts/AuthContext";

// Função simples para avaliar os batimentos
function evaluate(hr: number) {
  if (hr < 40 || hr > 140) {
    return { apto: false, reason: "Frequência fora do intervalo seguro" };
  }
  if (hr >= 50 && hr <= 110) {
    return { apto: true, reason: "OK" };
  }
  return { apto: false, reason: "Atenção: frequência suspeita" };
}

export default function InvestmentsScreen() {
  const [hr, setHr] = useState<number>(Math.floor(Math.random() * 40) + 60);
  const [status, setStatus] = useState<any>(null);
  const { signOut, user } = useAuth();

  useEffect(() => {
    const id = setInterval(() => {
      const newHr = Math.max(
        30,
        Math.min(180, Math.round(hr + (Math.random() * 10 - 5)))
      );
      setHr(newHr);
      setStatus(evaluate(newHr));
    }, 2000);

    return () => clearInterval(id);
  }, [hr]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Bem-vindo, {user?.username || "usuário"}
      </Text>
      <Text style={styles.hrLabel}>Batimentos (BPM)</Text>
      <Text style={styles.hrValue}>{hr}</Text>
      <Text style={styles.status}>
        {status
          ? (status.apto ? "✅ APTO" : "❌ NÃO APTO") + " — " + status.reason
          : "Analisando..."}
      </Text>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  welcome: { fontSize: 18, marginBottom: 10 },
  hrLabel: { fontSize: 16 },
  hrValue: { fontSize: 48, fontWeight: "700", marginVertical: 8 },
  status: { fontSize: 16, marginTop: 10, textAlign: "center" },
});
