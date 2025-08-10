import { Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../constants/ThemeContext';

// Firebase imports
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

// Componente SVG para animação da onda no cabeçalho
const Wave = ({ waveColor }: { waveColor: string }) => (
  <Svg
    viewBox="0 0 1440 320"
    style={styles.wave}
    preserveAspectRatio="none"
  >
    <Path
      fill={waveColor}
      fillOpacity="1"
      d="M0,64L80,58.7C160,53,320,43,480,80C640,117,800,203,960,240C1120,277,1280,267,1360,261.3L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
    />
  </Svg>
);

export default function Login() {
  // Estados para controlar os campos de email, senha e mensagens de erro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
          <View style={[styles.header, { backgroundColor: colors.loginHeader }]}>
            <TouchableOpacity onPress={() => router.push('/outset')} style={styles.backButton}>
              <Ionicons
                name="arrow-back"
                size={40}
                color='#fff'
              />
            </TouchableOpacity>
            <Wave waveColor={colors.loginWave} />
          </View>

          {/* Conteúdo principal da tela */}
          <View style={styles.content}>
            <Text style={[styles.title, { color: colors.text }]}>Bem-vindo(a)</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Faça login com a sua conta</Text>

            <View style={styles.form}>

              {/* Campo de Email */}
              <View style={[styles.inputContainer, styles.emailContainer, { borderColor: colors.border }]}>

                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#999999"
                  autoCorrect={false}
                  spellCheck={false}
                />
                <Ionicons
                  name="mail"
                  size={18}
                  color='#D0D0D0'
                  style={styles.buttonIcons}
                />
              </View>

              {/* Campo de Senha */}
              <View style={[styles.inputContainer, { borderColor: colors.border }]}>
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Senha"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#999999"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.buttonIcons}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color='#D0D0D0'
                  />
                </TouchableOpacity>
              </View>

              {/* Link Esqueci a senha alinhado à direita */}
              <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity onPress={() => router.push('/(panel)/ForgotPassword/ForgotPasswordEmail')}>
                  <Text style={[styles.forgotPasswordText, { color: colors.textSecondary }]}>
                    Esqueceu a senha?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Botão de Login */}
              <TouchableOpacity
                onPress={handleLogin}
                style={[styles.buttonLogin, { backgroundColor: colors.buttonPrimary }]}
              >
                <Text style={[styles.textLogin, { color: colors.buttonText }]}>Login</Text>
              </TouchableOpacity>

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
  header: {
    padding: 23,
    height: 120,
    position: "relative",
  },
  wave: {
    position: "absolute",
    bottom: -80,
    left: 0,
    right: 0,
    width: "120%",
    height: 80,
    transform: [{ scaleX: -1 }],
  },
  backButton: {
    zIndex: 1,
    top: 30,
  },
  icon: {
    width: 30,
    height: 30,
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
    paddingTop: 60,
    width: "90%",
  },
  inputContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderWidth: 1,
    borderRadius: 12,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    marginLeft: 0,
  },
  inputIcon: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
  buttonLogin: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 20,
  },
  textLogin: {
    fontWeight: '500',
    fontSize: 16,
  },
  errorText: {
    color: '#F44336',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
    marginTop: 5,
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  emailContainer: {
    marginBottom: 32,
  },
  buttonIcons: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
