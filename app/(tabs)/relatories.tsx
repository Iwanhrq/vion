import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Header, ReportCard, ReportCardExpanded, ReportHistoryCard, SectionTitle } from '../../components';
import { useRouterContext } from '../../constants/RouterContext';
import { useTheme } from '../../constants/ThemeContext';

export default function Relatories() {
  const router = useRouter();
  const { colors } = useTheme();
  const { routers } = useRouterContext();
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  // Determina se deve mostrar estado com dados ou vazio
  const hasData = routers.length > 0;

  // Função para expandir/colapsar relatório
  const handleReportPress = (reportId: string) => {
    setExpandedReport(expandedReport === reportId ? null : reportId);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.loginHeader }]}>
      <Header onBackPress={() => router.push('/(tabs)/home' as any)} showWave={false}/>

      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.title, { color: colors.textTitle }]}>Relatórios</Text>
          {hasData ? (
            // Quando há roteadores - mostra o card bonito
            <View style={styles.reportsSection}>
              <SectionTitle title="Último Relatório" />
              <ReportCard hasData={true} />
              
              {/* Seção de Histórico de Relatórios */}
              <View style={styles.historySection}>
                <SectionTitle title="Histórico de Relatórios" />
                
                {/* Primeiro card de exemplo */}
                <ReportHistoryCard
                  protectionLevel="Médio"
                  problemsCount={5}
                  date="02/08/2025 20:45"
                  statusColor="#FFC107"
                  onPress={() => handleReportPress('report1')}
                  noMargin={expandedReport === 'report1'}
                  isExpanded={expandedReport === 'report1'}
                />
                
                {/* Relatório expandido do primeiro card */}
                {expandedReport === 'report1' && (
                  <View style={styles.expandedReportContainer}>
                    <ReportCardExpanded hasData={true} noTopRadius={true} />
                  </View>
                )}
                
                {/* Segundo card de exemplo */}
                <ReportHistoryCard
                  protectionLevel="Baixo"
                  problemsCount={9}
                  date="25/07/2025 19:49"
                  statusColor="#F44336"
                  onPress={() => handleReportPress('report2')}
                  noMargin={expandedReport === 'report2'}
                  isExpanded={expandedReport === 'report2'}
                />
                
                {/* Relatório expandido do segundo card */}
                {expandedReport === 'report2' && (
                  <View style={styles.expandedReportContainer}>
                    <ReportCardExpanded hasData={true} noTopRadius={true} />
                  </View>
                )}
                
                {/* Terceiro card de exemplo */}
                <ReportHistoryCard
                  protectionLevel="Baixo"
                  problemsCount={11}
                  date="01/07/2025 12:13"
                  statusColor="#F44336"
                  onPress={() => handleReportPress('report3')}
                  noMargin={expandedReport === 'report3'}
                  isExpanded={expandedReport === 'report3'}
                />
                
                {/* Relatório expandido do terceiro card */}
                {expandedReport === 'report3' && (
                  <View style={styles.expandedReportContainer}>
                    <ReportCardExpanded hasData={true} noTopRadius={true} />
                  </View>
                )}
              </View>
            </View>
          ) : (
            // Quando não há roteadores - mostra a mensagem original
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
  reportsSection: {
    marginBottom: 20,
  },
  historySection: {
    marginTop: 20,
  },
  expandedReportContainer: {
    marginTop: 0,
    marginBottom: 0,
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
