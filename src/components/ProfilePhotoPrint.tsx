import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, BorderRadius } from '@/constants/theme';
import { TapeDecoration } from '@/components/TapeDecoration';
import { PozIcon } from '@/components/PozIcon';

interface ProfilePhotoPrintProps {
  name?: string;
}

export const ProfilePhotoPrint: React.FC<ProfilePhotoPrintProps> = ({ name = 'ırmak' }) => {
  return (
    <View style={styles.polaroidFrame}>
      <TapeDecoration position="top-right" width={28} height={10} color={Colors.tapePink} />

      {/* Abstract Color Avatar Visual */}
      <View style={styles.avatarVisual}>
        <View style={styles.avatarGlowCircle} />
        <PozIcon name="profile" size={32} color="#FFFDF6" />
      </View>

      <Text style={styles.captionText}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  polaroidFrame: {
    width: 90,
    height: 110,
    backgroundColor: '#FFFDF9',
    borderRadius: BorderRadius.sm,
    padding: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    transform: [{ rotate: '-3deg' }],
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
    alignItems: 'center',
  },
  avatarVisual: {
    width: '100%',
    height: 74,
    borderRadius: 4,
    backgroundColor: Colors.lavenderDark,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  avatarGlowCircle: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.yellow,
    opacity: 0.35,
    top: -10,
    right: -10,
  },
  captionText: {
    fontSize: 12,
    fontFamily: Fonts.serif,
    fontStyle: 'italic',
    color: Colors.text,
    marginTop: 4,
  },
});
