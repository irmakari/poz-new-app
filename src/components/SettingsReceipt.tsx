import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { SectionTitle } from '@/components/SectionTitle';
import { PozIcon, PozIconName } from '@/components/PozIcon';

interface SettingsReceiptProps {
  notificationsEnabled: boolean;
  onToggleNotifications: (val: boolean) => void;
  darkModeEnabled: boolean;
  onToggleDarkMode: (val: boolean) => void;
  locationEnabled: boolean;
  onToggleLocation: (val: boolean) => void;
  defaultFilm: string;
  onOpenDefaultFilmModal: () => void;
}

export const SettingsReceipt: React.FC<SettingsReceiptProps> = ({
  notificationsEnabled,
  onToggleNotifications,
  darkModeEnabled,
  onToggleDarkMode,
  locationEnabled,
  onToggleLocation,
  defaultFilm,
  onOpenDefaultFilmModal,
}) => {
  const handlePrivacyPress = () => {
    Alert.alert(
      'Gizlilik Ayarları',
      'Gizlilik ve veri politikalarını görüntülemek için detay sayfasına gidebilirsin.',
      [{ text: 'Tamam', style: 'default' }]
    );
  };

  return (
    <View style={styles.container}>
      <SectionTitle title="tercihler" stamp="SETTINGS" />

      <ScrapbookCard
        bgColor="#FFFDF9"
        rotation="-0.8deg"
        hasTape="top-left"
        tapeColor={Colors.tapeLavender}
        hasTornEdge="bottom"
        padding={Spacing.md}
        style={styles.card}
      >
        <View style={styles.cardHeaderRow}>
          <Text style={styles.receiptTitle}>LABORATUVAR TERCİHLERİ</Text>
          <PaperStamp label="SETTINGS" color={Colors.textSecondary} rotation="2deg" />
        </View>

        {/* Settings Rows List */}
        <View style={styles.rowsList}>
          {/* 1. Notifications */}
          <View style={styles.settingRow}>
            <View style={styles.leftCol}>
              <View style={styles.iconCircle}>
                <PozIcon name="bell" size={16} color={Colors.text} />
              </View>
              <View style={styles.textGroup}>
                <Text style={styles.rowTitleText}>Bildirimler</Text>
                <Text style={styles.rowSubText}>Banyo ve film hatırlatmaları</Text>
              </View>
            </View>

            <Switch
              value={notificationsEnabled}
              onValueChange={onToggleNotifications}
              trackColor={{ false: 'rgba(28, 26, 36, 0.15)', true: Colors.lavenderDark }}
              thumbColor={notificationsEnabled ? '#FFFDF6' : '#FAF6EE'}
            />
          </View>

          {/* 2. Dark Mode */}
          <View style={styles.settingRow}>
            <View style={styles.leftCol}>
              <View style={styles.iconCircle}>
                <PozIcon name="star" size={16} color={Colors.text} />
              </View>
              <View style={styles.textGroup}>
                <Text style={styles.rowTitleText}>Görünüm</Text>
                <Text style={styles.rowSubText}>Koyu karanlık oda teması</Text>
              </View>
            </View>

            <Switch
              value={darkModeEnabled}
              onValueChange={onToggleDarkMode}
              trackColor={{ false: 'rgba(28, 26, 36, 0.15)', true: Colors.lavenderDark }}
              thumbColor={darkModeEnabled ? '#FFFDF6' : '#FAF6EE'}
            />
          </View>

          {/* 3. Default Film Roll */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onOpenDefaultFilmModal}
            style={styles.settingRow}
          >
            <View style={styles.leftCol}>
              <View style={styles.iconCircle}>
                <PozIcon name="films" size={16} color={Colors.text} />
              </View>
              <View style={styles.textGroup}>
                <Text style={styles.rowTitleText}>Varsayılan Film</Text>
                <Text style={styles.rowSubText}>{defaultFilm}</Text>
              </View>
            </View>

            <View style={styles.valueTag}>
              <Text style={styles.valueTagText}>DEĞİŞTİR ›</Text>
            </View>
          </TouchableOpacity>

          {/* 4. Location Access */}
          <View style={styles.settingRow}>
            <View style={styles.leftCol}>
              <View style={styles.iconCircle}>
                <PozIcon name="photo" size={16} color={Colors.text} />
              </View>
              <View style={styles.textGroup}>
                <Text style={styles.rowTitleText}>Konum Kullanımı</Text>
                <Text style={styles.rowSubText}>Karelere otomatik konum etiketi</Text>
              </View>
            </View>

            <Switch
              value={locationEnabled}
              onValueChange={onToggleLocation}
              trackColor={{ false: 'rgba(28, 26, 36, 0.15)', true: Colors.blueDark }}
              thumbColor={locationEnabled ? '#FFFDF6' : '#FAF6EE'}
            />
          </View>

          {/* 5. Privacy Settings */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handlePrivacyPress}
            style={styles.settingRowLast}
          >
            <View style={styles.leftCol}>
              <View style={styles.iconCircle}>
                <PozIcon name="lock" size={16} color={Colors.text} />
              </View>
              <View style={styles.textGroup}>
                <Text style={styles.rowTitleText}>Gizlilik</Text>
                <Text style={styles.rowSubText}>Veri ve içerik görünürlüğü</Text>
              </View>
            </View>

            <Text style={styles.chevronText}>›</Text>
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
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.06)',
  },
  settingRowLast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(28, 26, 36, 0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textGroup: {
    flex: 1,
  },
  rowTitleText: {
    fontSize: 14,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
  },
  rowSubText: {
    fontSize: 11,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  valueTag: {
    backgroundColor: Colors.lavender,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  valueTagText: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    fontWeight: '800',
    color: Colors.lavenderDark,
  },
  chevronText: {
    fontSize: 18,
    fontFamily: Fonts.sansBold,
    color: Colors.textMuted,
  },
});
