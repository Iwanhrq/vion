// ========================================
// CORES GLOBAIS E CONSTANTES
// ========================================

// Cores principais usadas no tema claro e escuro
const tintColorLight = '#430065'; // Roxo principal (destaque tema claro)
const tintColorDark = '#f0f0f0';  // Branco (destaque tema escuro)

// Cores globais que não mudam entre temas
export const GlobalColors = {
  // Cores principais da marca
  headerBackground: '#430065',    // Fundo dos headers (roxo)
  buttonPrimary: '#430065',       // Botões primários (roxo)
  buttonTertiary: '#EB3C7D',     // Botões terciários (rosa)
  // Cores para status das redes
  statusSafe: '#4CAF50',          // Verde para rede segura
  statusWarning: '#FFC107',       // Amarelo para rede com atenção
  statusCritical: '#F44336',      // Vermelho para rede crítica
};

// ========================================
// CONFIGURAÇÃO DE CORES POR TEMA
// ========================================

export const Colors = {
  light: {
    // ===== CORES DE TEXTO =====
    text: '#11181C',               // Texto principal (quase preto)
    textTitle: '#660099',          // Títulos (roxo escuro)
    textSecondary: '#687076',      // Texto secundário (cinza médio)
    textTertiary: '#adb5bd',       // Texto terciário (cinza claro)

    // ===== CORES DE FUNDO =====
    background: '#F5F5F5',         // Fundo geral (off-white)
    card: '#f8f9fa',               // Fundo de cartões (branco suave)
    overlay: 'rgba(255,255,255,0.7)', // Overlay branco translúcido

    // ===== CORES DE BORDAS E INPUTS =====
    border: '#272727',             // Bordas (cinza claro)
    inputBackground: '#ffffff',    // Fundo inputs (branco)
    inputBorder: '#ddd',           // Borda inputs (cinza claro)

    // ===== CORES DE BOTÕES =====
    buttonPrimary: GlobalColors.buttonPrimary,     // Botão primário (roxo)
    buttonSecondary: '#EB3C7D', // Botão secundário (rosa)
    buttonSecondaryText: '#fff',   // Texto do botão secundário (branco)
    buttonTertiary: GlobalColors.buttonTertiary,   // Botão terciário (rosa)
    buttonTertiaryText: '#fff',    // Texto do botão terciário (branco)
    buttonText: '#fff',            // Texto dos botões primários (branco)

    // ===== CORES DE ÍCONES E TABS =====
    icon: '#687076',               // Ícones (cinza médio)
    tabIconDefault: '#687076',     // Ícone tab não selecionado (cinza)
    tabIconSelected: tintColorLight, // Ícone tab selecionado (roxo)
    tabBorder: '#D7D7D7',          // Borda das tabs (cinza claro)
    divider: '#D7D7D7',            // Divisões das seções (cinza claro)

    // ===== CORES DE DESTAQUE =====
    tint: tintColorLight,          // Destaques e links (roxo)

    // ===== CORES DE STATUS =====
    success: '#4CAF50',            // Status sucesso (verde)
    warning: '#FF9800',            // Status aviso (laranja)
    error: '#F44336',              // Status erro (vermelho)
    info: '#2196F3',               // Status info (azul)

    // ===== CORES DE GRADIENTE =====
    gradientStart: '#0a7ea4',      // Gradiente início (azul forte)
    gradientEnd: '#0d5a7a',        // Gradiente fim (azul escuro)

    // ===== CORES DE PLACEHOLDER E SOMBRAS =====
    placeholder: 'rgba(0,0,0,0.5)', // Texto placeholder (preto translúcido)
    shadow: '#000',                // Sombras (preto)

    // ===== CORES ESPECÍFICAS DE LOGIN =====
    loginHeader: GlobalColors.headerBackground,  // Header login (roxo)
    loginWave: GlobalColors.headerBackground,    // Onda SVG login (roxo)
  },

  dark: {
    // ===== CORES DE TEXTO =====
    text: '#fff',                  // Texto principal (branco)
    textTitle: '#CC66FF',          // Títulos (roxo claro)
    textSecondary: '#9BA1A6',      // Texto secundário (cinza claro)
    textTertiary: '#6c757d',       // Texto terciário (cinza médio)

    // ===== CORES DE FUNDO =====
    background: '#000',            // Fundo geral (preto)
    card: '#1a1a1a',               // Fundo cartões (cinza muito escuro)
    overlay: 'rgba(0,0,0,0.7)',    // Overlay preto translúcido

    // ===== CORES DE BORDAS E INPUTS =====
    border: '#333',                // Bordas (cinza escuro)
    inputBackground: '#2a2a2a',    // Fundo inputs (cinza escuro)
    inputBorder: '#444',           // Borda inputs (cinza escuro)

    // ===== CORES DE BOTÕES =====
    buttonPrimary: GlobalColors.buttonPrimary,     // Botão primário (roxo)
    buttonSecondary: GlobalColors.buttonTertiary, // Botão secundário (rosa)
    buttonSecondaryText: '#fff',   // Texto do botão secundário (branco)
    buttonTertiary: GlobalColors.buttonTertiary,   // Botão terciário (rosa)
    buttonTertiaryText: '#fff',    // Texto do botão terciário (branco)
    buttonText: '#fff',            // Texto dos botões primários (branco)

    // ===== CORES DE ÍCONES E TABS =====
    icon: '#9BA1A6',               // Ícones (cinza claro)
    tabIconDefault: '#9BA1A6',     // Ícone tab não selecionado (cinza claro)
    tabIconSelected: tintColorDark, // Ícone tab selecionado (branco)
    tabBorder: '#333333',          // Borda das tabs (cinza escuro)
    divider: '#333333',            // Divisões das seções (cinza escuro)

    // ===== CORES DE DESTAQUE =====
    tint: tintColorDark,           // Destaques (branco)

    // ===== CORES DE STATUS =====
    success: '#4CAF50',            // Sucesso (verde)
    warning: '#FF9800',            // Aviso (laranja)
    error: '#F44336',              // Erro (vermelho)
    info: '#2196F3',               // Informação (azul)

    // ===== CORES DE GRADIENTE =====
    gradientStart: '#430065',      // Gradiente início (roxo)
    gradientEnd: '#2a1b3d',        // Gradiente fim (roxo escuro)

    // ===== CORES DE PLACEHOLDER E SOMBRAS =====
    placeholder: 'rgba(255,255,255,0.5)', // Placeholder (branco translúcido)
    shadow: '#000',                // Sombras (preto)

    // ===== CORES ESPECÍFICAS DE LOGIN =====
    loginHeader: GlobalColors.headerBackground,  // Header login (roxo)
    loginWave: GlobalColors.headerBackground,    // Onda SVG login (roxo)
  },
};
