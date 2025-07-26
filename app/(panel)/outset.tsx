import { useRouter } from 'expo-router';
import { StyleSheet, View, Text, TextInput, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { useFonts, Poppins_500Medium } from '@expo-google-fonts/poppins';

export default function Outset() {
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
    });

    if (!fontsLoaded) {
        return null; // ou um <LoadingScreen /> se quiser
    }
    return (

        <ImageBackground
            source={require('../../assets/images/backgroundOutset.png')}
            style={styles.background}
        >
            <View style={styles.header}>
                <Image
                    source={require('../../assets/images/logo.png')} 
                    style={styles.icon}
                />
                <Text style={styles.appName}>Vion</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.sloganText}>
                    Segurança{"\n"}
                    que conecta,{"\n"}
                    inteligência{"\n"}
                    que protege
                </Text>

                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => router.push('/login')}
                    >
                        <Text style={styles.loginText}>
                            Faça Login
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={() => router.push('/register')}
                    >
                        <Text style={styles.registerText}>
                            Ainda não tem uma conta? Cadastre-se
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground >

    )
}

const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
    },
    header: {
        position: "absolute",
        top: 60,
        left: 20,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 10,
    },
    icon: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    appName: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        marginTop: 200,
        paddingLeft: 20
    },
    sloganText: {
        color: "#fff",
        fontSize: 36,
        lineHeight: 55,
        fontFamily: "Poppins_500Medium"
    },
    buttons: {
        alignItems: "center",
        paddingTop: 150
    },
    loginButton: {
        backgroundColor: "#430065",
        width: 260,
        height: 50,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    loginText: {
        fontSize: 15,
        color: "#fff",
        fontWeight: 500
    },
    registerButton: {
        paddingTop: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    registerText: {
        fontSize: 13,
        color: "#fff"
    }
})