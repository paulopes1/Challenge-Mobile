import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  username: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sempre que o app inicia, limpa o usuário salvo (começa deslogado)
  useEffect(() => {
    const resetUser = async () => {
      try {
        await AsyncStorage.removeItem("@xp_app_user"); // limpa login salvo
      } catch (err) {
        console.error("Erro ao limpar usuário:", err);
      } finally {
        setUser(null);
        setIsLoading(false);
      }
    };

    resetUser();
  }, []);

  // Função de login
  const signIn = async (username: string, password: string) => {
    if (password === "1234") {
      const newUser = { username };
      setUser(newUser);
      await AsyncStorage.setItem("@xp_app_user", JSON.stringify(newUser));
      return { ok: true };
    }
    return { ok: false, message: "Usuário ou senha inválidos" };
  };

  // Função de logout
  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem("@xp_app_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
