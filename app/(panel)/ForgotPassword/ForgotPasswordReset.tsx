import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ForgotPasswordButton, ForgotPasswordHeader, ForgotPasswordInput } from '../../../components';
import { useTheme } from '../../../constants/ThemeContext';

export default function ForgotPasswordReset() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ForgotPasswordHeader />

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Criar nova senha</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Sua nova senha deve ser diferente de suas senhas anteriores.
        </Text>

        {/* Campo de senha */}
        <ForgotPasswordInput
          label="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        {/* Campo de confirmação de senha */}
        <ForgotPasswordInput
          label="Confirmar senha"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        {/* Botão */}
        <ForgotPasswordButton 
          title="Redefinir senha" 
          onPress={() => router.push('/(panel)/ForgotPassword/ForgotPasswordCode')}
          containerStyle={styles.buttonContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    lineHeight: 22,
  },
  buttonContainer: {
    paddingHorizontal: 0,
    paddingTop: 40,
    paddingBottom: 40,
  },
});
