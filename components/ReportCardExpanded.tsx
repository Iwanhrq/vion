import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../constants/ThemeContext';

interface ReportCardExpandedProps {
  hasData: boolean;
  noTopRadius?: boolean;
}

export const ReportCardExpanded: React.FC<ReportCardExpandedProps> = ({ hasData, noTopRadius = false }) => {
  const { colors } = useTheme();

  if (!hasData) {
    return (
      <View style={[styles.emptyReportCard, { backgroundColor: colors.card }]}>
        <View style={styles.emptyReportContent}>
          <View style={[styles.emptyReportIcon, { borderColor: colors.textSecondary }]}>
          </View>
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
    );
  }

  return (
    <View style={[
      styles.reportCardWithData, 
      { backgroundColor: colors.card },
      noTopRadius && {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }
    ]}>
      <View style={styles.reportCardWithDataContent}>
        {/* Primeiro item - Atualizar firmware */}
        <View style={[styles.reportItem, styles.secondaryReportItem]}>
          <View style={[styles.smallReportIcon, { borderColor: colors.textTitle }]}>
            <Text style={[styles.simpleIcon, { color: colors.textTitle }]}>!</Text>
          </View>
          <View style={styles.reportCardWithDataTextContainer}>
            <Text style={[styles.reportCardWithDataText, { color: colors.text }]}>
              Atualizar firmware do roteador
            </Text>
            <Text style={[styles.reportCardWithDataSubtext, { color: colors.textSecondary }]}>
              Sua versão atual possui falhas de seguranças conhecidas
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </View>

        {/* Segundo item - Desativar WPS */}
        <View style={[styles.reportItem, styles.secondaryReportItem]}>
          <View style={[styles.smallReportIcon, { borderColor: colors.textTitle }]}>
            <Text style={[styles.simpleIcon, { color: colors.textTitle }]}>!</Text>
          </View>
          <View style={styles.reportCardWithDataTextContainer}>
            <Text style={[styles.reportCardWithDataText, { color: colors.text }]}>
              Desativar a função WPS
            </Text>
            <Text style={[styles.reportCardWithDataSubtext, { color: colors.textSecondary }]}>
              Sua rede wi-fi está vulnerável a ataques de força bruta.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </View>

        {/* Botão "Mostrar mais" centralizado na parte inferior */}
        <View style={styles.showMoreContainer}>
          <TouchableOpacity>
            <Text style={[styles.showMoreText, { color: colors.textTitle }]}>
              Mostrar mais
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderWidth: 5,
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

  // Estado com dados dos relatórios (quando há roteadores)
  reportCardWithData: {
    minHeight: 180, // Reduzido pois não tem o primeiro item
    borderRadius: 15,
    justifyContent: 'flex-start',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportCardWithDataContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '100%',
    flex: 1,
  },
  reportCardWithDataTextContainer: {
    flex: 1,
    marginLeft: 15,
    marginRight: 10,
  },
  reportCardWithDataText: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 5,
  },
  reportCardWithDataSubtext: {
    fontSize: 14,
  },

  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    justifyContent: 'space-between',
  },

  simpleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  secondaryReportItem: {
    marginTop: 8,
  },

  smallReportIcon: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    borderWidth: 3,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Container do botão "Mostrar mais"
  showMoreContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 8,
  },
  showMoreText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: '500',
  },
});
