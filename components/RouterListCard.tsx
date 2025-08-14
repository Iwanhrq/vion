import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../constants/ThemeContext';
import { useThemeColors } from '../constants/useThemeColors';

interface RouterListCardProps {
  id: string;
  name: string;
  ip: string;
  status: 'Seguro' | 'Atenção' | 'Crítico';
  onPress: () => void;
  onFixPress: () => void;
}

export const RouterListCard: React.FC<RouterListCardProps> = ({
  name,
  ip,
  status,
  onPress,
  onFixPress
}) => {
  const { colors } = useTheme();
  const globalColors = useThemeColors();

  const getStatusColor = () => {
    switch (status) {
      case 'Seguro':
        return '#4CAF50';
      case 'Atenção':
        return '#FF9800';
      case 'Crítico':
        return '#F44336';
      default:
        return colors.textSecondary;
    }
  };



  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.routerCard, { backgroundColor: colors.card }]}
    >
      {/* Lado esquerdo - Ícone e informações */}
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <Image 
            source={require('../assets/images/roteador.png')} 
            style={styles.routerIcon}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.routerName, { color: colors.text }]}>{name}</Text>
          <Text style={[styles.routerIp, { color: colors.textSecondary }]}>{ip}</Text>
        </View>
      </View>

      {/* Lado direito - Status e botão */}
      <View style={styles.rightSection}>
        <View style={styles.statusContainer}>
          <Text style={[styles.statusLabel, { color: colors.textSecondary }]}>Status</Text>
          <Text style={[styles.statusValue, { color: getStatusColor() }]}>{status}</Text>
        </View>
        
        <TouchableOpacity
          style={[styles.fixButton, { backgroundColor: globalColors.buttonSecondary }]}
          onPress={onFixPress}
        >
          <Text style={styles.fixButtonText}>Corrigir</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  routerCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  routerIcon: {
    width: 60,
    height: 60,
  },
  infoContainer: {
    flex: 1,
  },
  routerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  routerIp: {
    fontSize: 14,
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 2,
  },
  statusValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  fixButton: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 12,
  },
  fixButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
