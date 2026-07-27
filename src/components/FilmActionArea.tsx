import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { PozIcon } from '@/components/PozIcon';

export const FilmActionArea: React.FC = () => {
  const handleShareFilm = () => {
    Alert.alert(
      'Filmi Paylaş',
      'Paylaşım özelliği yakında eklenecek.',
      [{ text: 'Tamam', style: 'default' }]
    );
  };

  const handleExportAlbum = () => {
    Alert.alert(
      'Albüm Dışa Aktar',
      'Albüm dışa aktarma özelliği yakında eklenecek.',
      [{ text: 'Tamam', style: 'default' }]
    );
  };

  const handleDeleteFilm = () => {
    Alert.alert(
      'Filmi Sil',
      'Silme özelliği henüz aktif değil.',
      [{ text: 'Tamam', style: 'default' }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Primary Action Button: Share */}
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={handleShareFilm}
        style={styles.primaryButton}
      >
        <Text style={styles.primaryButtonText}>filmi paylaş</Text>
        <PozIcon name="arrow-right" size={18} color="#FFFDF9" />
      </TouchableOpacity>

      {/* Secondary Action Button: Export Album */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleExportAlbum}
        style={styles.secondaryButton}
      >
        <PozIcon name="films" size={18} color={Colors.text} />
        <Text style={styles.secondaryButtonText}>albüm olarak dışa aktar</Text>
      </TouchableOpacity>

      {/* Delete Action Link */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleDeleteFilm}
        style={styles.deleteLinkButton}
      >
        <Text style={styles.deleteLinkText}>filmi sil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.lg,
    gap: Spacing.sm,
    alignItems: 'center',
  },
  primaryButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181520',
    height: 54,
    borderRadius: BorderRadius.md,
    gap: 8,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF9',
  },
  secondaryButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDF9',
    height: 50,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: Fonts.sansSemiBold,
    color: Colors.text,
  },
  deleteLinkButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 4,
  },
  deleteLinkText: {
    fontSize: 13,
    fontFamily: Fonts.sansSemiBold,
    color: Colors.stampRed,
    textDecorationLine: 'underline',
  },
});
