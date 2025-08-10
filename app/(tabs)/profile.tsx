import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ThemeToggle } from '../../components/ThemeToggle';
import { useTheme } from '../../constants/ThemeContext';

export default function ProfileScreen() {
  const { colors, theme, setTheme } = useTheme();

  const clearSavedTheme = async () => {
    try {
      await AsyncStorage.removeItem('userTheme');
      await setTheme('system');
      Alert.alert('✅ Sucesso', 'Tema salvo foi limpo! Agora o app usa o tema do sistema.');
    } catch (error) {
      Alert.alert('❌ Erro', 'Erro ao limpar tema salvo.');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemeToggle />
      
      {/* Botão para resetar tema */}
      <TouchableOpacity
        style={[styles.clearButton, { backgroundColor: colors.buttonPrimary }]}
        onPress={clearSavedTheme}
      >
        <Text style={[styles.clearButtonText, { color: colors.buttonText }]}>
          🧹 Limpar Tema Salvo
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  clearButton: {
    margin: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
