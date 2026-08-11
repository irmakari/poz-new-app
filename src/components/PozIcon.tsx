import React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import { SymbolView } from 'expo-symbols';

export type PozIconName =
  | 'home'
  | 'calendar'
  | 'camera'
  | 'films'
  | 'profile'
  | 'search'
  | 'bell'
  | 'music'
  | 'photo'
  | 'star'
  | 'sparkle'
  | 'sun'
  | 'arrow-right'
  | 'lock'
  | 'mail'
  | 'apple'
  | 'google'
  | 'eye'
  | 'eye-off'
  | 'rotate';

interface PozIconProps {
  name: PozIconName;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

const SYMBOL_MAP: Record<PozIconName, string> = {
  home: 'house.fill',
  calendar: 'calendar',
  camera: 'camera.fill',
  films: 'film.fill',
  profile: 'person.fill',
  search: 'magnifyingglass',
  bell: 'bell.fill',
  music: 'music.note',
  photo: 'photo.on.rectangle.angled',
  star: 'star.fill',
  sparkle: 'sparkles',
  sun: 'sun.max.fill',
  'arrow-right': 'arrow.right',
  lock: 'lock.fill',
  mail: 'envelope.fill',
  apple: 'apple.logo',
  google: 'g.circle.fill',
  eye: 'eye.fill',
  'eye-off': 'eye.slash.fill',
  rotate: 'camera.rotate.fill',
};

const FALLBACK_MAP: Record<PozIconName, string> = {
  home: '⌂',
  calendar: '📅',
  camera: '📷',
  films: '🎞',
  profile: '👤',
  search: '🔍',
  bell: '🔔',
  music: '🎵',
  photo: '🖼',
  star: '★',
  sparkle: '✨',
  sun: '☀️',
  'arrow-right': '➔',
  lock: '🔒',
  mail: '✉',
  apple: '',
  google: 'G',
  eye: '👁',
  'eye-off': '🙈',
  rotate: '🔄',
};

export const PozIcon: React.FC<PozIconProps> = ({
  name,
  size = 22,
  color = '#1C1A24',
  style,
}) => {
  const sfName = SYMBOL_MAP[name] || 'circle';

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <SymbolView
        name={sfName as any}
        size={size}
        tintColor={color}
        resizeMode="scaleAspectFit"
        fallback={
          <Text style={{ fontSize: size * 0.85, color, textAlign: 'center', lineHeight: size }}>
            {FALLBACK_MAP[name]}
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
