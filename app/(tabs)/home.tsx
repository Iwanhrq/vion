// Navegação
import { useRouter } from 'expo-router';

// React
import { useEffect, useState } from 'react';

// Componentes nativos do React Native
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Temas personalizados
import { useTheme } from '../../constants/ThemeContext';
import { useThemeColors } from '../../constants/useThemeColors';

// Dados estáticos dos roteadores
const ROUTERS = [
  { id: '1', name: 'Roteador 1', description: 'Veja mais sobre esse roteador.' },
  { id: '2', name: 'Roteador 2', description: 'Veja mais sobre esse roteador.' },
  { id: '3', name: 'Roteador 3', description: 'Veja mais sobre esse roteador.' },
  { id: '4', name: 'Roteador 4', description: 'Veja mais sobre esse roteador.' },
];

// Dados estáticos dos relatórios
const REPORTS = [
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
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/fundoHeader.png')}
            style={styles.headerBackground}
            resizeMode="contain"
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerPercentage}>100%</Text>
            <Text style={styles.headerStatus}>Sua rede está segura</Text>
            <Text style={styles.headerAction}>Clique aqui para analisar a rede novamente</Text>
          </View>
        </View>

        {/* Conteúdo principal */}
        <View style={[styles.content, { backgroundColor: colors.background }]}>

          {/* Seção: Meus Roteadores */}
          <View style={styles.routers}>
            <Text style={[styles.sectionTitle, { color: colors.textTitle }]}>Meus roteadores</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.routersScroll}
            >
              {ROUTERS.map((router_item) => (
                <TouchableOpacity onPress={() => router.push('/router')}
                  key={router_item.id}
                  style={[styles.routerCard, { backgroundColor: colors.card }]}
                >
                  <View style={styles.routerImageContainer}>
                    <Image source={require('../../assets/images/roteador.png')} />
                  </View>
                  <Text style={[styles.routerName, { color: colors.text }]}>{router_item.name}</Text>
                  <Text style={[styles.routerDescription, { color: colors.textSecondary }]} numberOfLines={2}>
                    {router_item.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Linha divisória */}
          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {/* Seção: Relatórios */}
          <View style={styles.reports}>
            <Text style={[styles.sectionTitle, { color: colors.textTitle }]}>Histórico de relatórios</Text>
            <View style={styles.reportsContainer}>
              {REPORTS.map((report) => (
                <TouchableOpacity 
                  onPress={() => router.push('/relatories')}
                  key={report.id}
                  style={[styles.reportCard, { backgroundColor: colors.card }]}
                >
                  <View style={styles.reportLeft}>
                    <Text style={[styles.reportName, { color: colors.textTitle }]}>{report.networkName}</Text>
                                         <Text style={[styles.reportStatus, { color: colors.textSecondary }]}>
                       Status: <Text style={{ 
                         color: report.status === 'Segura' ? globalColors.statusSafe : 
                                report.status === 'Atenção' ? globalColors.statusWarning : 
                                globalColors.statusCritical 
                       }}>{report.status}</Text>
                     </Text>
                  </View>
                  <View style={styles.reportRight}>
                    <Text style={[styles.reportDate, { color: colors.textSecondary }]}>{report.date}</Text>
                    <Text style={[styles.reportTime, { color: colors.textSecondary }]}>{report.time}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={() => router.push('/relatories')}>
              <Text style={[styles.showMoreRelatories, { color: colors.textTitle }]}>
                Mostrar mais
              </Text>
            </TouchableOpacity>
          </View>

          {/* Linha divisória */}
          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {/* Seção: Dicas rápidas */}
          <View style={styles.tipsContainer}>
            <Text style={[styles.sectionTitle, { color: colors.textTitle }]}>Dicas rápidas</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tipsScroll}
            >
              {TIPS.map((tip) => (
                <TouchableOpacity
                  key={tip.id}
                  style={[styles.tipCard, { backgroundColor: colors.card }]}
                >
                  <View style={[styles.tipImageContainer, { backgroundColor: globalColors.buttonPrimary }]} />
                  <View style={styles.tipInfo}>
                    <Text style={[styles.tipTitle, { color: colors.textTitle }]}>{tip.name}</Text>
                    <Text style={[styles.tipText, { color: colors.textSecondary }]}>{tip.description}</Text>
                    <TouchableOpacity style={[styles.buttonTip, { backgroundColor: colors.buttonSecondary }]}>
                      <Text style={[styles.buttonTipText, { color: colors.buttonText }]}>Conhecer</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
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
  header: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    position: 'relative',
    overflow: 'hidden',
  },
  headerBackground: {
    position: 'absolute',
    top: 10,
  },
  headerTextContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  headerPercentage: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerStatus: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 12,
    textAlign: 'center',
  },
  headerAction: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.8,
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
  sectionTitle: {
    paddingLeft: 5,
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  routersScroll: {
    paddingRight: 20,
  },
  routerCard: {
    height: 180,
    marginRight: 15,
    padding: 5,
    borderRadius: 12,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  routerName: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  routerDescription: {
    textAlign: 'center',
    paddingHorizontal: 2,
    fontSize: 13,
  },
  routerImageContainer: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Seção Relatórios
  reports: {},
  reportsContainer: {},
  reportCard: {
    height: 100,
    marginBottom: 12,
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  showMoreRelatories: {
    textAlign: "center",
  },
  reportName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  reportStatus: {
    fontSize: 13,
    marginBottom: 0,
  },
  reportDate: {
    fontSize: 12,
    marginBottom: 2,
  },
  reportLeft: {
    flex: 1,
    justifyContent: 'center',
  },
  reportRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportTime: {
    fontSize: 12,
    marginBottom: 0,
  },

  // Seção Dicas
  tipsContainer: {},
  tipsScroll: {
    paddingRight: 20,
  },
  tipCard: {
    width: 200,
    marginRight: 15,
    marginBottom: 16,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipImageContainer: {
    width: '100%',
    height: 90,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipInfo: {
    padding: 12,
  },
  tipTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    marginBottom: 10,
  },
  buttonTip: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: 80,
    height: 25,
  },
  buttonTipText: {
    fontSize: 12,
  },

  // Outros
  errorText: {
    color: 'tomato',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginVertical: 20,
    marginHorizontal: -20,
    opacity: 0.3,
  },
  botaologout: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    paddingLeft: 7,
  },
});
