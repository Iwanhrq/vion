import { useRouter } from 'expo-router';
import { SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, TouchableOpacity, Image, Text, TextInput } from 'react-native'
import Svg, { Path } from 'react-native-svg';

const router = useRouter();

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


export default function Login()
{
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.push('/outset')}>
                            <Image
                                source={require('../../assets/images/seta.png')}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <Wave />
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
        padding: 20,
        height: 120,
        backgroundColor: "#430065",
        position: "relative", // necessário para o filho absoluto funcionar
    },
    wave: {
        position: "absolute",
        bottom: -80, // empurra a curva mais para baixo (ajuste conforme necessário)
        left: 0,
        right: 0,
        width: "100%",
        height: 80,
    },
    icon: {
        width: 35,
        height: 35,
    },

});
