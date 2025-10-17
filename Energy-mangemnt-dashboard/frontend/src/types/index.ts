export interface User {
  id: string;
  username: string;
  token: string;
}

export interface EnergyData {
  timestamp: string;
  voltage: number;
  current: number;
  powerSource: 'Grid' | 'Solar' | 'Battery';
  batteryLevel?: number;
  powerConsumption: number;
  powerGeneration: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}