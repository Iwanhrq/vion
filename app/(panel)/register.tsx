import { Poppins_500Medium, useFonts } from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';



const Wave = () => (
    <Svg
        viewBox="0 0 1440 320"
        style={styles.wave} // Aqui entra o estilo com `position: absolute`
        preserveAspectRatio="none"
    >
        <Path
            fill="#430065"
            fillOpacity="1"
            d="M0,64L80,58.7C160,53,320,43,480,80C640,117,800,203,960,240C1120,277,1280,267,1360,261.3L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        />
    </Svg>
);


export default function Login() {

    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
    });

    if (!fontsLoaded) {
        return null; // ou um <LoadingScreen /> se quiser
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.push('/outset')} style={styles.backButton}>
                            <LinearGradient
                                colors={['#FFFFFF', '#FFFFFF', '#6E02A8']}
                                locations={[0, 0.33, 0.97]}
                                style={styles.backButtonCircle}
                            >
                                <Image
                                    source={require('../../assets/images/seta.png')}
                                    style={styles.icon}
                                />
                            </LinearGradient>
                        </TouchableOpacity>
                        <Wave />
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.title}>Registre-se</Text>
                        <Text style={styles.subtitle}>Crie sua conta</Text>

                        <View style={styles.form}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nome"
                                    value={name}
                                    onChangeText={setName}
                                    autoCapitalize="words"
                                    placeholderTextColor="rgba(255,255,255,0.5)"
                                />
                                <Image
                                    source={require('../../assets/images/user.png')}
                                    style={styles.inputIcon}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    placeholderTextColor="rgba(255,255,255,0.5)"
                                />
                                <Image
                                    source={require('../../assets/images/mail.png')}
                                    style={styles.inputIcon}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Senha"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    placeholderTextColor="rgba(255,255,255,0.5)"
                                />
                                <Image
                                    source={require('../../assets/images/password.png')}
                                    style={styles.inputIcon}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirmar senha"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry
                                    placeholderTextColor="rgba(255,255,255,0.5)"
                                />
                                <Image
                                    source={require('../../assets/images/password.png')}
                                    style={styles.inputIcon}
                                />
                            </View>

                            <TouchableOpacity style={styles.buttonLogin}>
                                <Text style={styles.textLogin}>Login</Text>
                            </TouchableOpacity>


                            <View style={styles.dividerContainer}>
                                <View style={styles.dividerLine} />
                                <Text style={styles.dividerText}>OU</Text>
                                <View style={styles.dividerLine} />
                            </View>

                            <View style={styles.buttons}>
                                <TouchableOpacity style={styles.buttonMG}>
                                    <Image
                                        source={require('../../assets/images/google.png')}
                                        style={styles.iconButtons}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.buttonMG}>
                                    <Image
                                        source={require('../../assets/images/microsoft.png')}
                                        style={styles.iconButtons}
                                    />
                                </TouchableOpacity>
                            </View>
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
        backgroundColor: "#000",
    },
    header: {
        padding: 23,
        height: 80,
        backgroundColor: "#430065",
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
        top: 25,
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
        color: '#fff',
        fontSize: 32,
        fontWeight: 'semibold',
        paddingLeft: 10,
        fontFamily: "Poppins_500Medium"
    },
    subtitle: {
        color: 'rgba(255,255,255,0.5)',
    },
    form: {
        paddingTop: 40,
        width: "90%",
        gap: 32,
    },
    input: {
        flex: 1,
        height: 45,
        color: 'rgba(255,255,255,0.5)',
        fontSize: 16,
    },
    buttonLogin: {
        height: 50,
        backgroundColor: '#430065',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        borderRadius: 20,
    },
    textLogin: {
        color: '#fff',
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
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    dividerText: {
        marginHorizontal: 12,
        color: 'rgba(255,255,255,0.5)',
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
        borderColor: "#fff",
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
        borderBottomColor: 'rgba(255,255,255,0.3)',
    },
    inputIcon: {
        width: 16,
        height: 16,
        marginLeft: 10,
    },

});
