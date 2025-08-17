import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Header, RouterListCard } from '../../components';
import { useRouterContext } from '../../constants/RouterContext';
import { useTheme } from '../../constants/ThemeContext';

export default function Router() {
  const router = useRouter();
  const { colors } = useTheme();
  const { routers } = useRouterContext();

  const handleRouterPress = (routerId: string) => {
    router.push('/(router)/routerDetails');
  };

  const handleFixPress = (routerId: string, routerName: string) => {
    Alert.alert(
      'Corrigir Roteador',
      `Deseja corrigir os problemas do roteador "${routerName}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Corrigir',
          onPress: () => {
            // Aqui você pode implementar a lógica de correção
            Alert.alert('Sucesso', 'Roteador corrigido com sucesso!');
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.loginHeader }]}>
      <Header onBackPress={() => router.push('/(tabs)/home' as any)} showWave={false}/>

      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.textTitle }]}>Roteadores</Text>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {routers.length > 0 ? (
            routers.map((router_item) => (
              <RouterListCard
                key={router_item.id}
                id={router_item.id}
                name={router_item.name}
                ip={router_item.ip || '192.168.1.1'}
                status={router_item.status || 'Seguro'}
                onPress={() => handleRouterPress(router_item.id)}
                onFixPress={() => handleFixPress(router_item.id, router_item.name)}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.text }]}>
                Nenhum roteador cadastrado
              </Text>
              <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
                Adicione seu primeiro roteador para começar a monitorar
              </Text>
            </View>
          )}
        </ScrollView>
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
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 10,
  },
  scrollView: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    borderRadius: 12,
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});
