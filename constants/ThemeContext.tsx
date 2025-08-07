// ========================================
// CONTEXTO DE TEMA - SISTEMA PRINCIPAL
// ========================================
// Este arquivo gerencia todo o sistema de tema do aplicativo
// Ele detecta o tema do sistema, salva preferências e fornece cores dinamicamente

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { Colors } from './Colors';

// ========================================
// TIPOS E INTERFACES
// ========================================

// Tipos possíveis de tema que o usuário pode escolher
type Theme = 'light' | 'dark' | 'system';

// Interface que define o que o contexto fornece
interface ThemeContextType {
  theme: Theme;                    // Tema escolhido pelo usuário (light/dark/system)
  currentTheme: 'light' | 'dark'; // Tema atual aplicado (light ou dark)
  setTheme: (theme: Theme) => void; // Função para trocar o tema
  colors: typeof Colors.light;     // Cores do tema atual
}

// ========================================
// CRIAÇÃO DO CONTEXTO
// ========================================

// Cria o contexto React para compartilhar o tema em todo o app
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ========================================
// HOOK PERSONALIZADO PARA USAR O TEMA
// ========================================

/**
 * Hook para acessar o tema em qualquer componente
 * @returns {ThemeContextType} Objeto com tema atual e funções
 * @throws {Error} Se usado fora do ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ========================================
// PROVIDER PRINCIPAL DO TEMA
// ========================================

/**
 * Provider que envolve toda a aplicação e gerencia o estado do tema
 * @param children - Componentes filhos que terão acesso ao tema
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ========================================
  // ESTADOS LOCAIS
  // ========================================
  
  // Tema escolhido pelo usuário (light/dark/system)
  const [theme, setThemeState] = useState<Theme>('system');
  
  // Tema atual do sistema operacional (light/dark)
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  // ========================================
  // DETECÇÃO DO TEMA DO SISTEMA
  // ========================================
  
  useEffect(() => {
    /**
     * Função para detectar o tema atual do sistema operacional
     * Usa o Appearance API do React Native que é mais confiável no Expo
     */
    const detectSystemTheme = () => {
      try {
        // Obtém o tema atual do sistema (light ou dark)
        const colorScheme = Appearance.getColorScheme();
        console.log('Tema detectado do sistema:', colorScheme);
        
        // Converte para nosso formato e atualiza o estado
        setSystemTheme(colorScheme === 'dark' ? 'dark' : 'light');
      } catch (error) {
        console.log('Erro ao detectar tema do sistema:', error);
        // Se der erro, usa tema claro como fallback
        setSystemTheme('light');
      }
    };

    // Detecta o tema inicial quando o componente monta
    detectSystemTheme();

    // ========================================
    // LISTENER PARA MUDANÇAS NO TEMA DO SISTEMA
    // ========================================
    
    // Escuta mudanças em tempo real no tema do sistema
    // Se o usuário trocar o tema do celular, o app detecta automaticamente
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      console.log('Tema do sistema mudou para:', colorScheme);
      setSystemTheme(colorScheme === 'dark' ? 'dark' : 'light');
    });

    // Cleanup: remove o listener quando o componente desmonta
    return () => {
      subscription?.remove();
    };
  }, []);

  // ========================================
  // CARREGAMENTO DO TEMA SALVO
  // ========================================
  
  useEffect(() => {
    /**
     * Função para carregar a preferência de tema salva pelo usuário
     * Usa AsyncStorage para persistir a escolha entre sessões
     */
    const loadSavedTheme = async () => {
      try {
        // Busca o tema salvo no AsyncStorage
        const savedTheme = await AsyncStorage.getItem('userTheme');
        if (savedTheme) {
          console.log('Tema salvo carregado:', savedTheme);
          // Atualiza o estado com o tema salvo
          setThemeState(savedTheme as Theme);
        }
        // Se não houver tema salvo, mantém 'system' como padrão
      } catch (error) {
        console.log('Erro ao carregar tema salvo:', error);
      }
    };

    // Carrega o tema salvo quando o componente monta
    loadSavedTheme();
  }, []);

  // ========================================
  // FUNÇÃO PARA TROCAR O TEMA
  // ========================================
  
  /**
   * Função que permite trocar o tema e salva a preferência
   * @param newTheme - Novo tema escolhido (light/dark/system)
   */
  const setTheme = async (newTheme: Theme) => {
    try {
      // Salva a nova preferência no AsyncStorage
      await AsyncStorage.setItem('userTheme', newTheme);
      console.log('Tema salvo:', newTheme);
      
      // Atualiza o estado local
      setThemeState(newTheme);
    } catch (error) {
      console.log('Erro ao salvar tema:', error);
    }
  };

  // ========================================
  // CÁLCULO DO TEMA ATUAL E CORES
  // ========================================
  
  // Determina qual tema está atualmente aplicado:
  // - Se o usuário escolheu 'system', usa o tema do sistema
  // - Se escolheu 'light' ou 'dark', usa diretamente
  const currentTheme = theme === 'system' ? systemTheme : theme;
  
  // Obtém as cores correspondentes ao tema atual
  const colors = Colors[currentTheme];

  // Log para debug - mostra qual tema está sendo aplicado
  console.log('Tema atual:', currentTheme, 'Cores aplicadas:', colors.background);

  // ========================================
  // VALOR DO CONTEXTO
  // ========================================
  
  // Objeto que será fornecido para todos os componentes filhos
  const value: ThemeContextType = {
    theme,           // Tema escolhido pelo usuário
    currentTheme,    // Tema atual aplicado
    setTheme,        // Função para trocar tema
    colors,          // Cores do tema atual
  };

  // ========================================
  // RENDERIZAÇÃO DO PROVIDER
  // ========================================
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
