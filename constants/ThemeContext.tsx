// CONTEXTO DE TEMA - SISTEMA PRINCIPAL
// Gerencia o tema do app: detecta tema do sistema, salva preferências e fornece cores dinâmicas

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { Colors } from './Colors';

// TIPOS E INTERFACES
type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;                    // Tema escolhido pelo usuário
  currentTheme: 'light' | 'dark'; // Tema aplicado (após resolução de 'system')
  setTheme: (theme: Theme) => void; // Função para alterar tema
  colors: typeof Colors.light;     // Cores do tema aplicado
}

// CRIAÇÃO DO CONTEXTO
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// HOOK PARA USO DO TEMA
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

// PROVIDER PRINCIPAL DO TEMA
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estados locais: tema escolhido e tema do sistema
  const [theme, setThemeState] = useState<Theme>('system');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  // Detecta e atualiza o tema do sistema operacional
  useEffect(() => {
    const detectSystemTheme = () => {
      try {
        const colorScheme = Appearance.getColorScheme();
        const detectedTheme = colorScheme === 'dark' ? 'dark' : 'light';
        setSystemTheme(detectedTheme);
        // Aplica tema do sistema imediatamente se usuário escolheu 'system'
        if (theme === 'system') {
          // opcional: log para debug
          console.log('Aplicando tema do sistema:', detectedTheme);
        }
      } catch {
        setSystemTheme('light'); // fallback para claro em erro
      }
    };

    detectSystemTheme();

    // Listener para mudanças no tema do sistema em tempo real
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      const newSystemTheme = colorScheme === 'dark' ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);
      if (theme === 'system') {
        // opcional: log para debug
        console.log('Tema do sistema mudou para:', newSystemTheme);
      }
    });

    // Cleanup do listener
    return () => subscription?.remove();
  }, [theme]);

  // Carrega preferência de tema salva no AsyncStorage
  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('userTheme');
        if (savedTheme) setThemeState(savedTheme as Theme);
        else setThemeState('system'); // padrão
      } catch {
        setThemeState('system'); // fallback
      }
    };
    loadSavedTheme();
  }, []);

  // Função para alterar tema e salvar preferência
  const setTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem('userTheme', newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.log('Erro ao salvar tema:', error);
    }
  };

  // Define tema atual (resolvendo 'system' para light/dark)
  const currentTheme = theme === 'system' ? systemTheme : theme;

  // Cores do tema atual
  const colors = Colors[currentTheme];

  // Valor que será fornecido pelo contexto
  const value: ThemeContextType = {
    theme,
    currentTheme,
    setTheme,
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
