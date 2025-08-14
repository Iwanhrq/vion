import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../constants/ThemeContext';

interface DividerProps {
  style?: any;
}

export const Divider: React.FC<DividerProps> = ({ style }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.divider, { backgroundColor: colors.divider }, style]} />
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginVertical: 20,
    marginHorizontal: -20,
    opacity: 0.3,
  },
});
