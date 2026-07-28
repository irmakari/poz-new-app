import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#18131D',
    background: '#F3EEE6',
    backgroundElement: '#F7F2EA',
    backgroundSelected: '#746080',
    textSecondary: '#5E7487',
  },
  dark: {
    text: '#F4ECE2',
    background: '#111827',
    backgroundElement: '#2A1730',
    backgroundSelected: '#4C315F',
    textSecondary: '#9B90A3',
  },

  // Global Editorial Analog Archive Color System
  background: '#F3EEE6', // Warm bone / cream zemin
  backgroundCard: '#F7F2EA', // Pure paper cream for cards/memo
  paper: '#F7F2EA', // Pure paper cream for cards/memo
  surfaceCream: '#E9E0D3',
  ink: '#18131D', // Deep ink near-black
  text: '#18131D',
  textSecondary: '#5E7487', // Muted blue-grey
  textMuted: '#9B90A3', // Dusty caption text
  border: 'rgba(24, 19, 29, 0.1)',
  shadow: 'rgba(24, 19, 29, 0.12)',

  // Rich Editorial Tones
  brown: '#3A261F',
  deepBrown: '#241713',
  burgundy: '#5A1F2D',
  darkRed: '#8D2E37',
  navy: '#182235',
  deepNavy: '#111827',
  plum: '#2A1730',
  purple: '#4C315F',
  dustyPurple: '#746080',
  filmBlue: '#8FA8B8',
  mutedBlue: '#5E7487',
  olive: '#6B7052',
  mutedGreen: '#8A9272',
  mustard: '#A98543',
  offWhite: '#EEE7DD',
  lightText: '#F4ECE2',
  dangerLab: '#C94A4A',

  // Mapped Muted Editorial Shades (Backwards-compatible tokens)
  lavender: '#2A1730', // Deep plum for cards
  lavenderDark: '#746080',
  yellow: '#F7F2EA', // Cream paper for memo
  yellowDark: '#A98543',
  blue: '#111827', // Deep navy for hero
  blueDark: '#8FA8B8',
  pink: '#5A1F2D', // Burgundy for song card
  pinkDark: '#8D2E37',
  green: '#6B7052', // Olive green for mood
  greenDark: '#8A9272',
  
  // Stamp & Ink Accents
  stampRed: '#C94A4A',
  filmBlack: '#111827',
  
  // Washi Tapes
  tapeDefault: 'rgba(233, 224, 211, 0.85)',
  tapeLavender: 'rgba(116, 96, 128, 0.75)',
  tapePink: 'rgba(90, 31, 45, 0.75)',
  tapeBlue: 'rgba(143, 168, 184, 0.75)',
  
  // Tab Bar Theme
  tabBarBg: '#111827', // Deep navy floating capsule
  tabBarBorder: 'rgba(255, 255, 255, 0.15)',
  tabBarActiveBg: '#F7F2EA', // Selected paper tab
  tabBarActiveIcon: '#111827',
  tabBarInactiveIcon: '#9B90A3',
  tabCameraBg: '#8FA8B8', // Center camera button fill
  tabCameraIcon: '#111827',
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
  lg: 18, // Refined medium-large radius
  xl: 24,
  full: 9999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
