import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeColors } from '../constants/useThemeColors';

/**
 * Componente de exemplo que demonstra como usar as cores globais
 * para botões primários e secundários
 */
export const ExampleButtons: React.FC = () => {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>
        Exemplo de Botões com Cores Globais
      </Text>
      
      {/* Botão Primário - Usa a cor global #430065 */}
      <TouchableOpacity 
        style={[styles.button, styles.primaryButton, { backgroundColor: colors.buttonPrimary }]}
        onPress={() => console.log('Botão primário pressionado')}
      >
        <Text style={[styles.buttonText, { color: '#fff' }]}>
          Botão Primário
        </Text>
      </TouchableOpacity>

      {/* Botão Secundário - Usa a cor global #EB3C7D */}
      <TouchableOpacity 
        style={[styles.button, styles.secondaryButton, { backgroundColor: colors.buttonSecondary }]}
        onPress={() => console.log('Botão secundário pressionado')}
      >
        <Text style={[styles.buttonText, { color: '#fff' }]}>
          Botão Secundário
        </Text>
      </TouchableOpacity>

      {/* Header de exemplo - Usa a cor global #430065 */}
      <View style={[styles.header, { backgroundColor: colors.headerBackground }]}>
        <Text style={[styles.headerText, { color: '#fff' }]}>
          Header com Cor Global
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    // Cor global #430065 será aplicada via style
  },
  secondaryButton: {
    // Cor global #EB3C7D será aplicada via style
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
