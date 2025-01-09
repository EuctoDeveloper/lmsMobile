import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';
import * as ScreenOrientation from 'expo-screen-orientation';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from 'react-redux';
import store from "../store/store";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const router = useRouter();

  useEffect(() => {
    if (loaded) {
      getUserDetails();
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  useEffect(() => {
    // Lock orientation to portrait on app launch
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
}, []);

  if (!loaded) {
    return null;
  }
  const getUserDetails = async () => {
    const userDetails = await SecureStore.getItemAsync('firstName');
    if (userDetails) {
    } else {
      router.push('/Pages/login')
    }
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="Pages/login" options={{headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="Pages/ForgotPassword" options={{headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="Pages/otplogin" options={{headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="Pages/Assessment" options={{headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="Pages/CourseList" options={{headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="Pages/NotificationList" options={{headerShown: false}} />
          <Stack.Screen name="Pages/Course" options={{headerShown: false}} />
          <Stack.Screen name="Pages/AssessmentIntro" options={{headerShown: false}} />
          <Stack.Screen name="Pages/AssesmentOutro" options={{headerShown: false}} />
          <Stack.Screen name="Pages/ChangePassword" options={{headerShown: false}} />
          <Stack.Screen name="Pages/Dummy" options={{headerShown: false}} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false  }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
