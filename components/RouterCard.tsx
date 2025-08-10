import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../constants/ThemeContext';

interface RouterCardProps {
  id: string;
  name: string;
  description: string;
  onPress: () => void;
  style?: any;
}

export const RouterCard: React.FC<RouterCardProps> = ({
  name,
  description,
  onPress,
  style
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.routerCard, { backgroundColor: colors.card }, style]}
    >
      <View style={styles.routerImageContainer}>
        <Image source={require('../assets/images/roteador.png')} />
      </View>
      <Text style={[styles.routerName, { color: colors.text }]}>{name}</Text>
      <Text style={[styles.routerDescription, { color: colors.textSecondary }]} numberOfLines={2}>
        {description}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});
