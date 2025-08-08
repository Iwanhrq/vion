import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeToggle } from '../../components/ThemeToggle';
import { useTheme } from '../../constants/ThemeContext';

export default function ProfileScreen() {
  const { colors, currentTheme, theme, setTheme } = useTheme();

  const menuItems = [
    { icon: 'person-outline', title: 'Editar Perfil', onPress: () => { } },
    { icon: 'notifications-outline', title: 'Notificações', onPress: () => { } },
    { icon: 'shield-outline', title: 'Privacidade', onPress: () => { } },
    { icon: 'help-circle-outline', title: 'Ajuda', onPress: () => { } },
    { icon: 'log-out-outline', title: 'Sair', onPress: () => { } },
  ];

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

      {/* Indicador de tema para debug */}
      <View style={[styles.debugSection, { backgroundColor: colors.card }]}>
        <Text style={[styles.debugText, { color: colors.text }]}>
          Tema Atual: {currentTheme} | Escolhido: {theme}
        </Text>
        <Text style={[styles.debugText, { color: colors.textSecondary }]}>
          Fundo: {colors.background}
        </Text>
        <TouchableOpacity
          style={[styles.clearButton, { backgroundColor: colors.buttonPrimary }]}
          onPress={clearSavedTheme}
        >
          <Text style={[styles.clearButtonText, { color: colors.buttonText }]}>
            🧹 Limpar Tema Salvo
          </Text>
        </TouchableOpacity>
      </View>

      <ThemeToggle />

      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, { borderBottomColor: colors.icon + '20' }]}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name={item.icon as any} size={24} color={colors.icon} />
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                {item.title}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  debugSection: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  debugText: {
    fontSize: 12,
    marginBottom: 4,
  },
  clearButton: {
    marginTop: 8,
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  menuSection: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 12,
  },
});
