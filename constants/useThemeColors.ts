// ========================================
// HOOK PERSONALIZADO PARA CORES DO TEMA
// ========================================
// Este arquivo fornece um hook que facilita o uso das cores do tema
// Ele organiza as cores em categorias para facilitar o uso nos componentes

import { useTheme } from './ThemeContext';

/**
 * Hook que fornece cores organizadas do tema atual
 * Facilita o uso das cores nos componentes, organizando-as por categoria
 * 
 * @returns {Object} Objeto com todas as cores organizadas por categoria
 * 
 * @example
 * ```typescript
 * const colors = useThemeColors();
 * 
 * // Uso básico
 * <View style={{ backgroundColor: colors.background }}>
 *   <Text style={{ color: colors.text }}>Texto</Text>
 * </View>
 * 
 * // Uso para botões
 * <TouchableOpacity style={{ backgroundColor: colors.buttonPrimary }}>
 *   <Text style={{ color: colors.buttonText }}>Botão</Text>
 * </TouchableOpacity>
 * 
 * // Uso para inputs
 * <TextInput 
 *   style={{ 
 *     backgroundColor: colors.inputBackground,
 *     borderColor: colors.inputBorder 
 *   }}
 *   placeholderTextColor={colors.placeholder}
 * />
 * ```
 */
export const useThemeColors = () => {
  // Obtém o tema atual e as cores
  const { colors, currentTheme } = useTheme();
  
  return {
    // ========================================
    // CORES PRINCIPAIS (BÁSICAS)
    // ========================================
    background: colors.background,  // Fundo principal da tela
    text: colors.text,             // Texto principal
    tint: colors.tint,             // Cor de destaque/accent
    icon: colors.icon,             // Cor dos ícones
    
    // ========================================
    // CORES PARA ELEMENTOS ESPECÍFICOS
    // ========================================
    card: currentTheme === 'dark' ? '#1a1a1a' : '#f8f9fa',     // Fundo de cards
    border: currentTheme === 'dark' ? '#333' : '#e0e0e0',       // Bordas
    placeholder: currentTheme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', // Placeholder
    shadow: currentTheme === 'dark' ? '#000' : '#000',          // Sombras
    
    // ========================================
    // CORES DE ESTADO (SUCCESS, WARNING, ERROR, INFO)
    // ========================================
    success: '#4CAF50',            // Verde para sucesso
    warning: '#FF9800',            // Laranja para avisos
    error: '#F44336',              // Vermelho para erros
    info: '#2196F3',               // Azul para informações
    
    // ========================================
    // CORES DE GRADIENTE
    // ========================================
    gradientStart: currentTheme === 'dark' ? '#430065' : '#0a7ea4', // Início do gradiente
    gradientEnd: currentTheme === 'dark' ? '#2a1b3d' : '#0d5a7a',   // Fim do gradiente
    
    // ========================================
    // CORES DE TEXTO SECUNDÁRIO
    // ========================================
    textSecondary: currentTheme === 'dark' ? '#9BA1A6' : '#687076',   // Texto secundário
    textTertiary: currentTheme === 'dark' ? '#6c757d' : '#adb5bd',    // Texto terciário
    
    // ========================================
    // CORES DE OVERLAY
    // ========================================
    overlay: currentTheme === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)', // Overlay
    
    // ========================================
    // CORES DE INPUT
    // ========================================
    inputBackground: currentTheme === 'dark' ? '#2a2a2a' : '#ffffff', // Fundo dos inputs
    inputBorder: currentTheme === 'dark' ? '#444' : '#ddd',           // Borda dos inputs
    
    // ========================================
    // CORES DE BOTÕES
    // ========================================
    buttonPrimary: colors.tint,    // Cor principal dos botões
    buttonSecondary: currentTheme === 'dark' ? '#333' : '#f0f0f0',    // Cor secundária dos botões
    buttonText: currentTheme === 'dark' ? '#fff' : '#000',            // Cor do texto dos botões
  };
};
