// SimpleComponent.js
import { Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, Text } from 'react-native';
import { errorMessages } from '@/constants/helper';
import { Loginstyles } from '@/components/Layout/LoginLayoutStyle';
import LoginLayout from '@/components/Layout/LoginLayout';
import OtpInput from '@/components/Input/Otp';
import { router } from 'expo-router';
import { connect } from 'react-redux';
import { clearLogin, clearSendOtp, otpLoginAction, sendOtpAction } from '@/store/action/common/authAction';
import useBackHandler from '@/hooks/useBackHandler';

const Login = (props: any) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  useBackHandler();

  const handleLogin = () => {
    let valid = true;
    if (!phone) {
      setPhoneError(errorMessages.phone.required);
      valid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      setPhoneError(errorMessages.phone.invalid);
      valid = false;
    } else {
      setPhoneError('');
    }

    if (otpSent && !password) {
      setPasswordError(errorMessages.password.required);
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      setLoading(true);
      if(otpSent) {
        props.optLogin_({ phone, otp: password });
      } else {
        props.sendOtp_({ phone });
        // send OTP
      }
      // Handle login logic here
    }
  };
  useEffect(() => {
    if (props.sendOtp && props.sendOtp.message && props.sendOtp.message.includes("Success")) {
      setLoading(false);
      setOtpSent(true);
      setLoginError("");
    } else {
      if (props.sendOtp && props.sendOtp.message) {
        setLoading(false);
        setLoginError(props.sendOtp.message);
      }
    }
  }, [props.sendOtp]);
  useEffect(() => {
    if (props.otpLogin && props.otpLogin.userData) {
      props.clearLogin_();
      props.clearSendOtp_();
      setOtpSent(false);
      setLoading(false);
      setLoginError("");
      router.push("/(tabs)/");
    } else {
      if (props.otpLogin && props.otpLogin.message) {
        setLoading(false);
        setLoginError(props.otpLogin.message);
      }
    }
  }, [props.otpLogin]);
  useEffect(() => {
    // if (!phone) {
    //   setPhoneError(errorMessages.phone.required);
    // } else if (!/^\d{10}$/.test(phone)) {
    //   setPhoneError(errorMessages.phone.invalid);
    // } else if (phone && phoneError === errorMessages.phone.required) {
    //   setPhoneError('');
    // }

    // if (password && passwordError === errorMessages.password.required) {
    //   setPasswordError('');
    // }
  }, [phone, password]);

  return (
    <LoginLayout>
      <Text style={Loginstyles.sptext}>Log in to your Vision fund account!</Text>
        <Text style={Loginstyles.text}>Phone Number</Text>
        <TextInput
          value={phone}
          onChangeText={text => setPhone(text)}
          style={[Loginstyles.input, { backgroundColor: 'white' }]}
          left={<TextInput.Icon icon="account" />}
          keyboardType='numeric'
          error={!!phoneError}
        />
        {phoneError ? <Text style={Loginstyles.errorText}>{phoneError}</Text> : null}
        {otpSent && 
            <>
                <Text style={Loginstyles.text}>OTP</Text>
                <OtpInput length={6} onChange={setPassword}  />
            </>
        }
        {passwordError ? <Text style={Loginstyles.errorText}>{passwordError}</Text> : null}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
          <Text
            style={{
              color: '#007BFF',
            }}
            onPress={() => {
                router.push('../Pages/login')     
            }}
          >
            Login with Password
          </Text>
          <Text
            style={{
              color: '#007BFF',
            }}
            onPress={() => {
              router.push('../Pages/ForgotPassword')
            }}
          >
            Forgot Password?
          </Text>
        </View>
        {loginError ? <Text style={Loginstyles.errorText}>{loginError}</Text> : null}
        <Button mode="contained" onPress={handleLogin}  style={[loading ? Loginstyles.loadingButton : Loginstyles.button]} textColor={loading ? 'black' : 'white'}>
        {loading ? "Loading.." :  (otpSent ? "Login" : "Send OTP")}
        </Button>
    </LoginLayout>
  );
};



const mapStateToProps = (state: any) => ({
  sendOtp: state.sendOtp?.response,
  otpLogin: state.otpLogin?.response,
});

const mapDispatchToProps = (dispatch: any) => ({
  sendOtp_: (data: any) => dispatch(sendOtpAction(data)),
  optLogin_: (data: any) => dispatch(otpLoginAction(data)),
  clearLogin_: () => dispatch(clearLogin()),
  clearSendOtp_: () => dispatch(clearSendOtp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);