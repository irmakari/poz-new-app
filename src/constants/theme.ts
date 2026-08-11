import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0F172A',
    background: '#F7FAFC',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#1E3A8A',
    textSecondary: '#334155',
  },
  dark: {
    text: '#F8FAFC',
    background: '#0F172A',
    backgroundElement: '#1E293B',
    backgroundSelected: '#2563EB',
    textSecondary: '#94A3B8',
  },

  // Global Editorial Analog Archive Color System
  background: '#F7FAFC', // Ice Porcelain - Neredeyse tam beyaz, mikroskobik mavi alt tonlu zemin
  backgroundCard: '#FFFFFF', // Clean crisp white for cards
  paper: '#FFFFFF',
  surfaceCream: '#F1F5F9',
  ink: '#0F172A', // Deep lacivert-slate ink
  text: '#0F172A',
  textSecondary: '#334155', // Muted slate navy
  textMuted: '#64748B', // Cool caption text
  border: 'rgba(15, 23, 42, 0.1)',
  shadow: 'rgba(15, 23, 42, 0.08)',

  // 1. Lacivert & Mavi Tonları (Deep Navy & Royal Blue Palette)
  navy: '#0F172A',
  deepNavy: '#1E293B',
  blue: '#1E3A8A',
  royalBlue: '#2563EB',
  cobaltBlue: '#1D4ED8',
  filmBlue: '#2563EB',
  mutedBlue: '#3B82F6',

  // 2. Mürdüm & Mor Tonları (Plum, Violet & Deep Purple)
  plum: '#581C87', // Mürdüm
  deepPlum: '#3B0764',
  purple: '#6B21A8',
  indigo: '#4338CA',
  violet: '#7C3AED',
  lavender: '#8B5CF6',
  dustyPurple: '#6366F1',

  // 3. Haki & Zeytin Tonları (Khaki, Olive & Sage)
  khaki: '#3F4E34', // Haki
  olive: '#4D5D3B',
  sageGreen: '#5A6B4C',
  mossGreen: '#2D3B25',
  green: '#14532D',
  greenDark: '#166534',
  mutedGreen: '#22543D',

  // 4. Bordo & Pembe Tonları (Burgundy, Crimson & Rose Pink)
  burgundy: '#6B1D2F', // Bordo
  darkBurgundy: '#4C1220',
  darkRed: '#881337',
  pink: '#E11D48', // Pembe / Gül Pembesi
  pinkDark: '#9F1239',
  softPink: '#F43F5E',
  stampRed: '#9F1239',

  // 5. Gümüş & Krom Metalik Tonları (Silver & Metallic Platinum)
  silver: '#94A3B8', // Gümüş
  silverLight: '#E2E8F0',
  silverDark: '#64748B',
  platinum: '#CBD5E1',
  chromeMetal: '#475569',

  // Nötr & Diğer Tonlar
  brown: '#3A261F',
  deepBrown: '#241713',
  mustard: '#B45309',
  offWhite: '#F8FAFC',
  lightText: '#F8FAFC',
  dangerLab: '#DC2626',
  yellow: '#FEF3C7',
  yellowDark: '#D97706',

  // Washi Tapes
  tapeDefault: 'rgba(30, 58, 138, 0.15)',
  tapeLavender: 'rgba(88, 28, 135, 0.15)',
  tapePink: 'rgba(225, 29, 72, 0.15)',
  tapeBlue: 'rgba(37, 99, 235, 0.15)',
  tapeSilver: 'rgba(148, 163, 184, 0.2)',

  // Tab Bar Theme (Lacivert & Mavi Vurgu)
  tabBarBg: '#0F172A', // Derin Lacivert floating capsule
  tabBarBorder: 'rgba(255, 255, 255, 0.12)',
  tabBarActiveBg: '#1E3A8A', // Seçili lacivert sekme
  tabBarActiveIcon: '#FFFFFF',
  tabBarInactiveIcon: '#94A3B8',
  tabCameraBg: '#2563EB', // Orta kamera butonu Royal Mavi
  tabCameraIcon: '#FFFFFF',
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = {
  sans: 'Kanit_400Regular',
  sansMedium: 'Kanit_500Medium',
  sansSemiBold: 'Kanit_600SemiBold',
  sansBold: 'Kanit_700Bold',
  sansExtraBold: 'Kanit_700Bold',
  sansBlack: 'Kanit_700Bold',
  serif: 'Kanit_600SemiBold',
  rounded: 'Kanit_600SemiBold',
  mono: Platform.select({ ios: 'Courier New', default: 'monospace', web: 'monospace' }),
};

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 48,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 9999,
  full: 9999,
};
