// Navegação
import { useRouter } from 'expo-router';

// React
import { useEffect, useState } from 'react';

// Componentes nativos do React Native
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Temas personalizados
import { useRouterContext } from '../../constants/RouterContext';
import { useTheme } from '../../constants/ThemeContext';

// Componentes personalizados
import {
  Divider,
  NetworkStatusHeader,
  ReportCard,
  RouterCard,
  SectionTitle,
  TipCard
} from '../../components';

// Dados estáticos dos roteadores (para teste - pode ser vazio)
const ROUTERS: Array<{
  id: string;
  name: string;
  description: string;
}> = [];

// Dados estáticos dos relatórios (para teste - pode ser vazio)
const REPORTS: Array<{
  id: string;
  networkName: string;
  status: 'Segura' | 'Atenção' | 'Crítico';
  date: string;
  time: string;
}> = [];

// Dados estáticos das dicas
const TIPS = [
  { id: '1', name: 'Você sabe o que é WPS?', description: 'Facilita conexões no Wi-Fi, mas pode abrir brechas. Se não usa, desative.' },
  { id: '2', name: 'Você sabe o que é WPS?', description: 'Facilita conexões no Wi-Fi, mas pode abrir brechas. Se não usa, desative.' },
  { id: '3', name: 'Você sabe o que é WPS?', description: 'Facilita conexões no Wi-Fi, mas pode abrir brechas. Se não usa, desative.' },
  { id: '4', name: 'Você sabe o que é WPS?', description: 'Facilita conexões no Wi-Fi, mas pode abrir brechas. Se não usa, desative.' },
];

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [routerName, setRouterName] = useState('');
  const [routerDescription, setRouterDescription] = useState('');
  const [loadingStatus, setLoadingStatus] = useState('');
  const [progressValue, setProgressValue] = useState(0);
  const { routers, addRouter } = useRouterContext();

  // Animação da barra de progresso
  const progressAnimation = new Animated.Value(0);

  const screenWidth = Dimensions.get('window').width;

  const router = useRouter();
  const { colors, currentTheme } = useTheme();

  // Determina se deve mostrar estado com dados ou vazio
  const hasData = routers.length > 0;
  const isEmpty = routers.length === 0;

  useEffect(() => {
    console.log('Entrou na Homepage — login deu certo!');
  }, []);

  const handleLogout = () => {
    router.replace('/(panel)/login');
  };

  const handleAddRouter = () => {
    if (!routerName.trim()) {
      Alert.alert('Erro', 'Por favor, insira o nome do roteador');
      return;
    }

    // Fecha o modal de entrada e abre o modal de carregamento
    setModalVisible(false);
    setLoadingModalVisible(true);

    // Reseta a animação da barra de progresso e status
    progressAnimation.setValue(0);
    setProgressValue(0);
    setLoadingStatus('Iniciando configuração...');

    // Simula etapas de progresso com animações sequenciais
    const progressSteps = [
      { toValue: 0.2, duration: 800, delay: 0, status: 'Conectando ao roteador...' },
      { toValue: 0.4, duration: 600, delay: 800, status: 'Analisando configurações...' },
      { toValue: 0.6, duration: 800, delay: 1400, status: 'Verificando segurança...' },
      { toValue: 0.8, duration: 600, delay: 2200, status: 'Finalizando configuração...' },
      { toValue: 1.0, duration: 800, delay: 2800, status: 'Concluindo...' },
    ];

    // Executa as animações sequencialmente
    progressSteps.forEach((step, index) => {
      setTimeout(() => {
        console.log(`Progresso: ${Math.round(step.toValue * 100)}% - ${step.status}`);
        setLoadingStatus(step.status);
        setProgressValue(Math.round(step.toValue * 100));
        Animated.timing(progressAnimation, {
          toValue: step.toValue,
          duration: step.duration,
          useNativeDriver: false,
        }).start();
      }, step.delay);
    });

    // Simula o processo de adição com uma barra de progresso fake
    setTimeout(() => {
      addRouter({
        name: routerName.trim(),
        description: routerDescription.trim() || 'Veja mais sobre esse roteador.'
      });

      setLoadingModalVisible(false);
      setRouterName('');
      setRouterDescription('');

      Alert.alert('Sucesso', 'Roteador adicionado com sucesso!');
    }, 4000);
  };

  const handleCancelAddRouter = () => {
    setRouterName('');
    setRouterDescription('');
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.loginHeader }]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header condicional */}
        {hasData ? (
          <NetworkStatusHeader
            percentage="43%"
            status="Vulnerabilidades detectadas"
            action="Clique aqui para analisar a rede novamente"
          />
        ) : (
          <NetworkStatusHeader
            percentage=""
            status="Nível de segurança indisponível"
            action="Adicione seu primeiro roteador para começar a monitorar sua rede"
          />
        )}

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
                  onPress={() => router.push('/(router)/routerDetails')}
                />
              ))}

              {routers.map((router_item) => (
                <RouterCard
                  key={router_item.id}
                  id={router_item.id}
                  name={router_item.name}
                  description={router_item.description}
                  onPress={() => router.push(`/(router)/routerDetails?id=${router_item.id}`)}
                />
              ))}

              {/* Botão de adicionar roteador */}
              <TouchableOpacity
                style={[styles.emptyRouterCard, { backgroundColor: colors.card }]}
                onPress={() => setModalVisible(true)}
              >
                <View style={styles.emptyRouterIcon}>
                  <Text style={[styles.emptyRouterIconText, { color: colors.textSecondary }]}>+</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <Divider />

          {/* Seção: Relatórios */}
          <View style={styles.reports}>
            <SectionTitle title="Último Relatório" />
            {hasData ? (
              <ReportCard hasData={true} />
            ) : (
              <View style={[styles.emptyReportCard, { backgroundColor: colors.card }]}>
                <View style={styles.emptyReportContent}>
                  <View style={[styles.emptyReportIcon, { borderColor: '#F44336' }]} />
                  <View style={styles.emptyReportTextContainer}>
                    <Text style={[styles.emptyReportText, { color: colors.text }]}>
                      Nenhum relatório disponível
                    </Text>
                    <Text style={[styles.emptyReportSubtext, { color: colors.textSecondary }]}>
                      Adicione seu primeiro roteador para gerar relatórios
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          <Divider />

          {/* Seção: Dicas rápidas */}
          <View style={styles.tipsContainer}>
            <SectionTitle title="Dicas Rápidas" />
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

      {/* BOTÃO FIXO (FAB) */}
      <TouchableOpacity
        style={[styles.fabButton, { backgroundColor: currentTheme === 'dark' ? colors.buttonTertiary : colors.buttonPrimary }]}
        onPress={() => Alert.alert('FAB clicado', 'Aqui você pode abrir o chat com o robô')}
      >
        {/* Troque o Text por <Image source={require('../../assets/images/robo.png')} style={styles.fabIcon}/> */}
        <Image source={require('../../assets/images/robozinho 1.png')} style={styles.fabIcon} />
      </TouchableOpacity>

      {/* Modal para adicionar roteador */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancelAddRouter}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <Text style={[styles.modalTitle, { color: colors.textTitle }]}>
              Adicionar roteador
            </Text>

            <Text style={[styles.modalDescription, { color: colors.textSecondary }]}>
              Para adicionar um roteador, conecte-se à rede Wi-Fi que deseja monitorar e confirme as informações abaixo.
            </Text>

            <TextInput
              style={[styles.modalInput, {
                backgroundColor: colors.card,
                color: colors.text,
                borderColor: colors.border,
              }]}
              placeholder="Nome do roteador"
              placeholderTextColor={colors.textSecondary}
              value={routerName}
              onChangeText={setRouterName}
            />

            <TextInput
              style={[styles.modalInput, {
                backgroundColor: colors.card,
                color: colors.text,
                borderColor: colors.border,
              }]}
              placeholder="Descrição (opcional)"
              placeholderTextColor={colors.textSecondary}
              value={routerDescription}
              onChangeText={setRouterDescription}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.buttonTertiary }]}
                onPress={handleCancelAddRouter}
              >
                <Text style={[styles.modalButtonText, { color: '#fff' }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.buttonPrimary }]}
                onPress={handleAddRouter}
              >
                <Text style={[styles.modalButtonText, { color: '#fff' }]}>
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de carregamento */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={loadingModalVisible}
        onRequestClose={() => { }}
      >
        <View style={styles.loadingModalOverlay}>
          <View style={[styles.loadingModalContent, { backgroundColor: colors.background }]}>
            <Text style={[styles.loadingModalTitle, { color: colors.textTitle }]}>
              Adicionando roteador...
            </Text>

            <Text style={[styles.loadingModalDescription, { color: colors.textSecondary }]}>
              {loadingStatus || 'Iniciando configuração...'}
            </Text>

            <View style={[styles.progressBarContainer, { backgroundColor: colors.card }]}>
              <View
                style={[
                  styles.progressBar,
                  {
                    backgroundColor: '#430065',
                    width: `${Math.max(progressValue, 1)}%`,
                  }
                ]}
              />
              <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                {progressValue}%
              </Text>
            </View>

            <Text style={[styles.debugText, { color: colors.textSecondary }]}>
              Progresso: {progressValue}%
            </Text>

            <Text style={[styles.loadingModalStatus, { color: colors.textSecondary }]}>
              Aguarde, isso pode levar alguns segundos
            </Text>
          </View>
        </View>
      </Modal>
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
    paddingTop: 22,
    paddingBottom: 40,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },

  // FAB (botão fixo)
  fabButton: {
  position: 'absolute',
  bottom: 80, // altura acima da tab bar
  right: 20, // distância da borda direita
  width: 70,
  height: 70,
  borderRadius: 35,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 6,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
},

  fabIconText: {
    fontSize: 28,
    color: '#fff',
  },
  fabIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: '#fff',
  },

  // Seção Roteadores
  routers: {
    paddingTop: 20,
    height: 250,
  },
  routersScroll: {
    paddingRight: 20,
  },
  emptyRouterCard: {
    height: 180,
    width: 160,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyRouterIcon: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyRouterIconText: {
    fontSize: 50,
    fontWeight: '400',
  },

  // Relatórios
  reports: {
    marginBottom: 20,
  },
  emptyReportCard: {
    height: 120,
    borderRadius: 15,
    justifyContent: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyReportContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  emptyReportTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  emptyReportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyReportText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emptyReportSubtext: {
    fontSize: 14,
  },

  // Dicas
  tipsContainer: {},
  tipsScroll: {
    paddingRight: 20,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },

  // Loading Modal
  loadingModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingModalContent: {
    width: '100%',
    maxWidth: 350,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loadingModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  loadingModalDescription: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 25,
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '100%',
    height: 12,
    borderRadius: 6,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(67, 0, 101, 0.2)',
  },
  progressBar: {
    height: '100%',
    width: '100%',
    borderRadius: 6,
    shadowColor: '#430065',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  progressText: {
    position: 'absolute',
    right: 8,
    top: -25,
    fontSize: 11,
    fontWeight: '500',
  },
  loadingModalStatus: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  debugText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.7,
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
  },
});
