// SimpleComponent.js
import { ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { errorMessages } from '../../constants/helper';
import { Loginstyles } from './LoginLayoutStyle';

const LoginLayout = (props: any) => {

  return (
  //   <KeyboardAvoidingView 

  // enableOnAndroid={true} // Critical for Android
  // extraScrollHeight={20}
  // keyboardOpeningTime={0} // Disable animation delays
  // enableResetScrollToCoords={false}
  // keyboardShouldPersistTaps="handled"
  //     behavior={Platform.OS === "ios" ? "padding" : "height"}
  //     style={{ flex: 1 }}
  //   >

        <ImageBackground
            source={require('../../assets/images/illus.png')}
            style={{...Loginstyles.illusImage, flex: 1}}
        >
          <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={{...Loginstyles.container, ...(props.page === "ForgotPassword" ? {paddingTop: 70}: {})}}>
              <Image
              source={require('../../assets/images/logo-enlight.png')}
              style={Loginstyles.image}
              />
              {props.children}
            </View>
          </ScrollView>
        </ImageBackground>
    // </KeyboardAvoidingView>
  );
};

export default LoginLayout;