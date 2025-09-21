# 💙 XP Health – Monitoramento de Batimentos Cardíacos  

### Integrantes:
- Paulo Lopes - RM: 551137
- Leonardo Schunck - RM: 99902
- Kayke Schunck - RM: 99756
- Ricardo Augusto de Matos - RM: 95906
- Felipe Voidela - RM: 98595


## 🚀 Primeiros Passos  

1. Instale as dependências  

   ```bash
   npm install

2. Inicie o aplicativo

   ```bash
   npx expo start
   ```
## ✨ Funcionalidades  

- 🔐 **Login**  
  - Tela de autenticação simulada.  
  - Qualquer usuário pode ser digitado.  
  - Senha obrigatória: **`1234`**.  

- 🩺 **Investimentos (batimentos cardíacos)**  
  - Exibe os **batimentos cardíacos simulados em tempo real**.  
  - Avalia automaticamente se o usuário está **✅ apto** ou **❌ não apto**.  

- 👤 **Perfil**  
  - Exibe informações do usuário logado.  
  - Possui botão **Sair (logout)** que encerra a sessão e retorna ao login.  

- 📊 **Resultados**  
  - Mostra um **histórico simulado** de medições anteriores com data, valor e status.  

- ⚙️ **Configurações**  
  - Tela de ajustes e permissões (versão demo).  

- 🔄 **Fluxo de autenticação**  
  - Sempre inicia na tela de **Login**.  
  - Após login válido → redireciona para as **Tabs**.  
  - Logout → retorna para o **Login**.  

---

🔑 Credenciais de Teste

Usuário: qualquer nome (ex.: teste)

Senha: 1234

---
🚀 Tecnologias Utilizadas

- React Native com Expo

- Expo Router para navegação

- AsyncStorage para simulação de login persistente

- TypeScript

- React Context API para autenticação
