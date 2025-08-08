import { Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../constants/ThemeContext';

//firebase import
import { FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { colors } = useTheme();
    const [error, setError] = useState<string | null>(null);

    const [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
    });

    if (!fontsLoaded) {
        return null;
    }

    const loginpopup = async (typeregister: string) => {
        try {
            const provide = typeregister == "Google"
                ? new GoogleAuthProvider()
                : new FacebookAuthProvider()

            const result = await signInWithPopup(auth, provide)

            await setDoc(
                doc(db, 'users', result.user.uid), {
                type: "Google",
                name: result.user.displayName,
                email: result.user.email,
                createdAt: serverTimestamp(),
            },
                {
                    merge: true
                });
            console.log("Login feito com sucesso", result.user)

            router.push('/(tabs)/home' as any)
        }
        catch (error: any) {
            setError("Erro" + error.message);
        }
    }

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Coloca Login e Senha")
            return
        }

        setError(null)

        try {
            const UserCredencial = await signInWithEmailAndPassword(auth, email, password)
            console.log("Usuario autenticado", UserCredencial.user.email)
            router.push('/(tabs)/home' as any)

        }
        catch (err: any) {
            if (err.code === "auth/user-not-found") {
                setError("Usuario não encontrado")
            }
            else if (err.code === "auth/wrong-password") {
                setError("Senha errada")
            }
            else {
                setError("Erro na autenticação, tente novamente")
            }
        }
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

                    <View style={[styles.header, { backgroundColor: colors.loginHeader }]}>
                        <TouchableOpacity onPress={() => router.push('/outset')} style={styles.backButton}>
                            <Image
                                source={require('../../assets/images/seta.png')}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <Wave waveColor={colors.loginWave} />
                    </View>

                    <View style={styles.content}>
                        <Text style={[styles.title, { color: colors.text }]}>Bem-vindo(a)</Text>
                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Faça login com a sua conta</Text>

                        <View style={styles.form}>
                            <View style={[styles.inputContainer, { borderBottomColor: colors.border }]}>
                                <TextInput
                                    style={[styles.input, { color: colors.text }]}
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    placeholderTextColor={colors.placeholder}
                                />
                                <Image
                                    source={require('../../assets/images/mail.png')}
                                    style={styles.inputIcon}
                                />
                            </View>

                            <View style={[styles.inputContainer, { borderBottomColor: colors.border }]}>
                                <TextInput
                                    style={[styles.input, { color: colors.text }]}
                                    placeholder="Senha"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    placeholderTextColor={colors.placeholder}
                                />
                                <Image
                                    source={require('../../assets/images/password.png')}
                                    style={styles.inputIcon}
                                />
                            </View>

                            <TouchableOpacity onPress={() => handleLogin()} style={[styles.buttonLogin, { backgroundColor: colors.buttonPrimary }]}>
                                <Text style={[styles.textLogin, { color: colors.buttonText }]}>Login</Text>
                            </TouchableOpacity>

                            {error && <Text style={styles.errorText}>{error}</Text>}
{/*}
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
    )
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
    backButtonCircle: {
        width: 45,
        height: 45,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    icon: {
        width: 30,
        height: 30,
    },
    content: {
        paddingTop: 120,
        padding: 35,
        alignItems: "center"
    },
    title: {
        fontSize: 32,
        fontWeight: 'semibold',
        paddingLeft: 10,
        fontFamily: "Poppins_600SemiBold"
    },
    subtitle: {
        fontSize: 16,
    },
    form: {
        paddingTop: 60,
        width: "90%",
        gap: 32,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        borderBottomWidth: 1,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    inputIcon: {
        width: 16,
        height: 16,
        marginLeft: 10,
    },
    buttonLogin: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        borderRadius: 20,
    },
    textLogin: {
        fontWeight: 'bold',
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
    errorText: {
        color: '#F44336',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 14,
    }
});
