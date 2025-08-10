import { Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { useTheme } from '../../constants/ThemeContext';

// Componentes personalizados
import { FormButton, Header, InputField, PasswordInput } from '../../components';

// Firebase imports
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";



export default function Login() {
  // Estados para controlar os campos de email, senha e mensagens de erro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { colors } = useTheme();


  // Carregamento da fonte customizada Poppins
  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null; // Não renderiza nada até que a fonte carregue
  }

  // Função para login via Google ou Facebook (apenas web)
  const loginpopup = async (typeregister: string) => {
    try {
      const provider = typeregister === "Google"
        ? new GoogleAuthProvider()
        : new FacebookAuthProvider();

      const result = await signInWithPopup(auth, provider);

      // Cria ou atualiza documento do usuário no Firestore
      await setDoc(
        doc(db, 'users', result.user.uid),
        {
          type: typeregister,
          name: result.user.displayName,
          email: result.user.email,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      console.log("Login feito com sucesso", result.user);

      // Redireciona para a tela Home após login
      router.push('/(tabs)/home' as any);
    }
    catch (error: any) {
      setError("Ocorreu um erro durante o login: " + error.message);
    }
  };

  // Função para login via email e senha
  const handleLogin = async () => {
    // Validação simples dos campos antes de tentar autenticar
    if (!email.trim() || !password.trim()) {
      setError("Por favor, preencha os campos de email e senha.");
      return;
    }

    setError(null); // Limpa erro anterior

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuário autenticado:", userCredential.user.email);
      router.push('/(tabs)/home' as any);
    }
    catch (err: any) {
      // Tratamento específico dos erros retornados pelo Firebase
      if (err.code === "auth/user-not-found") {
        setError("Usuário não encontrado. Verifique o email informado.");
      } else if (err.code === "auth/wrong-password") {
        setError("Senha incorreta. Tente novamente.");
      } else {
        setError("Erro na autenticação, por favor tente novamente mais tarde.");
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >

          {/* Cabeçalho com botão de voltar e onda animada */}
          <Header
            onBackPress={() => router.push('/outset')}
            waveColor={colors.loginWave}
          />

          {/* Conteúdo principal da tela */}
          <View style={styles.content}>
            <Text style={[styles.title, { color: colors.text }]}>Bem-vindo(a)</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Faça login com a sua conta</Text>

            <View style={styles.form}>

              {/* Campo de Email */}
              <InputField
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                icon="mail"
                containerStyle={{ marginBottom: 32 }}
              />

              {/* Campo de Senha */}
              <PasswordInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
              />

              {/* Link Esqueci a senha alinhado à direita */}
              <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity onPress={() => router.push('/(panel)/ForgotPassword/ForgotPasswordEmail')}>
                  <Text style={[styles.forgotPasswordText, { color: colors.textSecondary }]}>
                    Esqueceu a senha?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Botão de Login */}
              <FormButton
                title="Login"
                onPress={handleLogin}
                variant="primary"
                size="large"
                style={styles.buttonLogin}
              />

              {/* Exibe mensagem de erro, se houver */}
              {error && <Text style={styles.errorText}>{error}</Text>}

              {/* Comentado - Botões de login social (Google, Microsoft)
              <View style={styles.dividerContainer}>
                <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                <Text style={[styles.dividerText, { color: colors.textSecondary }]}>OU</Text>
                <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              </View>

              <View style={styles.buttons}>
                <TouchableOpacity onPress={() => loginpopup("Google")} style={[styles.buttonMG, { borderColor: colors.border }]}>
                  <Image
                    source={require('../../assets/images/google.png')}
                    style={styles.iconButtons}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttonMG, { borderColor: colors.border }]}>
                  <Image
                    source={require('../../assets/images/microsoft.png')}
                    style={styles.iconButtons}
                  />
                </TouchableOpacity>
              </View>
              */}

            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingTop: 120,
    padding: 35,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    paddingLeft: 10,
    fontFamily: "Poppins_600SemiBold",
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    paddingTop: 40,
    width: "90%",
  },
  buttonLogin: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 20,
  },
  errorText: {
    color: '#F44336',
    marginTop: 32,
    textAlign: 'center',
    fontSize: 14,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
    marginTop: -10,
  },
  forgotPasswordText: {
    fontSize: 14,
  },


});
