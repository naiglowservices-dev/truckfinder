/**
 * Componente Input customizado
 * Campo de entrada reutilizável com diferentes tipos e validações
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  labelStyle,
  ...textInputProps
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const getContainerStyle = (): ViewStyle => ({
    marginBottom: theme.spacing.md,
  });

  const getLabelStyle = (): TextStyle => ({
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  });

  const getInputContainerStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: error 
      ? theme.colors.error 
      : isFocused 
        ? theme.colors.secondary 
        : theme.colors.border,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.gray50,
    paddingHorizontal: theme.spacing.md,
    minHeight: 48,
  });

  const getInputStyle = (): TextStyle => ({
    flex: 1,
    fontSize: 14,
    color: theme.colors.text,
    paddingVertical: theme.spacing.md,
  });

  const getErrorStyle = (): TextStyle => ({
    fontSize: 12,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  });

  return (
    <View style={[getContainerStyle(), containerStyle]}>
      {label && (
        <Text style={[getLabelStyle(), labelStyle]}>
          {label}
        </Text>
      )}
      
      <View style={getInputContainerStyle()}>
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={theme.colors.textSecondary}
            style={{ marginRight: theme.spacing.sm }}
          />
        )}
        
        <TextInput
          style={[getInputStyle(), inputStyle]}
          placeholderTextColor={theme.colors.textSecondary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...textInputProps}
        />
        
        {rightIcon && (
          <Ionicons
            name={rightIcon}
            size={20}
            color={theme.colors.textSecondary}
            style={{ marginLeft: theme.spacing.sm }}
            onPress={onRightIconPress}
          />
        )}
      </View>
      
      {error && (
        <Text style={getErrorStyle()}>
          {error}
        </Text>
      )}
    </View>
  );
};