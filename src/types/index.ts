/**
 * Tipos principais da aplicação
 */

export type UserType = 'client' | 'transporter' | null;

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  type: UserType;
  createdAt: Date;
}

export interface Order {
  id: string;
  clientId: string;
  pickupAddress: string;
  deliveryAddress: string;
  date: string;
  time: string;
  description: string;
  amount: number;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  driverId?: string;
  createdAt: Date;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  truckType: string;
  license: string;
  rating: number;
  isAvailable: boolean;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface AppState {
  currentScreen: string;
  userType: UserType;
  phoneNumber: string;
  verificationCode: string;
  clientName: string;
  orderData: Order | null;
  driverData: Driver | null;
  user: User | null;
}

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Verification: { phoneNumber: string };
  ProfileChoice: undefined;
  ClientName: undefined;
  CreateOrder: undefined;
  SearchTrucks: { orderData: Order };
  Payment: { orderData: Order };
  OrderStatus: { orderData: Order; driverData: Driver };
  TransporterApplication: undefined;
  WaitingContact: undefined;
  PartnershipAgreement: undefined;
  ManagementSystem: undefined;
  OrderReceiving: undefined;
  CommissionPayment: undefined;
};