import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from '../constants/ThemeContext';

interface SectionTitleProps {
  title: string;
  style?: any;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, style }) => {
  const { colors } = useTheme();

  return (
    <Text style={[styles.sectionTitle, { color: colors.textTitle }, style]}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    paddingLeft: 5,
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
