import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { PaperStamp } from '@/components/PaperStamp';
import { TapeDecoration } from '@/components/TapeDecoration';
import { PozIcon } from '@/components/PozIcon';

interface ProfileHeaderProps {
  onPressSettings?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onPressSettings }) => {
  const handleSettingsIcon = () => {
    if (onPressSettings) {
      onPressSettings();
    } else {
      Alert.alert(
        'Ayarlar',
        'Aşağıdaki tercihler ve ayarlar bölümünden hesabını özelleştirebilirsin.',
        [{ text: 'Tamam', style: 'default' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <TapeDecoration position="top-right" width={48} height={13} color={Colors.tapeDefault} />

      <View style={styles.topRow}>
        <Text style={styles.subTitleText}>senin arşivin</Text>
        <PaperStamp label="MEMBER 0726" color={Colors.stampRed} rotation="-2deg" />
      </View>

      <View style={styles.titleRow}>
        <Text style={styles.mainTitleText}>profilim</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          accessibilityLabel="ayarlar"
          onPress={handleSettingsIcon}
          style={styles.settingsIconButton}
        >
          <PozIcon name="profile" size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
    position: 'relative',
    paddingTop: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  subTitleText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: Fonts.mono,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainTitleText: {
    fontSize: 28,
    color: Colors.text,
    fontFamily: Fonts.sansBlack,
    letterSpacing: -0.8,
  },
  settingsIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFDF9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
});
