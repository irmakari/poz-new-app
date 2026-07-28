import { BorderRadius, Colors, Fonts } from '@/constants/theme';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PozIcon, PozIconName } from './PozIcon';

export interface BottomTabBarProps {
  state: {
    routes: Array<{ key: string; name: string }>;
    index: number;
  };
  descriptors: Record<string, any>;
  navigation: {
    emit: (options: { type: string; target: string; canPreventDefault: boolean }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
}

const TAB_CONFIG: Record<
  string,
  { label: string; icon: PozIconName; isCamera?: boolean }
> = {
  index: { label: 'Home', icon: 'home' },
  calendar: { label: 'Takvim', icon: 'calendar' },
  camera: { label: 'Kamera', icon: 'camera', isCamera: true },
  films: { label: 'Filmler', icon: 'films' },
  profile: { label: 'Profil', icon: 'profile' },
};

export const BottomTabBar: React.FC<any> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, Platform.OS === 'ios' ? 16 : 12);

  return (
    <View
      pointerEvents="box-none"
      style={[styles.floatingWrapper, { paddingBottom: bottomInset }]}
    >
      <View style={styles.tabCapsuleContainer}>
        {/* Subtle grain/texture overlay */}
        <View style={styles.grainTextureOverlay} pointerEvents="none" />

        {state.routes.map((route: { key: string; name: string }, index: number) => {
          const isFocused = state.index === index;
          const config = TAB_CONFIG[route.name] || {
            label: route.name,
            icon: 'home',
          };

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // Center Camera Button (Elevated Analog Shutter)
          if (config.isCamera) {
            return (
              <View key={route.key} style={styles.cameraSlot}>
                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={onPress}
                  style={styles.cameraTabWrapper}
                  accessibilityLabel="kamera moduna geç"
                >
                  <View style={styles.cameraOuterRim}>
                    <View style={styles.cameraElevatedButton}>
                      <View style={styles.shutterInnerRing} />
                      <PozIcon
                        name="camera"
                        size={22}
                        color="#F4ECE2"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }

          return (
            <View key={route.key} style={styles.tabSlot}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={[
                  styles.tabItem,
                  isFocused && styles.tabItemActivePaperTag,
                ]}
              >
                <PozIcon
                  name={config.icon}
                  size={20}
                  color={
                    isFocused
                      ? '#111827'
                      : Colors.textMuted
                  }
                />
                {isFocused && (
                  <Text style={styles.tabLabelText} numberOfLines={1}>
                    {config.label}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  tabCapsuleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827', // Deep solid navy capsule
    borderRadius: BorderRadius.full,
    paddingHorizontal: 8,
    width: '92%',
    maxWidth: 420,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',

    // Deep Analog Drop Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
    height: 64,
    position: 'relative',
  },
  grainTextureOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: BorderRadius.full,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  tabSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    gap: 5,
    height: 40,
  },
  tabItemActivePaperTag: {
    backgroundColor: '#F7F2EA', // Paper cream label
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 3,
  },
  tabLabelText: {
    fontSize: 11.5,
    fontFamily: Fonts.sansBold,
    color: '#111827',
  },
  cameraSlot: {
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  cameraTabWrapper: {
    position: 'absolute',
    top: -24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraOuterRim: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#111827', // Solid deep navy fill to prevent content bleeding
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 10,
  },
  cameraElevatedButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.burgundy, // Editorial burgundy shutter fill
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    position: 'relative',
  },
  shutterInnerRing: {
    position: 'absolute',
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(244, 236, 226, 0.4)',
  },
});
