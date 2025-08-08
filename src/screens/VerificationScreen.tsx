/**
 * Tela de Verificação
 * Entrada do código de verificação de 6 dígitos
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/common/Button';
import { RootStackParamList } from '../types';

type VerificationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Verification'>;
type VerificationScreenRouteProp = RouteProp<RootStackParamList, 'Verification'>;

interface VerificationScreenProps {
  navigation: VerificationScreenNavigationProp;
  route: VerificationScreenRouteProp;
}

export const VerificationScreen: React.FC<VerificationScreenProps> = ({ 
  navigation, 
  route 
}) => {
  const { theme } = useTheme();
  const { setVerificationCode } = useAppStore();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const { phoneNumber } = route.params;

  useEffect(() => {
    // Foca no primeiro input quando a tela carrega
    inputRefs.current[0]?.focus();
  }, []);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus no próximo input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirm = async () => {
    const fullCode = code.join('');
    
    if (fullCode.length !== 6) {
      Alert.alert('Erro', 'Por favor, digite o código completo');
      return;
    }

    setLoading(true);
    setVerificationCode(fullCode);

    // Simular verificação do código
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('ProfileChoice');
    }, 2000);
  };

  const handleResendCode = () => {
    Alert.alert(
      'Código reenviado',
      `Um novo código foi enviado para ${phoneNumber}`,
      [{ text: 'OK' }]
    );
  };

  const isCodeComplete = code.every(digit => digit !== '');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Digite o código recebido
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Enviamos um código de 6 dígitos para seu telefone
          </Text>
        </View>

        {/* Code Input */}
        <View style={styles.form}>
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[
                  styles.codeInput,
                  {
                    borderColor: digit 
                      ? theme.colors.secondary 
                      : theme.colors.border,
                    backgroundColor: theme.colors.gray50,
                    color: theme.colors.text,
                  }
                ]}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>

          {/* Resend Link */}
          <TouchableOpacity onPress={handleResendCode} style={styles.resendContainer}>
            <Text style={[styles.resendText, { color: theme.colors.secondary }]}>
              Reenviar código
            </Text>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Confirmar"
            onPress={handleConfirm}
            disabled={!isCodeComplete || loading}
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 32,
  },
  codeInput: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderRadius: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  resendContainer: {
    marginTop: 16,
  },
  resendText: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    paddingBottom: 24,
  },
  button: {
    width: '100%',
  },
});