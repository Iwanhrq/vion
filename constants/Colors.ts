// ========================================
// SISTEMA DE CORES DO APLICATIVO
// ========================================
// Este arquivo define todas as cores usadas no app para os temas claro e escuro
// Cada cor tem um propósito específico e se adapta automaticamente ao tema

// Cores principais do tema (cores de destaque)
const tintColorLight = '#430065'; 
const tintColorDark = '#f0f0f0';     // Branco para tema escuro

// ========================================
// CORES GLOBAIS (INDEPENDENTES DO TEMA)
// ========================================
// Estas cores são usadas em ambos os temas (claro e escuro)
export const GlobalColors = {
  headerBackground: '#430065',    // Cor de fundo dos headers (roxo)
  buttonPrimary: '#430065',       // Cor dos botões primários (roxo)
  buttonSecondary: '#EB3C7D',     // Cor dos botões secundários (rosa)
};

export const Colors = {
  // ========================================
  // TEMA CLARO
  // ========================================
  light: {
    // Cores básicas do tema
    textTitle: '#660099', // Texto dos títulos
    text: '#11181C',              // Texto principal (quase preto)
    background: '#F5F5F5',            // Fundo principal (branco)
    tint: tintColorLight,         // Cor de destaque (azul)
    icon: '#687076',              // Cor dos ícones (cinza)
    
    // Cores específicas da navegação
    tabIconDefault: '#687076',    // Ícones das tabs quando não selecionados
    tabIconSelected: tintColorLight, // Ícones das tabs quando selecionados
    
    // ========================================
    // CORES PARA ELEMENTOS ESPECÍFICOS
    // ========================================
    card: '#f8f9fa',              // Fundo de cards/cartões
    border: '#e0e0e0',            // Bordas de elementos
    placeholder: 'rgba(0,0,0,0.5)', // Texto placeholder dos inputs
    shadow: '#000',               // Cor das sombras
    
    // ========================================
    // CORES DE ESTADO (SUCCESS, WARNING, ERROR, INFO)
    // ========================================
    success: '#4CAF50',           // Verde para sucesso
    warning: '#FF9800',           // Laranja para avisos
    error: '#F44336',             // Vermelho para erros
    info: '#2196F3',              // Azul para informações
    
    // ========================================
    // CORES DE GRADIENTE
    // ========================================
    gradientStart: '#0a7ea4',     // Início do gradiente
    gradientEnd: '#0d5a7a',       // Fim do gradiente
    
    // ========================================
    // CORES DE TEXTO SECUNDÁRIO
    // ========================================
    textSecondary: '#687076',     // Texto secundário (cinza)
    textTertiary: '#adb5bd',      // Texto terciário (cinza mais claro)
    
    // ========================================
    // CORES DE OVERLAY
    // ========================================
    overlay: 'rgba(255,255,255,0.7)', // Overlay branco semi-transparente
    
    // ========================================
    // CORES DE INPUT
    // ========================================
    inputBackground: '#ffffff',    // Fundo dos inputs
    inputBorder: '#ddd',          // Borda dos inputs
    
    // ========================================
    // CORES DE BOTÕES
    // ========================================
    buttonPrimary: GlobalColors.buttonPrimary, // Cor principal dos botões (roxo global)
    buttonSecondary: GlobalColors.buttonSecondary, // Cor secundária dos botões (rosa global)
    buttonText: '#fff',           // Cor do texto dos botões (branco para contraste)
    
    // ========================================
    // CORES ESPECÍFICAS PARA LOGIN
    // ========================================
    loginHeader: GlobalColors.headerBackground, // Cor do header da tela de login (roxo global)
    loginWave: GlobalColors.headerBackground,   // Cor da onda SVG do login (roxo global)
  },




  
  // ========================================
  // TEMA ESCURO
  // ========================================
  dark: {
    // Cores básicas do tema
    text: '#fff',                 // Texto principal (branco)
    textTitle: '#ffff', // Texto dos títulos
    background: '#000',           // Fundo principal (preto)
    tint: tintColorDark,         // Cor de destaque (branco)
    icon: '#9BA1A6',             // Cor dos ícones (cinza claro)
    
    // Cores específicas da navegação
    tabIconDefault: '#9BA1A6',   // Ícones das tabs quando não selecionados
    tabIconSelected: tintColorDark, // Ícones das tabs quando selecionados
    
    // ========================================
    // CORES PARA ELEMENTOS ESPECÍFICOS
    // ========================================
    card: '#1a1a1a',             // Fundo de cards/cartões (cinza escuro)
    border: '#333',               // Bordas de elementos (cinza)
    placeholder: 'rgba(255,255,255,0.5)', // Texto placeholder dos inputs
    shadow: '#000',               // Cor das sombras
    
    // ========================================
    // CORES DE ESTADO (SUCCESS, WARNING, ERROR, INFO)
    // ========================================
    success: '#4CAF50',           // Verde para sucesso
    warning: '#FF9800',           // Laranja para avisos
    error: '#F44336',             // Vermelho para erros
    info: '#2196F3',              // Azul para informações
    
    // ========================================
    // CORES DE GRADIENTE
    // ========================================
    gradientStart: '#430065',     // Início do gradiente (roxo)
    gradientEnd: '#2a1b3d',       // Fim do gradiente (roxo escuro)
    
    // ========================================
    // CORES DE TEXTO SECUNDÁRIO
    // ========================================
    textSecondary: '#9BA1A6',     // Texto secundário (cinza claro)
    textTertiary: '#6c757d',      // Texto terciário (cinza)
    
    // ========================================
    // CORES DE OVERLAY
    // ========================================
    overlay: 'rgba(0,0,0,0.7)',  // Overlay preto semi-transparente
    
    // ========================================
    // CORES DE INPUT
    // ========================================
    inputBackground: '#2a2a2a',   // Fundo dos inputs (cinza escuro)
    inputBorder: '#444',          // Borda dos inputs (cinza)
    
    // ========================================
    // CORES DE BOTÕES
    // ========================================
    buttonPrimary: GlobalColors.buttonPrimary, // Cor principal dos botões (roxo global)
    buttonSecondary: GlobalColors.buttonSecondary, // Cor secundária dos botões (rosa global)
    buttonText: '#fff',           // Cor do texto dos botões (branco)
    
    // ========================================
    // CORES ESPECÍFICAS PARA LOGIN
    // ========================================
    loginHeader: GlobalColors.headerBackground, // Cor do header da tela de login (roxo global)
    loginWave: GlobalColors.headerBackground,   // Cor da onda SVG do login (roxo global)
  },
};
