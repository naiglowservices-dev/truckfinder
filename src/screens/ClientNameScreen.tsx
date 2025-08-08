/**
 * Tela de Nome do Cliente
 * Coleta o nome completo do cliente
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

type ClientNameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ClientName'>;

interface ClientNameScreenProps {
  navigation: ClientNameScreenNavigationProp;
}

export const ClientNameScreen: React.FC<ClientNameScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { clientName, setClientName } = useAppStore();
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!clientName.trim()) {
      Alert.alert('Erro', 'Por favor, digite seu nome completo');
      return;
    }

    if (clientName.trim().length < 2) {
      Alert.alert('Erro', 'Nome deve ter pelo menos 2 caracteres');
      return;
    }

    setLoading(true);
    
    // Simular salvamento do nome
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('CreateOrder');
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Qual é o seu nome?
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Vamos personalizar sua experiência
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Nome completo"
            value={clientName}
            onChangeText={setClientName}
            placeholder="Digite seu nome"
            leftIcon="person"
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>

        {/* Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Continuar"
            onPress={handleContinue}
            disabled={!clientName.trim() || loading}
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
  },
  buttonContainer: {
    paddingBottom: 24,
  },
  button: {
    width: '100%',
  },
});