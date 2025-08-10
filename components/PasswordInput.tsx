import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../constants/ThemeContext';

interface PasswordInputProps extends Omit<TextInputProps, 'secureTextEntry'> {
  error?: string;
  containerStyle?: any;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  error,
  containerStyle,
  style,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { colors } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.inputContainer, { borderColor: error ? '#F44336' : colors.border }]}>
        <TextInput
          style={[styles.input, { color: colors.text }, style]}
          secureTextEntry={!showPassword}
          placeholderTextColor={colors.placeholder || '#999999'}
          {...props}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color='#D0D0D0'
          />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderWidth: 1,
    borderRadius: 12,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    marginLeft: 0,
  },
  eyeIcon: {
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
