/**
 * Navegador principal da aplicação
 * Configura as rotas e navegação entre telas
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../contexts/ThemeContext';
import { RootStackParamList } from '../types';

// Importar todas as telas
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { VerificationScreen } from '../screens/VerificationScreen';
import { ProfileChoiceScreen } from '../screens/ProfileChoiceScreen';
import { ClientNameScreen } from '../screens/ClientNameScreen';
import { CreateOrderScreen } from '../screens/CreateOrderScreen';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerBackTitleVisible: false,
          cardStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ 
            title: 'Login',
            headerShown: true,
          }}
        />
        
        <Stack.Screen 
          name="Verification" 
          component={VerificationScreen}
          options={{ 
            title: 'Verificação',
            headerShown: true,
          }}
        />
        
        <Stack.Screen 
          name="ProfileChoice" 
          component={ProfileChoiceScreen}
          options={{ 
            title: 'Escolha seu Perfil',
            headerShown: true,
            headerLeft: () => null, // Remove botão voltar
          }}
        />
        
        <Stack.Screen 
          name="ClientName" 
          component={ClientNameScreen}
          options={{ 
            title: 'Seu Nome',
            headerShown: true,
          }}
        />
        
        <Stack.Screen 
          name="CreateOrder" 
          component={CreateOrderScreen}
          options={{ 
            title: 'Novo Pedido',
            headerShown: true,
          }}
        />

        {/* Adicionar outras telas conforme necessário */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};