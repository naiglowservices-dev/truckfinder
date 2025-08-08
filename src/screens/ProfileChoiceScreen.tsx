/**
 * Tela de Escolha de Perfil
 * Permite ao usuário escolher entre Cliente ou Transportadora
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useAppStore } from '../store/useAppStore';
import { RootStackParamList, UserType } from '../types';

type ProfileChoiceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileChoice'>;

interface ProfileChoiceScreenProps {
  navigation: ProfileChoiceScreenNavigationProp;
}

export const ProfileChoiceScreen: React.FC<ProfileChoiceScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { setUserType } = useAppStore();

  const handleSelectProfile = (type: UserType) => {
    setUserType(type);
    
    if (type === 'client') {
      navigation.navigate('ClientName');
    } else {
      navigation.navigate('TransporterApplication');
    }
  };

  const ProfileOption: React.FC<{
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  }> = ({ title, description, icon, onPress }) => (
    <TouchableOpacity
      style={[styles.optionContainer, { borderColor: theme.colors.border }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.iconContainer, { backgroundColor: theme.colors.gray100 }]}>
        <Ionicons name={icon} size={32} color={theme.colors.textSecondary} />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={[styles.optionTitle, { color: theme.colors.text }]}>
          {title}
        </Text>
        <Text style={[styles.optionDescription, { color: theme.colors.textSecondary }]}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Bem-vindo ao Truck Finder
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Você é cliente ou transportadora?
          </Text>
        </View>

        {/* Profile Options */}
        <View style={styles.optionsContainer}>
          <ProfileOption
            title="Cliente"
            description="Preciso enviar mercadorias"
            icon="person"
            onPress={() => handleSelectProfile('client')}
          />

          <ProfileOption
            title="Transportadora"
            description="Ofereço serviços de transporte"
            icon="car"
            onPress={() => handleSelectProfile('transporter')}
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
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  optionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 24,
    borderWidth: 2,
    borderRadius: 24,
    backgroundColor: 'transparent',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  textContainer: {
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
});