import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import { auth } from "../../firebaseConfig"



export default function Home() 
{
  const [error, setError] = useState<string | null > (null);
  const router = useRouter();

  //função para deslogar da conta       
   const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/(panel)/outset' as any)

    } catch (error) {
      setError("Problema ao sair da conta");
    }
  };

  useEffect(() => {
    console.log('Entrou na Homepage — login deu certo!');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo</Text>
  
    {error && <Text style={styles.errorText}>{error}</Text>}

    <TouchableOpacity onPress={handleLogout}>
      <Text style={styles.text}>sair</Text>
    </TouchableOpacity>
    </View>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#000',
    fontSize: 20
  },
  errorText: {
    color: 'tomato',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  botaologout: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    paddingLeft: 7,
  }
});
