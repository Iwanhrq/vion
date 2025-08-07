import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme, colors } = useTheme();

  const themes = [
    { key: 'light' as const, label: 'Claro', icon: 'sunny' },
    { key: 'dark' as const, label: 'Escuro', icon: 'moon' },
    { key: 'system' as const, label: 'Sistema', icon: 'settings' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Tema</Text>
      <View style={styles.themeButtons}>
        {themes.map((themeOption) => (
          <TouchableOpacity
            key={themeOption.key}
            style={[
              styles.themeButton,
              {
                backgroundColor: theme === themeOption.key ? colors.tint : 'transparent',
                borderColor: colors.tint,
              },
            ]}
            onPress={() => setTheme(themeOption.key)}
          >
            <Ionicons
              name={themeOption.icon as any}
              size={20}
              color={theme === themeOption.key ? '#fff' : colors.text}
            />
            <Text
              style={[
                styles.themeText,
                {
                  color: theme === themeOption.key ? '#fff' : colors.text,
                },
              ]}
            >
              {themeOption.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  themeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  themeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  themeText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});
