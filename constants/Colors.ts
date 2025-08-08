// Cores principais usadas no tema claro e escuro
const tintColorLight = '#430065'; // Roxo principal (destaque tema claro)
const tintColorDark = '#f0f0f0';  // Branco (destaque tema escuro)

export const GlobalColors = {
  headerBackground: '#430065',    // Fundo dos headers (roxo)
  buttonPrimary: '#430065',       // Botões primários (roxo)
  buttonSecondary: '#EB3C7D',     // Botões secundários (rosa)
};

export const Colors = {
  light: {
    textTitle: '#660099',          // Títulos (roxo escuro)
    text: '#11181C',               // Texto principal (quase preto)
    background: '#F5F5F5',         // Fundo geral (off-white)
    tint: tintColorLight,          // Destaques e links (roxo)
    icon: '#687076',               // Ícones (cinza médio)

    tabIconDefault: '#687076',     // Ícone tab não selecionado (cinza)
    tabIconSelected: tintColorLight, // Ícone tab selecionado (roxo)

    card: '#f8f9fa',               // Fundo de cartões (branco suave)
    border: '#e0e0e0',             // Bordas (cinza claro)
    placeholder: 'rgba(0,0,0,0.5)', // Texto placeholder (preto translúcido)
    shadow: '#000',                // Sombras (preto)

    success: '#4CAF50',            // Status sucesso (verde)
    warning: '#FF9800',            // Status aviso (laranja)
    error: '#F44336',              // Status erro (vermelho)
    info: '#2196F3',               // Status info (azul)

    gradientStart: '#0a7ea4',      // Gradiente início (azul forte)
    gradientEnd: '#0d5a7a',        // Gradiente fim (azul escuro)

    textSecondary: '#687076',      // Texto secundário (cinza médio)
    textTertiary: '#adb5bd',       // Texto terciário (cinza claro)

    overlay: 'rgba(255,255,255,0.7)', // Overlay branco translúcido

    inputBackground: '#ffffff',   // Fundo inputs (branco)
    inputBorder: '#ddd',          // Borda inputs (cinza claro)

    buttonPrimary: GlobalColors.buttonPrimary,   // Botão primário (roxo)
    buttonSecondary: GlobalColors.buttonSecondary, // Botão secundário (rosa)
    buttonText: '#fff',           // Texto dos botões (branco)

    loginHeader: GlobalColors.headerBackground,  // Header login (roxo)
    loginWave: GlobalColors.headerBackground,    // Onda SVG login (roxo)
  },

  dark: {
    textTitle: '#fff',             // Títulos (branco)
    text: '#fff',                  // Texto principal (branco)
    background: '#000',            // Fundo geral (preto)
    tint: tintColorDark,           // Destaques (branco)
    icon: '#9BA1A6',               // Ícones (cinza claro)

    tabIconDefault: '#9BA1A6',     // Ícone tab não selecionado (cinza claro)
    tabIconSelected: tintColorDark, // Ícone tab selecionado (branco)

    card: '#1a1a1a',               // Fundo cartões (cinza muito escuro)
    border: '#333',                // Bordas (cinza escuro)
    placeholder: 'rgba(255,255,255,0.5)', // Placeholder (branco translúcido)
    shadow: '#000',                // Sombras (preto)

    success: '#4CAF50',            // Sucesso (verde)
    warning: '#FF9800',            // Aviso (laranja)
    error: '#F44336',              // Erro (vermelho)
    info: '#2196F3',               // Informação (azul)

    gradientStart: '#430065',      // Gradiente início (roxo)
    gradientEnd: '#2a1b3d',        // Gradiente fim (roxo escuro)

    textSecondary: '#9BA1A6',      // Texto secundário (cinza claro)
    textTertiary: '#6c757d',       // Texto terciário (cinza médio)

    overlay: 'rgba(0,0,0,0.7)',   // Overlay preto translúcido

    inputBackground: '#2a2a2a',   // Fundo inputs (cinza escuro)
    inputBorder: '#444',          // Borda inputs (cinza escuro)

    buttonPrimary: GlobalColors.buttonPrimary,   // Botão primário (roxo)
    buttonSecondary: GlobalColors.buttonSecondary, // Botão secundário (rosa)
    buttonText: '#fff',           // Texto dos botões (branco)

    loginHeader: GlobalColors.headerBackground,  // Header login (roxo)
    loginWave: GlobalColors.headerBackground,    // Onda SVG login (roxo)
  },
};
