import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { PozIcon } from '@/components/PozIcon';
import { useApp } from '@/context/AppContext';

export const LogoutButton: React.FC = () => {
  const router = useRouter();
  const { logoutUser } = useApp();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logoutUser();
      router.replace('/');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        accessibilityLabel="hesaptan çıkış yap"
        onPress={handleLogout}
        disabled={loggingOut}
        style={styles.logoutButton}
      >
        {loggingOut ? (
          <ActivityIndicator size="small" color="#DC2626" />
        ) : (
          <>
            <PozIcon name="profile" size={18} color="#DC2626" />
            <Text style={styles.logoutButtonText}>çıkış yap</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xl,
    alignItems: 'center',
    width: '100%',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    gap: 8,
    width: '100%',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutButtonText: {
    fontSize: 15,
    fontFamily: Fonts.sansBold,
    color: '#DC2626',
    letterSpacing: 0.5,
  },
});
