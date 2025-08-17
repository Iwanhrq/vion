import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Header } from '../../components';
import { useRouterContext } from '../../constants/RouterContext';
import { useTheme } from '../../constants/ThemeContext';

import {
  FormButton,
  SectionTitle
} from '../../components';

export default function RouterDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { colors } = useTheme();
  const { routers, removeRouter, updateRouter } = useRouterContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState<{[key: string]: string}>({});
  
  // Pega o roteador baseado no ID da rota ou o primeiro disponível
  const routerId = params.id as string;
  const currentRouter = routerId 
    ? routers.find(r => r.id === routerId) 
    : routers[0];
  
  // Se não houver roteador, mostra mensagem de erro
  if (!currentRouter) {
    return (
      <View style={[styles.container, { backgroundColor: colors.loginHeader }]}>
        <Header onBackPress={() => router.push('/(tabs)/home' as any)} showWave={false} />
        <View style={[styles.content, { backgroundColor: colors.background }]}>
          <Text style={[styles.errorText, { color: colors.text }]}>
            Roteador não encontrado
          </Text>
        </View>
      </View>
    );
  }
  
  const handleEdit = () => {
    // Inicializa os valores editáveis
    setEditedValues({
      name: currentRouter.name || '',
      description: currentRouter.description || '',
      model: 'TP-Link Archer C6',
      ip: '192.168.1.1'
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (currentRouter.id) {
      // Atualiza apenas os campos editáveis
      updateRouter(currentRouter.id, {
        name: editedValues.name !== undefined ? editedValues.name : currentRouter.name,
        description: editedValues.description !== undefined ? editedValues.description : currentRouter.description
      });
      Alert.alert('Sucesso', 'Informações do roteador atualizadas!');
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedValues({});
  };

  const handleDelete = () => {
    Alert.alert(
      'Excluir Roteador',
      'Tem certeza que deseja excluir este roteador? Esta ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            // Remove o roteador do contexto
            removeRouter(currentRouter.id);
            // Navega para a tela home
            router.push('/(tabs)/home' as any);
          },
        },
      ]
    );
  };

  // Lista dos campos com informações fixas + nome específico
  const routerDetails = [
    { label: 'Nome:', value: currentRouter.name || '', editable: true, key: 'name' },
    { label: 'Descrição:', value: currentRouter.description || '', editable: true, key: 'description' },
    { label: 'Modelo:', value: 'TP-Link Archer C6', editable: true, key: 'model' },
    { label: 'IP:', value: '192.168.1.1', editable: true, key: 'ip' },
    { label: 'Status:', value: 'Online', editable: false, key: 'status' },
    { label: 'Nível de segurança:', value: 'Alto', editable: false, key: 'security' },
    { label: 'Último Scan:', value: '15/02/2024 às 14:30', editable: false, key: 'lastScan' },
    { label: 'Dispositivos Conectados:', value: '8', editable: false, key: 'devices' },
    { label: 'Firmware:', value: 'v2.1.0', editable: false, key: 'firmware' },
    { label: 'Tempo Ativo:', value: '15 dias', editable: false, key: 'uptime' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.loginHeader }]}>
      <Header onBackPress={() => router.push('/(tabs)/home' as any)} showWave={false}>
        <View style={styles.headerTitle}>
          <View style={styles.titleContainer}>
            <Text style={styles.routerName}>{currentRouter.name}</Text>
            {!isEditing ? (
              <View style={styles.headerActions}>
                <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                  <Ionicons name="create-outline" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete()}>
                  <Ionicons name="trash-outline" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                  <Ionicons name="checkmark" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                  <Ionicons name="close" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Header>

      <View style={[styles.content, { backgroundColor: colors.background }]}>
        {/* Debug: Adicionando um View com fundo para visualizar o SectionTitle */}
        <View style={styles.titleContainer}>
          <SectionTitle title="Informações do roteador" style={styles.customTitle} />
        </View>

        <View style={[styles.backgroundCard, { backgroundColor: colors.card }]}>
          <View style={styles.logoEdit}>
          </View>

          {/* Renderização dinâmica dos detalhes */}
          {routerDetails.map((item, index) => (
            <View
              key={index}
              style={[
                styles.item,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: index === routerDetails.length - 1 ? 0 : 1 // última linha sem borda
                }
              ]}
            >
              <View style={styles.labelContainer}>
                <Text style={[styles.textLeft, { color: colors.textSecondary }]}>{item.label}</Text>
              </View>
              {isEditing && item.editable ? (
                <TextInput
                  style={[styles.textInput, { color: colors.text }]}
                  value={editedValues[item.key] !== undefined ? editedValues[item.key] : (item.value || '')}
                  onChangeText={(text) => {
                    setEditedValues(prev => ({
                      ...prev,
                      [item.key]: text
                    }));
                  }}
                  placeholder={item.key === 'description' ? 'Digite uma descrição...' : (item.value || '')}
                />
              ) : (
                <Text style={[
                  styles.textRight, 
                  { 
                    color: item.key === 'description' && !item.value 
                      ? colors.textSecondary 
                      : colors.text 
                  },
                  item.editable && styles.editableValue
                ]}>
                  {item.key === 'description' && !item.value ? 'Sem descrição' : (item.value || '')}
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* Botão de ação */}
        <FormButton
          title="Escanear rede"
          variant="primary"
          size="large"
          style={styles.buttonScan}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 30,
    flex: 1,
    padding: 20,
    paddingBottom: 40,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    // Removendo alignItems: 'center' para evitar problemas de layout
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  backgroundCard: {
    width: '100%',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoEdit: {
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    minHeight: 44,
  },
  textLeft: {
    fontWeight: '600',
    fontSize: 14,
  },
  textRight: {
    fontSize: 14,
  },
  textEdit: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonScan: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 20,
  },
  headerTitle: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
    marginTop: 35,
  },
  routerName: {
    paddingLeft: 5,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    flex: 1,
  },
  editButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  saveButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 255, 0, 0.3)',
  },
  cancelButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
  },
  textInput: {
    fontSize: 14,
    flex: 1,
    paddingVertical: 0,
    textAlign: 'right',
    minWidth: 100,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  editableValue: {
    fontWeight: '500',
    fontSize: 15,
  },
  customTitle: {
    fontSize: 24, // Ajuste o tamanho do título conforme necessário
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    padding: 20,
  },
});