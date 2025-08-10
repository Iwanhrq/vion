import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useTheme } from '../constants/ThemeContext';

interface FormButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

export const FormButton: React.FC<FormButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  style,
  ...props
}) => {
  const { colors } = useTheme();

  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];
    
    if (variant === 'primary') {
      baseStyle.push({ backgroundColor: colors.buttonPrimary });
    } else {
      baseStyle.push({ backgroundColor: colors.buttonSecondary });
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${size}Text`]];
    
    if (variant === 'primary') {
      baseStyle.push({ color: colors.buttonText });
    } else {
      baseStyle.push({ color: colors.text });
    }
    
    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      {...props}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  small: {
    height: 35,
    paddingHorizontal: 20,
  },
  medium: {
    height: 45,
    paddingHorizontal: 30,
  },
  large: {
    height: 50,
    paddingHorizontal: 40,
  },
  text: {
    fontWeight: '500',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 16,
  },
});
