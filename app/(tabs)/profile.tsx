import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useAuth } from "../../src/contexts/AuthContext";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Perfil</Text>
      <Text style={styles.info}>Usuário: {user?.username || "Desconhecido"}</Text>
      <Text style={styles.info}>Empresa: XP (simulado)</Text>

      <View style={{ height: 30 }} />
      <Button title="Sair" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  info: { marginTop: 10, fontSize: 16 },
});
