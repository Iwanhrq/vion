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
  View
} from 'react-native';

import { useTheme } from '../../constants/ThemeContext';

// Componentes personalizados
import { FormButton, Header, InputField, PasswordInput } from '../../components';

// Firebase imports para autenticação e banco de dados
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";



export default function Register() {
  // Router para navegação entre telas
  const router = useRouter();
  // Tema para cores dinâmicas (claro/escuro)
  const { colors } = useTheme();

  // Estados para campos do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estado para exibir mensagens de erro
  const [error, setError] = useState<string | null>(null);

  // Carregamento da fonte customizada
  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
  });

  // Aguarda a fonte carregar antes de renderizar
  if (!fontsLoaded) {
    return null; // Pode substituir por um componente de loading, se desejar
  }

  // Registro via Google (web apenas)
  const registerprovider = async (typeregister: string) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Salva/atualiza dados do usuário no Firestore
      await setDoc(
        doc(db, 'users', result.user.uid),
        {
          type: "Google",
          name: result.user.displayName,
          email: result.user.email,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      console.log("Registro feito com sucesso", result.user);

      // Navega para a tela principal após registro
      router.push('/(tabs)/home' as any);
    }
    catch (error: any) {
      setError("Erro ao registrar via Google: " + error.message);
    }
  };

  // Função para registrar usuário via email e senha
  const handleRegister = async () => {
    // Valida se todos os campos estão preenchidos
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      setError('As senhas não coincidem. Por favor, tente novamente.');
      return;
    }

    setError(null); // Limpa erros anteriores

    try {
      // Cria usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Salva dados do usuário no Firestore
      await setDoc(doc(db, "users", uid), {
        type: "email/senha",
        name: name,
        email: email,
        createdAt: serverTimestamp(),
      });

      console.log("Conta criada com sucesso");

      // Limpa campos do formulário após sucesso
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Navega para a tela principal
      router.push("/(tabs)/home" as any);
    }
    catch (error: any) {
      setError("Erro ao criar conta: " + error.message);
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
          {/* Cabeçalho com botão de voltar e onda decorativa */}
          <Header
            onBackPress={() => router.push('/outset')}
            waveColor={colors.loginWave}
          />

          {/* Conteúdo principal */}
          <View style={styles.content}>
            <Text style={[styles.title, { color: colors.text }]}>Registre-se</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Crie sua conta</Text>

            <View style={styles.form}>

              {/* Campo Nome */}
              <InputField
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                icon="person"
              />

              {/* Campo Email */}
              <InputField
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                icon="mail"
              />

              {/* Campo Senha */}
              <PasswordInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                containerStyle={{ marginBottom: 0 }}
              />

              {/* Campo Confirmar Senha */}
              <PasswordInput
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                containerStyle={{ marginBottom: 0 }}
              />

              {/* Botão de cadastro */}
              <FormButton
                title="Cadastrar"
                onPress={handleRegister}
                variant="primary"
                size="large"
                style={styles.buttonRegister}
              />

              {/* Mensagem de erro, caso exista */}
              {error && <Text style={styles.errorText}>{error}</Text>}

              {/* Comentado: login social
              <View style={styles.dividerContainer}>
                <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                <Text style={[styles.dividerText, { color: colors.textSecondary }]}>OU</Text>
                <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              </View>

              <View style={styles.buttons}>
                <TouchableOpacity onPress={() => registerprovider("Google")} style={[styles.buttonMG, { borderColor: colors.border }]}>
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
    paddingTop: 100,
    padding: 35,
    alignItems: "center"
  },
  title: {
    fontSize: 32,
    paddingLeft: 10,
    fontFamily: "Poppins_600SemiBold"
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    paddingTop: 40,
    width: "90%",
    gap: 32,
  },
  buttonRegister: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 20,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 32,
  },
  buttonMG: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  iconButtons: {
    width: 16,
    height: 16,
  },

  errorText: {
    color: '#F44336',
    textAlign: 'center',
    fontSize: 14,
  }
});
