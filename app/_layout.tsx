import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';
import * as ScreenOrientation from 'expo-screen-orientation';
// import { ZoomSDKProvider } from '@zoom/meetingsdk-react-native';

import { useColorScheme } from '../hooks/useColorScheme';
import { Provider } from 'react-redux';
import store from "../store/store";
import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const router = useRouter();

  async function requestUserPermission() {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

      const authStatus = await messaging().requestPermission();
      const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
      if (enabled) {
          console.log('Permission granted:', authStatus);
      }
  }
  
  useEffect(() => {
      requestUserPermission();
  
      // Get the device token
      messaging()
          .getToken()
          .then(token => {
              console.log('FCM Token:', token);
          });
  
      // Handle foreground notifications
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', remoteMessage, remoteMessage?.data, remoteMessage?.data?.screen);
      });
      
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage, remoteMessage?.data, remoteMessage?.data?.screen);
      });
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(remoteMessage,"----------------fasdfasfasdfasdfasdfasfd")
        // if (remoteMessage?.data?.screen === "webinar details") {
          console.log("User tapped notification:", remoteMessage.data);
      
          // Navigate to the correct screen
          router.push({pathname: '/Pages/WebinarDetail', params:{
            id: parseInt(remoteMessage?.data.meetingId?.toString() || "0"),
          }});
        // }
      });
  
      // return unsubscribe;
  }, []);
  

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
      {/* <ZoomSDKProvider
        config={{
          jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBLZXkiOiJ5RV81aWRfa1RibVJvNnA0dmZUM1RRIiwic2RrS2V5IjoieUVfNWlkX2tUYm1SbzZwNHZmVDNUUSIsIm1uIjoiODYyMTM3NDY0MjMiLCJyb2xlIjoxLCJ0b2tlbkV4cCI6MTczOTM2ODQ5MSwiaWF0IjoxNzM5MzY0ODkxLCJleHAiOjE3MzkzNjg0OTF9.RvtU3SKUk7UZP0Ub9BvYKHAuW5EoDJ9QUwKjwrCpfhQ',
          domain: 'zoom.us',
          enableLog: true,
          logSize: 5,
        }}
      > */}
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="Pages/login" options={{headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Pages/ForgotPassword" options={{headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Pages/otplogin" options={{headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Pages/Assessment" options={{headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Pages/Activity" options={{headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Pages/CourseList" options={{headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Pages/NotificationList" options={{headerShown: false}} />
            <Stack.Screen name="Pages/Course" options={{headerShown: false}} />
            <Stack.Screen name="Pages/AssessmentIntro" options={{headerShown: false}} />
            <Stack.Screen name="Pages/AssesmentOutro" options={{headerShown: false}} />
            <Stack.Screen name="Pages/ChangePassword" options={{headerShown: false}} />
            <Stack.Screen name="Pages/WebinarDetail" options={{headerShown: false}} />
            <Stack.Screen name="Pages/Dummy" options={{headerShown: false}} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false  }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      {/* </ZoomSDKProvider> */}
    </Provider>
  );
}
