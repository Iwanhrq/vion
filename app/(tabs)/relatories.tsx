import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Header } from '../../components';
import { useRouterContext } from '../../constants/RouterContext';
import { useTheme } from '../../constants/ThemeContext';

export default function Relatories() {
  const router = useRouter();
  const { colors } = useTheme();
  const { routers } = useRouterContext();

  return (
    <View style={[styles.container, { backgroundColor: colors.loginHeader }]}>
      <Header onBackPress={() => router.push('/(tabs)/home' as any)} showWave={false}/>

      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.textTitle }]}>Relatórios</Text>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {routers.length > 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.text }]}>
                Nenhum relatório gerado
              </Text>
              <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
                Adicione seu primeiro roteador para que possa visualizar um relatório detalhado sobre ele.
              </Text>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.text }]}>
                Nenhum relatório gerado
              </Text>
              <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
                Adicione seu primeiro roteador para que possa visualizar um relatório detalhado sobre ele.
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
