// HOOK PERSONALIZADO PARA CORES DO TEMA
// Detecta e atualiza as cores do tema conforme o sistema desde o início

import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { Colors, GlobalColors } from './Colors';

export const useThemeColors = () => {
  const [isReady, setIsReady] = useState(false);                  // Indica quando o tema inicial foi detectado
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light'); // Tema atual aplicado

  useEffect(() => {
    // Detecta o tema inicial do sistema
    const detectInitialTheme = () => {
      try {
        const colorScheme = Appearance.getColorScheme();
        const theme = colorScheme === 'dark' ? 'dark' : 'light';
        setCurrentTheme(theme);
        console.log('Tema inicial detectado:', theme);
      } catch (error) {
        console.log('Erro ao detectar tema inicial:', error);
        setCurrentTheme('light'); // fallback para tema claro
      }
      setIsReady(true);
    };

    detectInitialTheme();

    // Listener para mudanças no tema do sistema em tempo real
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      const newTheme = colorScheme === 'dark' ? 'dark' : 'light';
      setCurrentTheme(newTheme);
      console.log('Tema do sistema mudou para:', newTheme);
    });

    // Cleanup do listener ao desmontar o componente
    return () => subscription?.remove();
  }, []);

  return {
    isReady,                    // Indica se o tema já foi detectado e aplicado
    currentTheme,               // Tema atual (light ou dark)
    colors: Colors[currentTheme], // Cores do tema atual
    ...GlobalColors,            // Inclui todas as cores globais
  };
};
