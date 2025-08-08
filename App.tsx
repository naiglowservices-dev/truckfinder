/**
 * Componente principal da aplicação
 * Configura providers e inicializa o app
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useAppStore } from './src/store/useAppStore';

// Previne que a splash screen seja escondida automaticamente
SplashScreen.preventAutoHideAsync();

export default function App() {
  const { isDarkMode } = useAppStore();

  useEffect(() => {
    // Esconde a splash screen após o app carregar
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };

    // Pequeno delay para garantir que tudo carregou
    setTimeout(hideSplashScreen, 1000);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        <AppNavigator />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}