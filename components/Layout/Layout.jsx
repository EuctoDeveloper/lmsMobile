import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import { Text, StyleSheet } from 'react-native';

export default function Layout(props) {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = { fontFamily: 'Inter_400Regular' };

  return props.children;
}
