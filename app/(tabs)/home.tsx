// Navegação
import { useRouter } from 'expo-router';

// React
import { useEffect, useState } from 'react';

// Componentes nativos do React Native
import {
  Alert,
  Dimensions,
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
}> = [
    // Comentado para testar estado vazio
    // { id: '1', name: 'Roteador 1', description: 'Veja mais sobre esse roteador.' },
    // { id: '2', name: 'Roteador 2', description: 'Veja mais sobre esse roteador.' },
    // { id: '3', name: 'Roteador 3', description: 'Veja mais sobre esse roteador.' },
    // { id: '4', name: 'Roteador 4', description: 'Veja mais sobre esse roteador.' },
  ];

// Dados estáticos dos relatórios (para teste - pode ser vazio)
const REPORTS: Array<{
  id: string;
  networkName: string;
  status: 'Segura' | 'Atenção' | 'Crítico';
  date: string;
  time: string;
}> = [
    // Comentado para testar estado vazio
    // { 
    //   id: '1', 
    //   networkName: 'Rede Casa Principal', 
    //   status: 'Segura', 
    //   date: '15/12/2024', 
    //   time: '14:30' 
    // },
    // { 
    //   id: '2', 
    //   networkName: 'Rede Escritório', 
    //   status: 'Atenção', 
    //   date: '14/12/2024', 
    //   time: '09:15' 
    // },
    // { 
    //   id: '3', 
    //   networkName: 'Rede Café', 
    //   status: 'Segura', 
    //   date: '13/12/2024', 
    //   time: '16:45' 
    // },
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
  const [modalVisible, setModalVisible] = useState(false);
  const [routerName, setRouterName] = useState('');
  const [routerDescription, setRouterDescription] = useState('');
  const { routers, addRouter } = useRouterContext();

  const screenWidth = Dimensions.get('window').width;

  const router = useRouter();
  const { colors } = useTheme();

  // Determina se deve mostrar estado com dados ou vazio
  const hasData = (ROUTERS.length > 0 || routers.length > 0) && REPORTS.length > 0;
  const isEmpty = (ROUTERS.length === 0 && routers.length === 0) && REPORTS.length === 0;

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

    // Adiciona o novo roteador usando o contexto global
    addRouter({
      name: routerName.trim(),
      description: routerDescription.trim() || 'Veja mais sobre esse roteador.'
    });

    // Limpa os campos e fecha o modal
    setRouterName('');
    setRouterDescription('');
    setModalVisible(false);

    Alert.alert('Sucesso', 'Roteador adicionado com sucesso!');
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
            percentage="100%"
            status="Sua rede está segura"
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
              {/* Roteadores estáticos */}
              {ROUTERS.map((router_item) => (
                <RouterCard
                  key={router_item.id}
                  id={router_item.id}
                  name={router_item.name}
                  description={router_item.description}
                  onPress={() => router.push('/(router)/routerDetails')}
                />
              ))}

              {/* Roteadores adicionados pelo usuário */}
              {routers.map((router_item) => (
                <RouterCard
                  key={router_item.id}
                  id={router_item.id}
                  name={router_item.name}
                  description={router_item.description}
                  onPress={() => router.push('/(router)/routerDetails')}
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

          {/* Linha divisória */}
          <Divider />

          {/* Seção: Relatórios */}
          <View style={styles.reports}>
            <SectionTitle title="Histórico de relatórios" />
            {hasData ? (
              // Estado com dados - cards usando ReportCard
              <>
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
              </>
            ) : (
              // Estado vazio - card cinza com ícone circular vazio
              <>
                <View style={[styles.emptyReportCard, { backgroundColor: colors.card }]}>
                  <View style={styles.emptyReportContent}>
                    <View style={[styles.emptyReportIcon, { borderColor: colors.textSecondary }]}>
                    </View>
                    <View style={styles.emptyReportTextContainer}>
                      <Text style={[styles.emptyReportText, { color: colors.text }]}>
                        Nenhum relatório disponível
                      </Text>
                      <Text style={[styles.emptyReportSubtext, { color: colors.textSecondary }]}>
                        Faça sua primeira checagem para ver relatórios aqui
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            )}
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

  // Seção Roteadores
  routers: {
    paddingTop: 20,
    height: 250,
  },
  routersScroll: {
    paddingRight: 20,
  },

  // Estado vazio dos roteadores
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

  // Seção Relatórios
  reports: {},
  reportsContainer: {},

  // Estado vazio dos relatórios
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
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
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

  showMoreRelatories: {
    textAlign: "center",
  },

  // Seção Dicas
  tipsContainer: {},
  tipsScroll: {
    paddingRight: 20,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
