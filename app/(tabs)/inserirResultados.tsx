import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Toast from 'react-native-toast-message';
import { readingSchema, ReadingForm } from '../../src/utils/validators';
import { createReading } from '../../src/lib/firestore';
import { useAuth } from '../../src/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

export default function InserirResultados() {
  const { user } = useAuth();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReadingForm>({
    resolver: zodResolver(readingSchema),
    defaultValues: { bpm: 80, status: 'APTO', note: '' },
  });

  const onSubmit = async (values: ReadingForm) => {
    try {
      await createReading({
        ...values,
        username: user?.username || 'anon',
      });
      Toast.show({ type: 'success', text1: 'Resultado inserido com sucesso!' });
      router.back(); // volta para tela de resultados
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao inserir resultado',
        text2: e?.message || 'Tente novamente',
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>➕ Inserir Resultados</Text>

      {/* BPM */}
      <Text style={styles.label}>Batimentos por Minuto (BPM)</Text>
      <Controller
        control={control}
        name="bpm"
        render={({ field: { onChange, value } }) => (
          <TextInput
            keyboardType="numeric"
            value={String(value ?? '')}
            onChangeText={(t) => onChange(Number(t))}
            placeholder="Ex: 80"
            style={styles.input}
          />
        )}
      />
      {!!errors.bpm && <Text style={styles.error}>{errors.bpm.message}</Text>}

      {/* STATUS */}
      <Text style={styles.label}>Status</Text>
      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, value } }) => (
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="APTO" value="APTO" />
              <Picker.Item label="NÃO APTO" value="NAO_APTO" />
            </Picker>
          </View>
        )}
      />
      {!!errors.status && <Text style={styles.error}>{errors.status.message}</Text>}

      {/* OBSERVAÇÃO */}
      <Text style={styles.label}>Observação (opcional)</Text>
      <Controller
        control={control}
        name="note"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Ex: pós-exercício"
            value={value}
            onChangeText={onChange}
            style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
            multiline
          />
        )}
      />
      {!!errors.note && <Text style={styles.error}>{errors.note.message}</Text>}

      {/* BOTÃO */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Salvar Resultado</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0066cc',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
  },
  picker: {
    height: 48,
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginBottom: 8,
  },
});
