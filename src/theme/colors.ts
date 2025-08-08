/**
 * Sistema de cores da aplicação
 * Suporte para tema claro e escuro
 */

export const lightColors = {
  primary: '#000000',
  secondary: '#f97316',
  background: '#ffffff',
  surface: '#f8f9fa',
  text: '#000000',
  textSecondary: '#6b7280',
  border: '#e5e7eb',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Cores específicas do app
  orange: '#f97316',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
};

export const darkColors = {
  primary: '#ffffff',
  secondary: '#f97316',
  background: '#111827',
  surface: '#1f2937',
  text: '#ffffff',
  textSecondary: '#9ca3af',
  border: '#374151',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Cores específicas do app
  orange: '#f97316',
  gray50: '#111827',
  gray100: '#1f2937',
  gray200: '#374151',
  gray300: '#4b5563',
  gray400: '#6b7280',
  gray500: '#9ca3af',
  gray600: '#d1d5db',
  gray700: '#e5e7eb',
  gray800: '#f3f4f6',
  gray900: '#f9fafb',
};

export type Colors = typeof lightColors;