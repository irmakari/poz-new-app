import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#1C1A24',
    background: '#FAF6EE',
    backgroundElement: '#FFFDF9',
    backgroundSelected: '#E3D7FF',
    textSecondary: '#6A6577',
  },
  dark: {
    text: '#FAF6EE',
    background: '#16141D',
    backgroundElement: '#211E2B',
    backgroundSelected: '#322C40',
    textSecondary: '#9E98A8',
  },

  // Scrapbook Base Palette
  background: '#FAF6EE', // Warm off-white / cream
  backgroundCard: '#FFFDF9', // Pure paper white for cards
  text: '#1C1A24', // Deep ink near-black
  textSecondary: '#6A6577', // Muted ink gray
  textMuted: '#9E98A8', // Subtle caption gray
  border: 'rgba(28, 26, 36, 0.08)', // Soft paper border
  shadow: 'rgba(28, 26, 36, 0.08)', // Natural drop shadow

  // Accent Colors (Pastel & Vibrant Scrapbook Shades)
  lavender: '#E3D7FF', // Primary Hero Card
  lavenderDark: '#8F66E3',
  yellow: '#FFF1B0', // Günün Notu Card
  yellowDark: '#E6A800',
  blue: '#CBEBFC', // Günün Kareleri Card
  blueDark: '#2B83BA',
  pink: '#FFD7EC', // Günün Şarkısı Card
  pinkDark: '#D9488F',
  green: '#C6F6D5', // Bugünkü Hissin Card
  greenDark: '#2F855A',
  
  // Stamp & Ink accents
  stampRed: '#E54848',
  filmBlack: '#16141D',
  
  // Washi Tapes
  tapeDefault: 'rgba(255, 248, 210, 0.82)',
  tapeLavender: 'rgba(227, 215, 255, 0.78)',
  tapePink: 'rgba(255, 215, 236, 0.78)',
  tapeBlue: 'rgba(203, 235, 252, 0.78)',
  
  // Tab Bar Theme
  tabBarBg: '#181520', // Dark mürdüm / charcoal floating capsule
  tabBarBorder: 'rgba(255, 255, 255, 0.12)',
  tabBarActiveBg: '#FAF6EE', // Selected tab capsule
  tabBarActiveIcon: '#181520',
  tabBarInactiveIcon: '#928DA0',
  tabCameraBg: '#E3D7FF', // Center camera button fill
  tabCameraIcon: '#181520',
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = {
  sans: 'NunitoSans_400Regular',
  sansMedium: 'NunitoSans_500Medium',
  sansSemiBold: 'NunitoSans_600SemiBold',
  sansBold: 'NunitoSans_700Bold',
  sansExtraBold: 'NunitoSans_800ExtraBold',
  sansBlack: 'NunitoSans_900Black',
  serif: Platform.select({ ios: 'Georgia', default: 'serif', web: 'Georgia, serif' }),
  rounded: 'NunitoSans_700Bold',
  mono: Platform.select({ ios: 'Courier New', default: 'monospace', web: 'monospace' }),
};

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
  xs: 4,
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  xxl: 36,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 14,
  lg: 22,
  xl: 30,
  full: 9999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
