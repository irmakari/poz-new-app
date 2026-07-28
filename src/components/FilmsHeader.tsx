import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { PaperStamp } from '@/components/PaperStamp';
import { TapeDecoration } from '@/components/TapeDecoration';
import { PozIcon } from '@/components/PozIcon';

export const FilmsHeader: React.FC = () => {
  const router = useRouter();

  const handleSearch = () => {
    Alert.alert(
      'POZ Arama',
      'Film arama özelliği yakında eklenecek.',
      [{ text: 'Tamam', style: 'default' }]
    );
  };

  const handleCreateNewFilm = () => {
    router.push('/film/new');
  };

  return (
    <View style={styles.container}>
      <TapeDecoration position="top-right" width={48} height={13} color={Colors.tapeDefault} />

      <View style={styles.topRow}>
        <Text style={styles.subTitleText}>film arşivi</Text>
        <PaperStamp label="COLLECTION" color={Colors.stampRed} rotation="-2deg" />
      </View>

      <View style={styles.titleRow}>
        <Text style={styles.mainTitleText}>filmlerim</Text>

        <View style={styles.actionsRow}>
          {/* Header + Button for creating new film */}
          <TouchableOpacity
            activeOpacity={0.8}
            accessibilityLabel="yeni film oluştur"
            onPress={handleCreateNewFilm}
            style={styles.actionIconButton}
          >
            <Text style={styles.plusIconText}>+</Text>
          </TouchableOpacity>

          {/* Search Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            accessibilityLabel="film ara"
            onPress={handleSearch}
            style={styles.actionIconButton}
          >
            <PozIcon name="search" size={20} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.descriptionText}>
        çektiğin her ay, ayrı bir film kutusunda saklanır.
      </Text>
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
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionIconButton: {
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
  plusIconText: {
    fontSize: 22,
    lineHeight: 24,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
    marginTop: -2,
  },
  descriptionText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontFamily: Fonts.sans,
    marginTop: 4,
    lineHeight: 18,
  },
});
