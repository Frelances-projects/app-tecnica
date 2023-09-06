import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

import { AppProvider } from '@/contexts/AppProvider'

export const unstable_settings = {
  initialRouteName: 'index',
}

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
};

export default function StackLayout() {
  const [hasLoadedFonts] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  })

  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <AppProvider>
      <StatusBar style="dark" translucent />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="reset-password" />
        <Stack.Screen name="(drawer)" />
      </Stack>
      <Toast config={toastConfig} position='top' />
    </AppProvider>
  )
}
