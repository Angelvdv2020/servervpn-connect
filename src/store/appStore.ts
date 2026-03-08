import { create } from 'zustand';

export type VpnStatus = 'disconnected' | 'connecting' | 'connected' | 'disconnecting';
export type AppMode = 'autopilot' | 'manual';
export type Scenario = 'browsing' | 'youtube' | 'chatgpt' | 'torrents';

export interface VpnServer {
  id: string;
  name: string;
  country: string;
  city: string;
  flag: string;
  ping?: number;
  isFast?: boolean;
}

export interface AppState {
  // Onboarding
  onboardingComplete: boolean;
  setOnboardingComplete: () => void;

  // VPN
  vpnStatus: VpnStatus;
  setVpnStatus: (s: VpnStatus) => void;
  connectionTime: number;
  setConnectionTime: (t: number) => void;

  // Subscription
  hasSubscription: boolean;
  daysLeft: number;
  setSubscription: (has: boolean, days: number) => void;

  // Key
  vpnKey: string | null;
  setVpnKey: (k: string | null) => void;

  // Server
  selectedServer: VpnServer | null;
  setSelectedServer: (s: VpnServer) => void;

  // Mode
  mode: AppMode;
  setMode: (m: AppMode) => void;
  scenario: Scenario;
  setScenario: (s: Scenario) => void;

  // Settings
  baseUrl: string;
  setBaseUrl: (u: string) => void;
  sessionToken: string;
  setSessionToken: (t: string) => void;

  // Log
  logMessage: string;
  setLogMessage: (m: string) => void;

  // Screen
  currentScreen: 'onboarding' | 'home' | 'servers' | 'settings';
  setCurrentScreen: (s: 'onboarding' | 'home' | 'servers' | 'settings') => void;
}

export const mockServers: VpnServer[] = [
  { id: '1', name: 'Frankfurt DE-1', country: 'Германия', city: 'Франкфурт', flag: '🇩🇪', ping: 24, isFast: true },
  { id: '2', name: 'Amsterdam NL-1', country: 'Нидерланды', city: 'Амстердам', flag: '🇳🇱', ping: 31, isFast: true },
  { id: '3', name: 'Helsinki FI-1', country: 'Финляндия', city: 'Хельсинки', flag: '🇫🇮', ping: 38, isFast: true },
  { id: '4', name: 'London UK-1', country: 'Великобритания', city: 'Лондон', flag: '🇬🇧', ping: 45 },
  { id: '5', name: 'Paris FR-1', country: 'Франция', city: 'Париж', flag: '🇫🇷', ping: 52 },
  { id: '6', name: 'New York US-1', country: 'США', city: 'Нью-Йорк', flag: '🇺🇸', ping: 89 },
  { id: '7', name: 'Tokyo JP-1', country: 'Япония', city: 'Токио', flag: '🇯🇵', ping: 142 },
  { id: '8', name: 'Singapore SG-1', country: 'Сингапур', city: 'Сингапур', flag: '🇸🇬', ping: 168 },
  { id: '9', name: 'Toronto CA-1', country: 'Канада', city: 'Торонто', flag: '🇨🇦', ping: 95 },
  { id: '10', name: 'Warsaw PL-1', country: 'Польша', city: 'Варшава', flag: '🇵🇱', ping: 35, isFast: true },
];

export const useAppStore = create<AppState>((set) => ({
  onboardingComplete: false,
  setOnboardingComplete: () => set({ onboardingComplete: true }),

  vpnStatus: 'disconnected',
  setVpnStatus: (vpnStatus) => set({ vpnStatus }),
  connectionTime: 0,
  setConnectionTime: (connectionTime) => set({ connectionTime }),

  hasSubscription: true,
  daysLeft: 23,
  setSubscription: (hasSubscription, daysLeft) => set({ hasSubscription, daysLeft }),

  vpnKey: null,
  setVpnKey: (vpnKey) => set({ vpnKey }),

  selectedServer: mockServers[0],
  setSelectedServer: (selectedServer) => set({ selectedServer }),

  mode: 'autopilot',
  setMode: (mode) => set({ mode }),
  scenario: 'browsing',
  setScenario: (scenario) => set({ scenario }),

  baseUrl: 'https://servervpn.store',
  setBaseUrl: (baseUrl) => set({ baseUrl }),
  sessionToken: '',
  setSessionToken: (sessionToken) => set({ sessionToken }),

  logMessage: 'Готов к подключению',
  setLogMessage: (logMessage) => set({ logMessage }),

  currentScreen: 'onboarding',
  setCurrentScreen: (currentScreen) => set({ currentScreen }),
}));
