import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../../components';
import { useTheme } from '../../constants/ThemeContext';

export default function RouterDetails() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.loginHeader }]}>
      <Header onBackPress={() => router.push('/(tabs)/home' as any)} showWave={false}/>

      <View style={[styles.content, { backgroundColor: colors.background }]}>
        {/* Conteúdo da tela de Roteadores pode ficar aqui */}
        
      </View>

      
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});
