// SimpleComponent.js
import { ImageBackground, ScrollView, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { errorMessages } from '../../constants/helper';
import { Loginstyles } from './LoginLayoutStyle';

const LoginLayout = (props: any) => {

  return (
    <>
      <ImageBackground
          source={require('../../assets/images/illus.png')}
          style={{...Loginstyles.illusImage, flex: 1}}
      >
        <ScrollView>
          <View style={{...Loginstyles.container, ...(props.page === "ForgotPassword" ? {paddingTop: 100}: {})}}>
            <Image
            source={require('../../assets/images/logo.png')}
            style={Loginstyles.image}
            />
            {props.children}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default LoginLayout;