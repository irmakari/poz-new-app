import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { PaperStamp } from '@/components/PaperStamp';
import { PozIcon } from '@/components/PozIcon';

export const ActiveFilmNotice: React.FC = () => {
  return (
    <View style={styles.noticeCard}>
      <View style={styles.headerRow}>
        <View style={styles.iconGroup}>
          <PozIcon name="bell" size={16} color={Colors.yellowDark} />
          <Text style={styles.noticeTitle}>şu anda summer glow aktif.</Text>
        </View>

        <PaperStamp label="NOTICE" color={Colors.yellowDark} rotation="-3deg" />
      </View>

      <Text style={styles.noticeSubText}>
        yeni filmi başlatırsan mevcut film arşivde aktif kalmaya devam edecek. istediğin zaman aralarında geçiş yapabilirsin!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noticeCard: {
    backgroundColor: Colors.yellow,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.1)',
    transform: [{ rotate: '-0.8deg' }],
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  noticeTitle: {
    fontSize: 13,
    fontFamily: Fonts.sansExtraBold,
    color: Colors.text,
  },
  noticeSubText: {
    fontSize: 12,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
});
