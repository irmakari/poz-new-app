import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { PozIcon } from '@/components/PozIcon';
import { useApp } from '@/context/AppContext';

const heroImage = require('../images/image.png');

export default function LoginScreen() {
  const router = useRouter();
  const { loginUser, registerUser, isAuthenticated } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Eğer kullanıcı zaten giriş yaptıysa doğrudan tab'e yönlendir
  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  const handleSubmit = async () => {
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('Lütfen e-posta adresinizi giriniz.');
      return;
    }
    if (!password) {
      setErrorMessage('Lütfen şifrenizi giriniz.');
      return;
    }

    setLoading(true);

    try {
      let result;
      if (mode === 'login') {
        result = await loginUser(email, password);
      } else {
        result = await registerUser({
          email,
          password,
          username: username.trim() || undefined,
          full_name: fullName.trim() || undefined,
        });
      }

      if (result.success) {
        router.replace('/(tabs)');
      } else {
        setErrorMessage(result.error || 'İşlem gerçekleştirilemedi');
      }
    } catch (err: any) {
      setErrorMessage('Bir bağlantı hatası oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Hero Camera Graphic */}
          <View style={styles.logoContainer}>
            <Image source={heroImage} style={styles.logoImage} resizeMode="contain" />

            {/* Y2K Camera LCD Screen Display Overlay */}
            <View style={styles.cameraScreenOverlay} pointerEvents="none">
              <View style={styles.lcdBadgeRow}>
                <Text style={styles.lcdBadgeText}>35MM • ISO 400</Text>
              </View>
              <Text style={styles.lcdStatusText}>● READY</Text>
            </View>
          </View>

          {/* Main Title & Subtitle */}
          <View style={styles.textSection}>
            <Text style={styles.mainTitle}>anılarını filme dönüştür.</Text>
            <Text style={styles.subTitle}>
              günlerini fotoğraflar, notlar ve şarkılarla sakla.
            </Text>
          </View>

          {/* Backend Controlled Error Message Banner */}
          {errorMessage ? (
            <View style={styles.errorBanner}>
              <PozIcon name="star" size={16} color="#DC2626" />
              <Text style={styles.errorBannerText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* Form Section */}
          <View style={styles.formSection}>
            {mode === 'register' && (
              <>
                <View style={styles.inputWrapper}>
                  <PozIcon name="profile" size={18} color={Colors.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="ad soyad (opsiyonel)"
                    placeholderTextColor={Colors.textMuted}
                    value={fullName}
                    onChangeText={setFullName}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <PozIcon name="sparkle" size={18} color={Colors.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="kullanıcı adı"
                    placeholderTextColor={Colors.textMuted}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                  />
                </View>
              </>
            )}

            <View style={styles.inputWrapper}>
              <PozIcon name="mail" size={18} color={Colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="e-posta adresi"
                placeholderTextColor={Colors.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputWrapper}>
              <PozIcon name="lock" size={18} color={Colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="şifre"
                placeholderTextColor={Colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIconButton}
              >
                <PozIcon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={18}
                  color={Colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* Primary Action Button */}
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleSubmit}
              disabled={loading}
              style={styles.primaryButton}
            >
              {loading ? (
                <ActivityIndicator color="#FFFDF6" size="small" />
              ) : (
                <>
                  <Text style={styles.primaryButtonText}>
                    {mode === 'login' ? 'giriş yap' : 'hesap oluştur'}
                  </Text>
                  <PozIcon name="arrow-right" size={18} color="#FFFDF6" />
                </>
              )}
            </TouchableOpacity>

            {/* Bottom Text Link Switcher (Giriş Yap / Kayıt Ol) */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setErrorMessage(null);
              }}
              style={styles.switchModeButton}
            >
              <Text style={styles.switchModeText}>
                {mode === 'login' ? (
                  <>
                    Hesabın yok mu? <Text style={styles.switchModeBold}>Kayıt Ol</Text>
                  </>
                ) : (
                  <>
                    Zaten hesabın var mı? <Text style={styles.switchModeBold}>Giriş Yap</Text>
                  </>
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 370,
    height: 290,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
    position: 'relative',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  cameraScreenOverlay: {
    position: 'absolute',
    top: '41%',
    left: '32.5%',
    width: '26.5%',
    height: '24%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  lcdBadgeRow: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 6,
    paddingVertical: 2.5,
    borderRadius: 3.5,
  },
  lcdBadgeText: {
    fontSize: 8.2,
    fontFamily: Fonts.mono,
    color: '#FFFDF6',
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  lcdStatusText: {
    fontSize: 8,
    fontFamily: Fonts.mono,
    color: '#15803D',
    fontWeight: '800',
  },
  textSection: {
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  mainTitle: {
    fontSize: 24,
    fontFamily: Fonts.serif,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  errorBanner: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    borderColor: '#FCA5A5',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    gap: 8,
    marginBottom: Spacing.md,
  },
  errorBannerText: {
    flex: 1,
    fontSize: 13,
    fontFamily: Fonts.sansBold,
    color: '#991B1B',
  },
  formSection: {
    width: '100%',
    gap: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF9',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  eyeIconButton: {
    padding: 6,
    marginLeft: 6,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: Fonts.sans,
    color: Colors.text,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E3A8A',
    borderRadius: BorderRadius.md,
    height: 52,
    gap: 8,
    marginTop: 8,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF6',
  },
  switchModeButton: {
    marginTop: 14,
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  switchModeText: {
    fontSize: 14,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
  },
  switchModeBold: {
    fontFamily: Fonts.sansBold,
    color: '#1E3A8A',
    textDecorationLine: 'underline',
  },
});
