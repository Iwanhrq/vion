import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { useTheme } from '../constants/ThemeContext';

interface InputFieldProps extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  containerStyle?: any;
}

export const InputField: React.FC<InputFieldProps> = ({
  icon,
  error,
  containerStyle,
  style,
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.inputContainer, { borderColor: error ? '#F44336' : colors.border }]}>
        <TextInput
          style={[styles.input, { color: colors.text }, style]}
          placeholderTextColor={colors.placeholder || '#999999'}
          {...props}
        />
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color='#D0D0D0'
            style={styles.icon}
          />
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  inputContainer: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  icon: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: '#F44336',
    marginTop: 4,
    fontSize: 12,
    marginLeft: 4,
  },
});
