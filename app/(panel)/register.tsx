import { Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../constants/ThemeContext';

//firebase imports
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";


const Wave = ({ waveColor }: { waveColor: string }) => (
    <Svg
        viewBox="0 0 1440 320"
        style={styles.wave} // Aqui entra o estilo com `position: absolute`
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

    const router = useRouter();
    const { colors } = useTheme();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState<string | null>(null);

    const [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
    });

    if (!fontsLoaded) {
        return null; // ou um <LoadingScreen /> se quiser
    }
    const registerprovider = async (typeregister: string) => {
        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)

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
            console.log("Registro feito com sucesso", result.user)

            router.push('/(tabs)/home' as any)
        }
        catch (error: any) {
            setError("Erro" + error.message);
        }
    }



    //funções de registro
    const handleregister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            setError('Erro, Preencha todos os campos');
            return;
        }

        if (password != confirmPassword) {
            setError('Erro, senhas diferentes');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const uid = userCredential.user.uid;

            await setDoc(doc(db, "users", uid), {
                type: "email/senha",
                name: name,
                email: email,
                createdAt: serverTimestamp(),
            })
            console.log("sucesso", "Conta criada com sucesso")
            setName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')

            router.push("/(tabs)/home" as any)
        }
        catch (error: any) {
            setError("Erro" + error.message)
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
                        <Text style={[styles.title, { color: colors.text }]}>Registre-se</Text>
                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Crie sua conta</Text>

                        <View style={styles.form}>
                            <View style={[styles.inputContainer, { borderBottomColor: colors.border }]}>
                                <TextInput
                                    style={[styles.input, { color: colors.text }]}
                                    placeholder="Nome"
                                    value={name}
                                    onChangeText={setName}
                                    autoCapitalize="words"
                                    placeholderTextColor={colors.placeholder}
                                />
                                <Image
                                    source={require('../../assets/images/user.png')}
                                    style={styles.inputIcon}
                                />
                            </View>

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

                            <View style={[styles.inputContainer, { borderBottomColor: colors.border }]}>
                                <TextInput
                                    style={[styles.input, { color: colors.text }]}
                                    placeholder="Confirmar senha"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry
                                    placeholderTextColor={colors.placeholder}
                                />
                                <Image
                                    source={require('../../assets/images/password.png')}
                                    style={styles.inputIcon}
                                />
                            </View>

                            <TouchableOpacity onPress={handleregister} style={[styles.buttonLogin, { backgroundColor: colors.buttonPrimary }]}>
                                <Text style={[styles.textLogin, { color: colors.buttonText }]}>Cadastrar</Text>
                            </TouchableOpacity>

                            {error && <Text style={styles.errorText}>{error}</Text>}
{/*}
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
    )
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
        paddingTop: 100,
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
        paddingTop: 40,
        width: "90%",
        gap: 32,
    },
    input: {
        flex: 1,
        height: 45,
        fontSize: 16,
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

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        borderBottomWidth: 1,
    },
    inputIcon: {
        width: 16,
        height: 16,
        marginLeft: 10,
    },
    errorText: {
        color: '#F44336',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 14,
    }

});
