import { Slot, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../src/contexts/AuthContext";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import Toast from "../src/components/Toast"; 

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // espera carregar o AsyncStorage

    const inAuthGroup = segments[0] === "(tabs)";

    if (!user && inAuthGroup) {
      // usuário NÃO logado tentando acessar tabs → manda pro login
      router.replace("/login");
    } else if (user && !inAuthGroup) {
      // usuário logado mas fora das tabs → manda pras tabs
      router.replace("/(tabs)");
    }
  }, [user, isLoading, segments, router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      {/* Navegação principal */}
      <RootLayoutNav />

      {/* Toast global (aparece por cima de todas as telas) */}
      <Toast />
    </AuthProvider>
  );
}
