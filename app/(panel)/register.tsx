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

// Firebase imports para autenticação e banco de dados
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

// Componente SVG para a onda decorativa no topo da tela
const Wave = ({ waveColor }: { waveColor: string }) => (
  <Svg
    viewBox="0 0 1440 320"
    style={styles.wave} // Estilo com posição absoluta para posicionamento correto
    preserveAspectRatio="none"
  >
    <Path
      fill={waveColor}
      fillOpacity="1"
      d="M0,64L80,58.7C160,53,320,43,480,80C640,117,800,203,960,240C1120,277,1280,267,1360,261.3L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
    />
  </Svg>
);

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
  // Estados para mostrar/ocultar senhas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

          {/* Conteúdo principal */}
          <View style={styles.content}>
            <Text style={[styles.title, { color: colors.text }]}>Registre-se</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Crie sua conta</Text>

            <View style={styles.form}>

              {/* Campo Nome */}
              <View style={[styles.inputContainer, { borderColor: colors.border }]}>

                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Nome"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  placeholderTextColor={colors.placeholder}
                />
                <Ionicons
                  name="person"
                  size={18}
                  color='#D0D0D0'
                  style={styles.buttonIcons}
                />
              </View>

              {/* Campo Email */}
              <View style={[styles.inputContainer, { borderColor: colors.border }]}>

                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor={colors.placeholder}
                />
                <Ionicons
                  name="mail"
                  size={18}
                  color='#D0D0D0'
                  style={styles.buttonIcons}
                />
              </View>

              {/* Campo Senha */}
              <View style={[styles.inputContainer, { borderColor: colors.border }]}>
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Senha"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor={colors.placeholder}
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

              {/* Campo Confirmar Senha */}
              <View style={[styles.inputContainer, { borderColor: colors.border }]}>
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Confirmar senha"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  placeholderTextColor={colors.placeholder}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.buttonIcons}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={20}
                    color='#D0D0D0'
                    />
                </TouchableOpacity>
              </View>

              {/* Botão de cadastro */}
              <TouchableOpacity
                onPress={handleRegister}
                style={[styles.buttonRegister, { backgroundColor: colors.buttonPrimary }]}
              >
                <Text style={[styles.textRegister, { color: colors.buttonText }]}>Cadastrar</Text>
              </TouchableOpacity>

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
  header: {
    padding: 23,
    height: 80,
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
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    marginLeft: 0,
  },
  buttonRegister: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 20,
  },
  textRegister: {
    fontWeight: '500',
    fontSize: 16,
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
  inputContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderWidth: 1,
    borderRadius: 12,
  },
  buttonIcons: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: '#F44336',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
  }
});
