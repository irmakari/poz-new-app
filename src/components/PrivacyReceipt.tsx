import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { SectionTitle } from '@/components/SectionTitle';
import { PozIcon } from '@/components/PozIcon';
import { useApp } from '@/context/AppContext';

export const PrivacyReceipt: React.FC = () => {
  const router = useRouter();
  const { logoutUser } = useApp();

  const handleLogoutPress = async () => {
    try {
      await logoutUser();
      router.replace('/');
    } catch (e) {
      console.error(e);
    }
  };
  const handleItemPress = (title: string) => {
    Alert.alert(
      title,
      'Bu özellik henüz aktif değil.',
      [{ text: 'Tamam', style: 'default' }]
    );
  };

  const handleAppAbout = () => {
    Alert.alert(
      'POZ Hakkında',
      'POZ v1.0.0 (Analog Scrapbook Edition)\nKüçük anları film gibi saklamak için tasarlandı.',
      [{ text: 'Tamam', style: 'default' }]
    );
  };

  return (
    <View style={styles.container}>
      <SectionTitle title="gizlilik ve hesap" stamp="PRIVACY" />

      <ScrapbookCard
        bgColor="#FFFDF9"
        rotation="-1deg"
        hasTape="top-left"
        tapeColor={Colors.tapePink}
        hasTornEdge="bottom"
        padding={Spacing.md}
        style={styles.card}
      >
        <View style={styles.cardHeaderRow}>
          <Text style={styles.receiptTitle}>HESAP VE GİZLİLİK FİŞİ</Text>
          <PaperStamp label="ACCOUNT" color={Colors.textSecondary} rotation="-2deg" />
        </View>

        <View style={styles.rowsList}>
          {/* 1. Privacy Policy */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleItemPress('Gizlilik Ayarları')}
            style={styles.receiptRow}
          >
            <View style={styles.leftCol}>
              <PozIcon name="lock" size={16} color={Colors.text} />
              <Text style={styles.rowTitleText}>gizlilik ayarları</Text>
            </View>
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>

          {/* 2. Download Data */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleItemPress('Verilerimi İndir')}
            style={styles.receiptRow}
          >
            <View style={styles.leftCol}>
              <PozIcon name="photo" size={16} color={Colors.text} />
              <Text style={styles.rowTitleText}>verilerimi indir</Text>
            </View>
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>

          {/* 3. Logout Row */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleLogoutPress}
            style={styles.receiptRow}
          >
            <View style={styles.leftCol}>
              <PozIcon name="profile" size={16} color="#DC2626" />
              <Text style={[styles.rowTitleText, { color: '#DC2626', fontFamily: Fonts.sansBold }]}>
                oturumu kapat (çıkış yap)
              </Text>
            </View>
            <Text style={[styles.arrowText, { color: '#DC2626' }]}>›</Text>
          </TouchableOpacity>

          {/* 3. Delete Account */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleItemPress('Hesabımı Sil')}
            style={styles.receiptRow}
          >
            <View style={styles.leftCol}>
              <PozIcon name="bell" size={16} color={Colors.stampRed} />
              <Text style={[styles.rowTitleText, { color: Colors.stampRed }]}>
                hesabımı sil
              </Text>
            </View>
            <Text style={[styles.arrowText, { color: Colors.stampRed }]}>›</Text>
          </TouchableOpacity>

          {/* 4. About App */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleAppAbout}
            style={styles.receiptRowLast}
          >
            <View style={styles.leftCol}>
              <PozIcon name="sparkle" size={16} color={Colors.text} />
              <Text style={styles.rowTitleText}>uygulama hakkında</Text>
            </View>
            <Text style={styles.versionText}>v1.0.0</Text>
          </TouchableOpacity>
        </View>
      </ScrapbookCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  card: {
    marginTop: 4,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.08)',
  },
  receiptTitle: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: Colors.textSecondary,
    letterSpacing: 1,
  },
  rowsList: {
    gap: 2,
  },
  receiptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.06)',
  },
  receiptRowLast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowTitleText: {
    fontSize: 14,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
  },
  arrowText: {
    fontSize: 18,
    fontFamily: Fonts.sansBold,
    color: Colors.textMuted,
  },
  versionText: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    fontWeight: '700',
  },
});
