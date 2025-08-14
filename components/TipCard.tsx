import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../constants/ThemeContext';
import { useThemeColors } from '../constants/useThemeColors';

interface TipCardProps {
  id: string;
  name: string;
  description: string;
  onPress?: () => void;
  style?: any;
}

export const TipCard: React.FC<TipCardProps> = ({
  name,
  description,
  onPress,
  style
}) => {
  const { colors } = useTheme();
  const globalColors = useThemeColors();

  return (
    <TouchableOpacity
      style={[styles.tipCard, { backgroundColor: colors.card }, style]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={[styles.tipImageContainer, { backgroundColor: globalColors.buttonPrimary }]} />
      <View style={styles.tipInfo}>
        <Text style={[styles.tipTitle, { color: colors.textTitle }]}>{name}</Text>
        <Text style={[styles.tipText, { color: colors.textSecondary }]}>{description}</Text>
        <TouchableOpacity style={[styles.buttonTip, { backgroundColor: colors.buttonSecondary }]}>
          <Text style={[styles.buttonTipText, { color: colors.buttonTertiaryText }]}>Conhecer</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});
