/**
 * Store principal da aplicação usando Zustand
 * Gerencia o estado global incluindo usuário, pedidos e configurações
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Order, Driver, UserType } from '../types';

interface AppStore {
  // Estado do usuário
  user: User | null;
  userType: UserType;
  phoneNumber: string;
  verificationCode: string;
  clientName: string;
  
  // Estado dos pedidos
  orderData: Order | null;
  driverData: Driver | null;
  orders: Order[];
  
  // Configurações
  isDarkMode: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setUserType: (type: UserType) => void;
  setPhoneNumber: (phone: string) => void;
  setVerificationCode: (code: string) => void;
  setClientName: (name: string) => void;
  setOrderData: (order: Order | null) => void;
  setDriverData: (driver: Driver | null) => void;
  addOrder: (order: Order) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  toggleTheme: () => void;
  reset: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      userType: null,
      phoneNumber: '',
      verificationCode: '',
      clientName: '',
      orderData: null,
      driverData: null,
      orders: [],
      isDarkMode: false,

      // Actions
      setUser: (user) => set({ user }),
      setUserType: (userType) => set({ userType }),
      setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
      setVerificationCode: (verificationCode) => set({ verificationCode }),
      setClientName: (clientName) => set({ clientName }),
      setOrderData: (orderData) => set({ orderData }),
      setDriverData: (driverData) => set({ driverData }),
      
      addOrder: (order) => set((state) => ({ 
        orders: [...state.orders, order] 
      })),
      
      updateOrder: (orderId, updates) => set((state) => ({
        orders: state.orders.map(order => 
          order.id === orderId ? { ...order, ...updates } : order
        )
      })),
      
      toggleTheme: () => set((state) => ({ 
        isDarkMode: !state.isDarkMode 
      })),
      
      reset: () => set({
        user: null,
        userType: null,
        phoneNumber: '',
        verificationCode: '',
        clientName: '',
        orderData: null,
        driverData: null,
      }),
    }),
    {
      name: 'truck-finder-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        userType: state.userType,
        orders: state.orders,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);