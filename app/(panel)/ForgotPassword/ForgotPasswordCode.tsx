import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ForgotPasswordButton, ForgotPasswordCodeInputs, ForgotPasswordHeader, ForgotPasswordTimer } from '../../../components';
import { useTheme } from '../../../constants/ThemeContext';

export default function ForgotPasswordCode() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const { colors } = useTheme();

  const handleVerify = () => {
    console.log('Código digitado:', code);
    router.push('/(panel)/ForgotPassword/ForgotPasswordReset');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ForgotPasswordHeader />

      {/* Conteúdo */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Cheque seu inbox</Text>

        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Nós enviamos um código de verificação{'\n'}
          em seu email (verifique a caixa de spam)
        </Text>

        {/* Inputs do código */}
        <ForgotPasswordCodeInputs onCodeChange={setCode} />

        {/* Timer */}
        <ForgotPasswordTimer />
      </View>

      {/* Botões */}
      <ForgotPasswordButton 
        title="Verificar" 
        onPress={handleVerify}
        containerStyle={[styles.buttonContainer, { paddingBottom: 25 }]}
        borderRadius={20}
      />

      <ForgotPasswordButton 
        title="Enviar novamente" 
        variant="secondary"
        containerStyle={styles.buttonContainer}
        borderRadius={20}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 40,
    alignItems: 'center',
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
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 55,
    paddingBottom: 20,
  },
});
