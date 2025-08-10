// Navegação
import { useRouter } from 'expo-router';

// React
import { useEffect, useState } from 'react';

// Componentes nativos do React Native
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Temas personalizados
import { useTheme } from '../../constants/ThemeContext';
import { useThemeColors } from '../../constants/useThemeColors';

// Componentes personalizados
import {
  Divider,
  NetworkStatusHeader,
  ReportCard,
  RouterCard,
  SectionTitle,
  TipCard
} from '../../components';

// Dados estáticos dos roteadores
const ROUTERS = [
  { id: '1', name: 'Roteador 1', description: 'Veja mais sobre esse roteador.' },
  { id: '2', name: 'Roteador 2', description: 'Veja mais sobre esse roteador.' },
  { id: '3', name: 'Roteador 3', description: 'Veja mais sobre esse roteador.' },
  { id: '4', name: 'Roteador 4', description: 'Veja mais sobre esse roteador.' },
];

// Dados estáticos dos relatórios
const REPORTS: Array<{
  id: string;
  networkName: string;
  status: 'Segura' | 'Atenção' | 'Crítico';
  date: string;
  time: string;
}> = [
  { 
    id: '1', 
    networkName: 'Rede Casa Principal', 
    status: 'Segura', 
    date: '15/12/2024', 
    time: '14:30' 
  },
  { 
    id: '2', 
    networkName: 'Rede Escritório', 
    status: 'Atenção', 
    date: '14/12/2024', 
    time: '09:15' 
  },
  { 
    id: '3', 
    networkName: 'Rede Café', 
    status: 'Segura', 
    date: '13/12/2024', 
    time: '16:45' 
  },
];

// Dados estáticos das dicas
const TIPS = [
  { id: '1', name: 'Você sabe o que é WPS?', description: 'Facilita conexões no Wi-Fi, mas pode abrir brechas. Se não usa, desative.' },
  { id: '2', name: 'Você sabe o que é WPS?', description: 'Facilita conexões no Wi-Fi, mas pode abrir brechas. Se não usa, desative.' },
  { id: '3', name: 'Você sabe o que é WPS?', description: 'Facilita conexões no Wi-Fi, mas pode abrir brechas. Se não usa, desative.' },
  { id: '4', name: 'Você sabe o que é WPS?', description: 'Facilita conexões no Wi-Fi, mas pode abrir brechas. Se não usa, desative.' },
];

export default function Home() {
  const [error, setError] = useState<string | null>(null);

  const screenWidth = Dimensions.get('window').width;

  const router = useRouter();
  const { colors } = useTheme();
  const globalColors = useThemeColors();

  useEffect(() => {
    console.log('Entrou na Homepage — login deu certo!');
  }, []);

  const handleLogout = () => {
    router.replace('/(panel)/login');
  };

  return (
    <View style={[styles.container, { backgroundColor: globalColors.headerBackground }]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header estático */}
        <NetworkStatusHeader
          percentage="100%"
          status="Sua rede está segura"
          action="Clique aqui para analisar a rede novamente"
        />

        {/* Conteúdo principal */}
        <View style={[styles.content, { backgroundColor: colors.background }]}>

          {/* Seção: Meus Roteadores */}
          <View style={styles.routers}>
            <SectionTitle title="Meus roteadores" />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.routersScroll}
            >
              {ROUTERS.map((router_item) => (
                <RouterCard
                  key={router_item.id}
                  id={router_item.id}
                  name={router_item.name}
                  description={router_item.description}
                  onPress={() => router.push('/router')}
                />
              ))}
            </ScrollView>
          </View>

          {/* Linha divisória */}
          <Divider />

          {/* Seção: Relatórios */}
          <View style={styles.reports}>
            <SectionTitle title="Histórico de relatórios" />
            <View style={styles.reportsContainer}>
              {REPORTS.map((report) => (
                <ReportCard
                  key={report.id}
                  id={report.id}
                  networkName={report.networkName}
                  status={report.status}
                  date={report.date}
                  time={report.time}
                  onPress={() => router.push('/relatories')}
                />
              ))}
            </View>
            <TouchableOpacity onPress={() => router.push('/relatories')}>
              <Text style={[styles.showMoreRelatories, { color: colors.textTitle }]}>
                Mostrar mais
              </Text>
            </TouchableOpacity>
          </View>

          {/* Linha divisória */}
          <Divider />

          {/* Seção: Dicas rápidas */}
          <View style={styles.tipsContainer}>
            <SectionTitle title="Dicas rápidas" />
                          <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tipsScroll}
              >
                {TIPS.map((tip) => (
                  <TipCard
                    key={tip.id}
                    id={tip.id}
                    name={tip.name}
                    description={tip.description}
                  />
                ))}
              </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },

  // Seção Roteadores
  routers: {
    paddingTop: 20,
    height: 250,
  },
  routersScroll: {
    paddingRight: 20,
  },

  // Seção Relatórios
  reports: {},
  reportsContainer: {},
  showMoreRelatories: {
    textAlign: "center",
  },

  // Seção Dicas
  tipsContainer: {},
  tipsScroll: {
    paddingRight: 20,
  },

  // Outros
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
  },
});
