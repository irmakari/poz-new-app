import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '@/constants/theme';
import { ProfileHeader } from '@/components/ProfileHeader';
import { ProfileIdentityCard } from '@/components/ProfileIdentityCard';
import { ProfileStatsGrid } from '@/components/ProfileStatsGrid';
import { SettingsReceipt } from '@/components/SettingsReceipt';
import { DefaultFilmModal } from '@/components/DefaultFilmModal';
import { ExportOptionsModal } from '@/components/ExportOptionsModal';
import { LogoutButton } from '@/components/LogoutButton';
import { MOCK_PROFILE } from '@/utils/profileData';

export default function ProfileScreen() {
  // Local Settings & Preferences States
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [selectedDefaultFilm, setSelectedDefaultFilm] = useState('summer glow');

  // Modal States
  const [isDefaultFilmModalVisible, setIsDefaultFilmModalVisible] = useState(false);
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <ProfileHeader />

        {/* Profile Analog Member Pass Photo ID */}
        <ProfileIdentityCard profile={MOCK_PROFILE} />

        {/* Statistics Grid */}
        <ProfileStatsGrid stats={MOCK_PROFILE.stats} />

        {/* Preferences Photo Lab Receipt */}
        <SettingsReceipt
          notificationsEnabled={notificationsEnabled}
          onToggleNotifications={setNotificationsEnabled}
          darkModeEnabled={darkModeEnabled}
          onToggleDarkMode={setDarkModeEnabled}
          locationEnabled={locationEnabled}
          onToggleLocation={setLocationEnabled}
          defaultFilm={selectedDefaultFilm}
          onOpenDefaultFilmModal={() => setIsDefaultFilmModalVisible(true)}
        />

        {/* Default Film Selection Modal */}
        <DefaultFilmModal
          visible={isDefaultFilmModalVisible}
          onClose={() => setIsDefaultFilmModalVisible(false)}
          selectedFilm={selectedDefaultFilm}
          onSelectFilm={setSelectedDefaultFilm}
        />

        {/* Export Options Modal */}
        <ExportOptionsModal
          visible={isExportModalVisible}
          onClose={() => setIsExportModalVisible(false)}
        />

        {/* Logout Action Button */}
        <LogoutButton />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: 150, // Clearance for bottom tab bar
  },
});
