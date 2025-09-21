import React from "react";
import { View, Text } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 20 }}>⚙️ Configurações</Text>
      <Text style={{ marginTop: 10 }}>
        Ajustes e permissões do app (versão demo).
      </Text>
    </View>
  );
}
