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

- 📈 Inserir Resultados (CRUD + Firebase)
  - Permite inserir resultados reais (BPM, status e observações).
  - Integração com Firebase Firestore para armazenamento em nuvem.
  - Campos validados com Zod e React Hook Form.
  - Feedback visual com Toast para sucesso ou erro.
  - Status selecionável entre APTO e NÃO APTO.
   
- 📊 Resultados
  - Exibe os registros salvos no Firebase com data, BPM, status e observação.
  - Atualiza automaticamente após inserções.
  
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

- Firebase Firestore (armazenamento de dados)

-   React Hook Form + Zod (validação de formulários)

-   React Context API (gerenciamento de autenticação)

- React Native Toast Message (feedback visual)
