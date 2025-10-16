import React, { useCallback, useState } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl, Text } from 'react-native';
import { listReadings, Reading } from '../../src/lib/firestore';
import { Link, useRouter, useFocusEffect } from 'expo-router';
import Toast from 'react-native-toast-message';
import ReadingItem from '../../src/components/ReadingItem';

export default function ResultsScreen() {
  const [data, setData] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchAll = async () => {
    try {
      setLoading(true);
      const rows = await listReadings();
      setData(rows);
    } catch (e: any) {
      Toast.show({ type: 'error', text1: 'Erro ao carregar', text2: e?.message || 'Tente novamente' });
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAll();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAll();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:18, fontWeight:'600', marginBottom:12 }}>📊 Resultados</Text>

      <Link
  href="/(tabs)/inserirResultados"
  style={{ color: '#0066cc', fontSize: 16, marginBottom: 12 }}
>
  + Inserir Resultado
</Link>


      <FlatList
        data={data}
        keyExtractor={(item) => item.id!}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <ReadingItem reading={item} onPress={() => router.push(`/(tabs)/results/${item.id}`)} />
        )}
        ListEmptyComponent={() => (
          <Text style={{ color:'#555' }}>
            Sem dados. Toque em “Nova leitura” para cadastrar.
          </Text>
        )}
      />
    </View>
  );
}
