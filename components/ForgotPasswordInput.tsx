import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';

interface ForgotPasswordInputProps extends TextInputProps {
  label?: string;
  variant?: 'default' | 'code';
  style?: any;
  icon?: keyof typeof Ionicons.glyphMap;
}

export default function ForgotPasswordInput({ 
  label, 
  variant = 'default', 
  style,
  icon,
  ...props 
}: ForgotPasswordInputProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
      <View style={styles.inputContainer}>
        {icon && (
          <Ionicons 
            name={icon} 
            size={20} 
            color={colors.textSecondary} 
            style={styles.icon}
          />
        )}
        <TextInput
          style={[
            styles.input,
            variant === 'code' ? styles.codeInput : styles.defaultInput,
            {
              borderColor: colors.border,
              color: colors.text,
            },
            icon && styles.inputWithIcon,
            style
          ]}
          placeholderTextColor={colors.placeholder}
          {...props}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  input: {
    fontSize: 16,
  },
  defaultInput: {
    height: 55,
    borderWidth: 1,
    paddingHorizontal: 16,
    width: '100%',
  },
  inputWithIcon: {
    paddingLeft: 48, // Espaço para o ícone
  },
  codeInput: {
    width: 70,
    height: 75,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 18,
    borderWidth: 1,
  },
});
