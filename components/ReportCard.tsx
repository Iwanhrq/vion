import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../constants/ThemeContext';
import { useThemeColors } from '../constants/useThemeColors';

interface ReportCardProps {
  id: string;
  networkName: string;
  status: 'Segura' | 'Atenção' | 'Crítico';
  date: string;
  time: string;
  onPress: () => void;
  style?: any;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  networkName,
  status,
  date,
  time,
  onPress,
  style
}) => {
  const { colors } = useTheme();
  const globalColors = useThemeColors();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Segura':
        return globalColors.statusSafe;
      case 'Atenção':
        return globalColors.statusWarning;
      default:
        return globalColors.statusCritical;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.reportCard, { backgroundColor: colors.card }, style]}
    >
      <View style={styles.reportLeft}>
        <Text style={[styles.reportName, { color: colors.textTitle }]}>{networkName}</Text>
        <Text style={[styles.reportStatus, { color: colors.textSecondary }]}>
          Status: <Text style={{ color: getStatusColor(status) }}>{status}</Text>
        </Text>
      </View>
      <View style={styles.reportRight}>
        <Text style={[styles.reportDate, { color: colors.textSecondary }]}>{date}</Text>
        <Text style={[styles.reportTime, { color: colors.textSecondary }]}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});
