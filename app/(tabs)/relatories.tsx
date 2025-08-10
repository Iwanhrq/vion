import { View, Text, StyleSheet } from 'react-native';

export default function Relatories() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Relatório</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fundo escuro de exemplo
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
