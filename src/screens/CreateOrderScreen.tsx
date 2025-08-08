/**
 * Tela de Criar Pedido
 * Formulário para criar um novo pedido de transporte
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../contexts/ThemeContext';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { RootStackParamList, Order } from '../types';

type CreateOrderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateOrder'>;

interface CreateOrderScreenProps {
  navigation: CreateOrderScreenNavigationProp;
}

interface OrderForm {
  pickupAddress: string;
  deliveryAddress: string;
  date: string;
  time: string;
  description: string;
}

export const CreateOrderScreen: React.FC<CreateOrderScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { setOrderData, user } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<OrderForm>({
    pickupAddress: '',
    deliveryAddress: '',
    date: '',
    time: '',
    description: '',
  });

  const updateForm = (field: keyof OrderForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!form.pickupAddress.trim()) {
      Alert.alert('Erro', 'Por favor, digite o endereço de coleta');
      return false;
    }
    if (!form.deliveryAddress.trim()) {
      Alert.alert('Erro', 'Por favor, digite o endereço de entrega');
      return false;
    }
    if (!form.date.trim()) {
      Alert.alert('Erro', 'Por favor, selecione a data');
      return false;
    }
    if (!form.time.trim()) {
      Alert.alert('Erro', 'Por favor, selecione o horário');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    // Criar objeto do pedido
    const newOrder: Order = {
      id: `order_${Date.now()}`,
      clientId: user?.id || 'temp_client',
      pickupAddress: form.pickupAddress,
      deliveryAddress: form.deliveryAddress,
      date: form.date,
      time: form.time,
      description: form.description,
      amount: 2500, // Valor fixo por enquanto
      status: 'pending',
      createdAt: new Date(),
    };

    // Simular criação do pedido
    setTimeout(() => {
      setLoading(false);
      setOrderData(newOrder);
      navigation.navigate('SearchTrucks', { orderData: newOrder });
    }, 2000);
  };

  const formatDate = (text: string) => {
    // Remove caracteres não numéricos
    const cleaned = text.replace(/\D/g, '');
    
    // Formata como DD/MM/YYYY
    if (cleaned.length >= 5) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    } else if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    
    return cleaned;
  };

  const formatTime = (text: string) => {
    // Remove caracteres não numéricos
    const cleaned = text.replace(/\D/g, '');
    
    // Formata como HH:MM
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
    }
    
    return cleaned;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              Criar Pedido
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              Preencha os detalhes da sua entrega
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Endereço de coleta"
              value={form.pickupAddress}
              onChangeText={(text) => updateForm('pickupAddress', text)}
              placeholder="Digite o endereço de coleta"
              leftIcon="location"
              multiline
            />

            <Input
              label="Endereço de entrega"
              value={form.deliveryAddress}
              onChangeText={(text) => updateForm('deliveryAddress', text)}
              placeholder="Digite o endereço de entrega"
              leftIcon="location"
              multiline
            />

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Input
                  label="Data"
                  value={form.date}
                  onChangeText={(text) => updateForm('date', formatDate(text))}
                  placeholder="DD/MM/AAAA"
                  leftIcon="calendar"
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
              
              <View style={styles.halfWidth}>
                <Input
                  label="Hora"
                  value={form.time}
                  onChangeText={(text) => updateForm('time', formatTime(text))}
                  placeholder="HH:MM"
                  leftIcon="time"
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>
            </View>

            <Input
              label="Descrição da carga"
              value={form.description}
              onChangeText={(text) => updateForm('description', text)}
              placeholder="Descreva o que será transportado"
              leftIcon="cube"
              multiline
            />
          </View>
        </View>
      </ScrollView>

      {/* Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Buscar Motoristas"
          onPress={handleSubmit}
          disabled={loading}
          loading={loading}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
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
    paddingBottom: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: 'transparent',
  },
  button: {
    width: '100%',
  },
});