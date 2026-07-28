import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { PozIcon } from '@/components/PozIcon';

interface PhotoActionAreaProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export const PhotoActionArea: React.FC<PhotoActionAreaProps> = ({ onEdit, onDelete }) => {
  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    } else {
      Alert.alert('Kareyi Düzenle', 'Düzenlemek istediğiniz alanı aşağıdan değiştirebilirsiniz.');
    }
  };

  const handleShare = () => {
    Alert.alert(
      'Kareyi Paylaş',
      'Paylaşım kartı başarıyla kopyalandı! 📸',
      [{ text: 'Tamam', style: 'default' }]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Kareyi Sil',
      'Bu kareyi kalıcı olarak silmek istediğine emin misin?',
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Kareyi Sil',
          style: 'destructive',
          onPress: () => {
            if (onDelete) onDelete();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsRow}>
        {/* Primary Edit Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          accessibilityLabel="kareyi düzenle"
          onPress={handleEdit}
          style={styles.primaryButton}
        >
          <PozIcon name="sparkle" size={14} color="#FFFDF9" />
          <Text style={styles.primaryText}>kareyi düzenle</Text>
        </TouchableOpacity>

        {/* Secondary Share Button */}
        <TouchableOpacity
          activeOpacity={0.82}
          accessibilityLabel="paylaş"
          onPress={handleShare}
          style={styles.secondaryButton}
        >
          <PozIcon name="photo" size={14} color={Colors.text} />
          <Text style={styles.secondaryText}>paylaş</Text>
        </TouchableOpacity>
      </View>

      {/* Delete Action Link */}
      <TouchableOpacity
        activeOpacity={0.7}
        accessibilityLabel="kareyi sil"
        onPress={handleDelete}
        style={styles.deleteLink}
      >
        <Text style={styles.deleteText}>kareyi sil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.md,
    gap: 10,
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181520',
    height: 48,
    borderRadius: BorderRadius.md,
    gap: 6,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryText: {
    fontSize: 13,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF9',
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDF9',
    height: 48,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  secondaryText: {
    fontSize: 13,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
  },
  deleteLink: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  deleteText: {
    fontSize: 12,
    fontFamily: Fonts.sansSemiBold,
    color: Colors.stampRed,
    textDecorationLine: 'underline',
  },
});
