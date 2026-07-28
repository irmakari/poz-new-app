import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, BorderRadius, Fonts } from '@/constants/theme';
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
        {/* Subtle grain/fiber line */}
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

          // Special rendering for center elevated Camera shutter button
          if (config.isCamera) {
            return (
              <TouchableOpacity
                key={route.key}
                activeOpacity={0.88}
                onPress={onPress}
                style={styles.cameraTabWrapper}
              >
                {/* Physical Shutter Button Outer Rim */}
                <View style={styles.cameraOuterRim}>
                  <View style={styles.cameraElevatedButton}>
                    <View style={styles.shutterInnerRing} />
                    <PozIcon
                      name="camera"
                      size={24}
                      color={Colors.tabCameraIcon}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
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
                    ? Colors.tabBarActiveIcon
                    : Colors.tabBarInactiveIcon
                }
              />
              {isFocused && (
                <Text style={styles.tabLabelText}>{config.label}</Text>
              )}
            </TouchableOpacity>
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
    zIndex: 100,
  },
  tabCapsuleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#181520',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '92%',
    maxWidth: 420,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 10,
    height: 64,
    position: 'relative',
    overflow: 'hidden',
  },
  grainTextureOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    gap: 6,
    height: 42,
  },
  tabItemActivePaperTag: {
    backgroundColor: '#FAF6EE', // Paper label
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
    transform: [{ rotate: '-0.5deg' }],
  },
  tabLabelText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: Fonts.sansBold,
    color: Colors.tabBarActiveIcon,
  },
  cameraTabWrapper: {
    top: -16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraOuterRim: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#181520',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  cameraElevatedButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: Colors.tabCameraBg, // Lavender fill
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: Colors.lavenderDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 8,
    position: 'relative',
  },
  shutterInnerRing: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(143, 102, 227, 0.4)',
    borderStyle: 'dashed',
  },
});
