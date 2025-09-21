

import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { useAuth } from '../../src/contexts/AuthContext';


import { analisarTransacoesPix } from '../../src/services/pixAnalysisService';
import { Transaction, PixAnalysisResult } from '../../src/types';



const mockTransacoes: Transaction[] = [
  { id: '1', valor: 50.0, destinatario: 'pix@casadeaposta1.com', data: '2025-06-15' },
  { id: '2', valor: 25.0, destinatario: 'contato@lojaonline.com', data: '2025-06-14' },
  { id: '3', valor: 30.0, destinatario: 'financeiro@superbet.com.br', data: '2025-06-13' },
  { id: '4', valor: 100.0, destinatario: 'pagamento@restaurante.com', data: '2025-06-12' },
  { id: '5', valor: 75.0, destinatario: 'suporte@betfacil.com', data: '2025-06-11' }, 
];

export default function HomeScreen() {
  const { signOut, user } = useAuth();

  
  const [resultadoAnalise, setResultadoAnalise] = useState<PixAnalysisResult | null>(null);

  const handleAnalysis = () => {
    
    const resultado = analisarTransacoesPix(mockTransacoes);
    setResultadoAnalise(resultado);

    
    if (resultado.riscoDetectado) {
      Alert.alert(
        'Atenção, Investidor!',
        resultado.mensagem,
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        'Parabéns!',
        'Não identificamos um padrão de risco em suas transações recentes. Continue assim!',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bem-vindo,'Investidor'!</Text>
      <Text style={styles.subtitle}>Pronto para otimizar seus investimentos?</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Análise Inteligente de Gastos</Text>
        <Text style={styles.cardDescription}>
          Use nossa IA para analisar suas transações PIX e receber sugestões personalizadas para melhorar sua saúde financeira.
        </Text>
        <Button title="Analisar Extrato PIX" onPress={handleAnalysis} />
      </View>

      {/* 6. Exibindo a sugestão em um card na própria tela, se houver uma */}
      {resultadoAnalise?.riscoDetectado && resultadoAnalise.sugestao && (
        <View style={[styles.card, styles.suggestionCard]}>
          <Text style={styles.suggestionTitle}>Oportunidade de Investimento</Text>
          <Text style={styles.suggestionName}>{resultadoAnalise.sugestao.nome}</Text>
          <Text style={styles.suggestionDescription}>{resultadoAnalise.sugestao.descricao}</Text>
          <Button title="Saiba Mais" onPress={() => Alert.alert('Em breve!', 'Esta funcionalidade levará para a página do produto.')} />
        </View>
      )}

      
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#003366'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  suggestionCard: {
    backgroundColor: '#eaf5ff',
    borderColor: '#007bff',
    borderWidth: 1,
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  suggestionDescription: {
    fontSize: 14,
    marginBottom: 15,
  },
  buttonSair: {
    marginTop: 'auto',
    paddingTop: 20,
    width: '100%'
  }
});