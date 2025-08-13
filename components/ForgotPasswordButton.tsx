import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { useTheme } from '../constants/ThemeContext';

interface ForgotPasswordButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
  containerStyle?: any;
  borderRadius?: number;
}

export default function ForgotPasswordButton({ 
  title, 
  variant = 'primary', 
  containerStyle,
  borderRadius,
  style,
  ...props 
}: ForgotPasswordButtonProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.buttonContainer, containerStyle]}>
      <TouchableOpacity 
        style={[
          styles.button,
          {
            backgroundColor: variant === 'primary' ? colors.buttonPrimary : colors.buttonSecondary,
            borderRadius: borderRadius || 16,
          },
          style
        ]} 
        {...props}
      >
        <Text style={[
          styles.buttonText,
          { color: variant === 'primary' ? colors.buttonText : colors.buttonSecondaryText }
        ]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
