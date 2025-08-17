import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../constants/ThemeContext';

export const ThemeDebug: React.FC = () => {
  const { theme, currentTheme, setTheme, resetToSystem, colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>Debug do Tema</Text>
      
      <View style={styles.infoContainer}>
        <Text style={[styles.infoText, { color: colors.textSecondary }]}>
          Tema escolhido: <Text style={{ color: colors.text, fontWeight: 'bold' }}>{theme}</Text>
        </Text>
        <Text style={[styles.infoText, { color: colors.textSecondary }]}>
          Tema aplicado: <Text style={{ color: colors.text, fontWeight: 'bold' }}>{currentTheme}</Text>
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.buttonPrimary }]}
          onPress={() => resetToSystem()}
        >
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>
            Reset para Sistema
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.buttonSecondary }]}
          onPress={() => setTheme('light')}
        >
          <Text style={[styles.buttonText, { color: colors.buttonSecondaryText }]}>
            Forçar Claro
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.buttonSecondary }]}
          onPress={() => setTheme('dark')}
        >
          <Text style={[styles.buttonText, { color: colors.buttonSecondaryText }]}>
            Forçar Escuro
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
  },
  buttonContainer: {
    gap: 8,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

