# Cores Globais do Aplicativo

## Visão Geral

Este documento explica como usar as cores globais implementadas no aplicativo. Estas cores são independentes do tema (claro/escuro) e mantêm a mesma aparência em ambos os modos.

## Cores Globais Disponíveis

### 1. Header Background (`#430065`)
- **Uso**: Fundo de todos os headers do aplicativo
- **Cor**: Roxo escuro
- **Acesso**: `colors.headerBackground`

### 2. Botão Primário (`#430065`)
- **Uso**: Botões principais de ação
- **Cor**: Roxo escuro
- **Acesso**: `colors.buttonPrimary`

### 3. Botão Secundário (`#EB3C7D`)
- **Uso**: Botões secundários de ação
- **Cor**: Rosa vibrante
- **Acesso**: `colors.buttonSecondary`

## Como Usar

### 1. Importar o Hook

```typescript
import { useThemeColors } from '../constants/useThemeColors';
```

### 2. Usar no Componente

```typescript
const colors = useThemeColors();

// Para headers
<View style={{ backgroundColor: colors.headerBackground }}>
  <Text style={{ color: '#fff' }}>Header</Text>
</View>

// Para botões primários
<TouchableOpacity style={{ backgroundColor: colors.buttonPrimary }}>
  <Text style={{ color: '#fff' }}>Botão Primário</Text>
</TouchableOpacity>

// Para botões secundários
<TouchableOpacity style={{ backgroundColor: colors.buttonSecondary }}>
  <Text style={{ color: '#fff' }}>Botão Secundário</Text>
</TouchableOpacity>
```

## Exemplos Práticos

### Header de Navegação

```typescript
// Em um layout de navegação
<Tabs screenOptions={{
  headerStyle: {
    backgroundColor: colors.headerBackground, // Cor global
  },
  headerTintColor: '#fff', // Texto branco para contraste
}}>
```

### Botões em Formulários

```typescript
// Botão de login/registro
<TouchableOpacity 
  style={[styles.button, { backgroundColor: colors.buttonPrimary }]}
  onPress={handleLogin}
>
  <Text style={{ color: '#fff' }}>Entrar</Text>
</TouchableOpacity>

// Botão de cancelar
<TouchableOpacity 
  style={[styles.button, { backgroundColor: colors.buttonSecondary }]}
  onPress={handleCancel}
>
  <Text style={{ color: '#fff' }}>Cancelar</Text>
</TouchableOpacity>
```

### Headers de Tela

```typescript
// Header customizado
<View style={[styles.header, { backgroundColor: colors.headerBackground }]}>
  <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
    Título da Tela
  </Text>
</View>
```

## Vantagens

1. **Consistência**: As cores são as mesmas em todos os temas
2. **Manutenibilidade**: Mudanças nas cores globais afetam todo o app
3. **Identidade Visual**: Mantém a identidade da marca consistente
4. **Facilidade de Uso**: Acesso simples via hook `useThemeColors`

## Arquivos Modificados

- `constants/Colors.ts`: Adicionadas as cores globais
- `constants/useThemeColors.ts`: Incluídas as cores globais no hook
- `app/(tabs)/_layout.tsx`: Exemplo de uso no header de navegação
- `components/ExampleButtons.tsx`: Componente de exemplo

## Notas Importantes

- As cores globais sempre usam texto branco (`#fff`) para contraste
- Estas cores são independentes do tema do sistema
- Para acessibilidade, sempre use contraste adequado
- As cores foram escolhidas para manter boa legibilidade
