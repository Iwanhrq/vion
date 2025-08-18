import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../constants/ThemeContext';

interface ReportHistoryCardProps {
  protectionLevel: 'Alto' | 'Médio' | 'Baixo';
  problemsCount: number;
  date: string;
  statusColor: string;
  onPress: () => void;
  noMargin?: boolean;
  isExpanded?: boolean;
}

export const ReportHistoryCard: React.FC<ReportHistoryCardProps> = ({
  protectionLevel,
  problemsCount,
  date,
  statusColor,
  onPress,
  noMargin = false,
  isExpanded = false,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { backgroundColor: colors.card },
        noMargin && { marginBottom: 0 },
        isExpanded && {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {/* Círculo colorido à esquerda */}
        <View style={[styles.statusCircle, { borderColor: statusColor }]} />
        
        {/* Textos do meio */}
        <View style={styles.textContainer}>
          <Text style={[styles.protectionText, { color: colors.text }]}>
            Nível de proteção: {protectionLevel}
          </Text>
          <Text style={[styles.problemsText, { color: colors.textSecondary }]}>
            {problemsCount} problemas encontrados
          </Text>
        </View>
        
        {/* Data e horário à direita */}
        <View style={styles.dateContainer}>
          <Text style={[styles.dateText, { color: colors.textSecondary }]}>
            {date.split(' ')[0]}
          </Text>
          <Text style={[styles.timeText, { color: colors.textSecondary }]}>
            {date.split(' ')[1]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderStyle: 'solid',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  protectionText: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  problemsText: {
    fontSize: 13,
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 13,
    textAlign: 'right',
  },
  timeText: {
    fontSize: 13,
    textAlign: 'right',
    marginTop: 2,
  },
});
