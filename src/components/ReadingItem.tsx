// src/components/ReadingItem.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Reading } from '../lib/firestore';

export default function ReadingItem({
  reading,
  onPress,
}: { reading: Reading; onPress?: () => void }) {
  const d = reading.createdAt.toDate();
  const when = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          padding: 12,
          marginBottom: 10,
          borderRadius: 8,
          backgroundColor: '#f5f5f5',
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 3,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
        }}
      >
        <Text style={{ fontWeight: '600' }}>{when}</Text>
        <Text>
          BPM: {reading.bpm} — Status:{' '}
          {reading.status === 'APTO' ? '✅ APTO' : '❌ NÃO APTO'}
        </Text>
        {reading.note ? (
          <Text style={{ color: '#555' }}>Obs: {reading.note}</Text>
        ) : null}
      </View>
    </Pressable>
  );
}
