/**
 * Tela de Login
 * Entrada do número de telefone para autenticação
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../contexts/ThemeContext';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { RootStackParamList } from '../types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { phoneNumber, setPhoneNumber } = useAppStore();
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Erro', 'Por favor, digite seu número de telefone');
      return;
    }

    if (phoneNumber.length < 9) {
      Alert.alert('Erro', 'Número de telefone inválido');
      return;
    }

    setLoading(true);
    
    // Simular envio de código
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Verification', { phoneNumber });
    }, 2000);
  };

  const formatPhoneNumber = (text: string) => {
    // Remove todos os caracteres não numéricos
    const cleaned = text.replace(/\D/g, '');
    
    // Limita a 9 dígitos
    const limited = cleaned.slice(0, 9);
    
    // Formata como XX XXX XXXX
    if (limited.length >= 6) {
      return `${limited.slice(0, 2)} ${limited.slice(2, 5)} ${limited.slice(5)}`;
    } else if (limited.length >= 3) {
      return `${limited.slice(0, 2)} ${limited.slice(2)}`;
    }
    
    return limited;
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Truck Finder
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Entre com seu número de telefone
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Número de telefone"
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            placeholder="84 123 4567"
            keyboardType="numeric"
            leftIcon="call"
            maxLength={11} // XX XXX XXXX
          />

          {/* Info Message */}
          <View style={[styles.infoContainer, { backgroundColor: theme.colors.gray50 }]}>
            <Text style={[styles.infoText, { color: theme.colors.text }]}>
              Você receberá um código de 6 dígitos por SMS, e-mail ou WhatsApp.
            </Text>
          </View>
        </View>

        {/* Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Enviar código"
            onPress={handleSendCode}
            disabled={!phoneNumber.trim() || loading}
            loading={loading}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 48,
    paddingBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  infoContainer: {
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    paddingBottom: 24,
  },
  button: {
    width: '100%',
  },
});