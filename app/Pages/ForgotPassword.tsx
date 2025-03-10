// SimpleComponent.js
import { Image, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, Text } from 'react-native';
import { errorMessages } from '../../constants/helper';
import { Loginstyles } from '../../components/Layout/LoginLayoutStyle';
import LoginLayout from '../../components/Layout/LoginLayout';
import { connect } from 'react-redux';
import { forgotPassword, forgotPasswordMobile, loginAction, resetPassword, resetPasswordMobile } from '../../store/action/common/authAction';
import { router } from 'expo-router';
import OtpInput from '../../components/Input/Otp';
import useBackHandler from '../../hooks/useBackHandler';
import { ThemedText } from '../../components/ThemedText';

const ForgotPassword = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [mode, setMode] = useState('email');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [otpRequested, setOtpRequested] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [paswordResetSuccess, setPasswordResetSuccess] = useState(false)
  const [loading, setLoading] = useState(false);

  useBackHandler();

  const handleLogin = () => {
    Keyboard.dismiss();
    setLoading(true);
    let valid = true;
    if(mode==="email" ) {
      if (!email) {
        setEmailError(errorMessages.email.required);
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        setEmailError(errorMessages.email.invalid);
        valid = false;
      } else {
        setEmailError('');
      }
    }

    if(mode==="phone") {
      if (!phone) {
        setPhoneError(errorMessages.phone.required);
        valid = false;
      } else if (!/^\d{10}$/.test(phone)) {
        setPhoneError(errorMessages.phone.invalid);
        valid = false;
      } else {
        setPhoneError('');
      }
    }

    if(otpSent) {
      if (!otp) {
        setOtpError(errorMessages.otp.required);
        valid = false;
      } else {
        setPasswordError('');
      }
      if(!password) {
        setPasswordError(errorMessages.password.required);
        valid = false;
      } else if(password.length < 8) {
        setPasswordError(errorMessages.password.shortLength);
        valid = false;
      }
      else if(!/[!@#$%^&*(),.?":{}|<>]/g.test(password)) {
        setPasswordError(errorMessages.password.noSpecial);
        valid = false;
      } else if(!/[A-Z]/.test(password)) {
        setPasswordError(errorMessages.password.noUpper);
        valid = false;
      }
      else if(!/[a-z]/.test(password)) {
        setPasswordError(errorMessages.password.noLower);
        valid = false;
      }
      else if(!/[0-9]/.test(password)) {
        setPasswordError(errorMessages.password.noNumber);
        valid = false;
      }
      else {
        setPasswordError('');
      }


      if(!confirmPassword) {
        setConfirmPasswordError(errorMessages.password.required);
        valid = false;
      } else if(confirmPassword !== password) {
        setConfirmPasswordError("Passwords do not match");
        valid = false;
      }
    }
    if (otpSent && valid) {
      if(mode === "email") {
        props.resetPassword_({email, password, otp})
      }
      else {
        props.resetPasswordMobile_({phone, password, otp})
      }
    } else if (valid) {
      if(mode === "email") {
        if(!otpRequested) {
          setOtpRequested(true);
          props.forgotPassword_({email})
        }
      } else {
        if(!otpRequested) {
          setOtpRequested(true);
          props.forgotPasswordMobile_({phone: parseInt(phone)})
        }
      }
    }
  };

  useEffect(() => {
    if (props.login && props.login.userData) {
      router.push("/(tabs)/");
    }
  }, [props.login]);
  useEffect(() => {
    setEmailError('');
    setPasswordError('');
    setPhoneError('');
    setOtpSent(false);
    setEmail('');
    setPassword('');
    setPhone('');
    setOtpRequested(false);
  }, [mode]);

  useEffect(() => {
    if(otpSent && props.resetPassword && props.resetPassword.message && props.resetPassword.message.includes('Success')){
      setTimeout(()=>{
          setPasswordResetSuccess(false);
          router.push('../Pages/login');
      }, 2000)
      setPasswordResetSuccess(true)
      setLoading(false)
    }  else {
      if (props.resetPassword && props.resetPassword.message) {
        setLoading(false)
        setLoginError(props.resetPassword.message);
      }
    }

  }, [props.resetPassword]);

  useEffect(() => {
    if(otpSent && props.resetPasswordMobile && props.resetPasswordMobile.message && props.resetPasswordMobile.message.includes('Success')){
        setTimeout(()=>{
          setPasswordResetSuccess(false);
          router.push('../Pages/login');
      }, 2000)
      setPasswordResetSuccess(true)
      setLoading(false)
    } else {
      if (props.resetPasswordMobile && props.resetPasswordMobile.message) {
        setLoading(false)
        setLoginError(props.resetPasswordMobile.message);
      }
    }
  }, [props.resetPasswordMobile]);

  useEffect(() => {
    if(
      (email && emailError == errorMessages.email.required) || 
      (email && !/\S+@\S+\.\S+/.test(email) && emailError == errorMessages.email.invalid)
    ){
      setEmailError('');
    } else if(password && passwordError == errorMessages.password.required){
      setPasswordError('');
    }
  }, [email, password]);

  useEffect(() => {
    if(props.forgotPassword && props.forgotPassword.message && props.forgotPassword.message.includes('Success')){
      setOtpSent(true);
      setLoginError('');
      setLoading(false)
    } else {
      if (props.forgotPassword && props.forgotPassword.message) {
        setLoginError(props.forgotPassword.message);
        setLoading(false)
      }
    }
  }, [props.forgotPassword]);

  useEffect(() => {
    if(props.forgotPasswordMobile && props.forgotPasswordMobile.message && props.forgotPasswordMobile.message.includes('Success')){
      setOtpSent(true);
      setLoginError('');
      setLoading(false)
    } else {
      if (props.forgotPasswordMobile && props.forgotPasswordMobile.message) {
        setLoading(false)
        setLoginError(props.forgotPasswordMobile.message);
      }
    }
  }, [props.forgotPasswordMobile]);

  return (
    <LoginLayout page={"ForgotPassword"}>
      <Text style={Loginstyles.sptext}>Help us to verify you!</Text>
      {mode === "email" ? (
        <>
          <Text style={Loginstyles.text}>Email</Text>
          <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          style={[Loginstyles.input, { backgroundColor: 'white' }]}
          left={<TextInput.Icon icon="account" />}
          error={!!emailError}
          disabled={otpSent}
          />
          {emailError ? <Text style={Loginstyles.errorText}>{emailError}</Text> : null}
        </>): (
        <>
          <Text style={Loginstyles.text}>Phone</Text>
          <TextInput
          value={phone}
          onChangeText={text => setPhone(text)}
          style={[Loginstyles.input, { backgroundColor: 'white' }]}
          left={<TextInput.Icon icon="account" />}
          error={!!phoneError}
          disabled={otpSent}
          />
          {phoneError ? <Text style={Loginstyles.errorText}>{phoneError}</Text> : null}
        </>)}
        {otpSent && 
            <>
                <Text style={Loginstyles.text}>OTP</Text>
                <OtpInput length={6} onChange={setOtp} />
                {otpError ? <Text style={Loginstyles.errorText}>{otpError}</Text> : null}
                <Text style={{...Loginstyles.text, marginTop: 20 }}>New Password</Text>
                <TextInput
                value={password}
                onChangeText={text => setPassword(text)}
                style={[Loginstyles.input, { backgroundColor: 'white' }]}
                left={<TextInput.Icon icon="account" />}
                error={!!passwordError}
                />
                {passwordError ? <Text style={Loginstyles.errorText}>{passwordError}</Text> : null}
                <Text style={Loginstyles.text}>Confirm Password</Text>
                <TextInput
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                style={[Loginstyles.input, { backgroundColor: 'white' }]}
                left={<TextInput.Icon icon="account" />}
                error={!!confirmPasswordError}
                />
                {confirmPasswordError ? <Text style={Loginstyles.errorText}>{confirmPasswordError}</Text> : null}
            </>
            
        }
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
            <Text
              style={{
                color: '#007BFF',
              }}
              onPress={() => {
                setMode(mode === "email" ? "phone" : "email");
              }}
            >
              {mode === "email" ? "Verify with Mobile": "Verify with Email"}
            </Text>
          <Text
            style={{
              color: '#007BFF',
            }}
            onPress={() => {
              router.push('../Pages/login')
            }}
          >
            Looking For Login?
          </Text>
        </View>
        {loginError ? <Text style={Loginstyles.errorText}>{loginError}</Text> : null}

  {paswordResetSuccess ? 
    <ThemedText
      style={{
        fontSize: 15,
        color: 'green',
        marginBottom: 5,
        textAlign: "center"
      }}
    >
      Password Changed Successfully
    </ThemedText> :
    <View pointerEvents="auto" style={{ zIndex: 999 }} >
    <Button mode="contained" onPress={handleLogin} style={[loading ? Loginstyles.loadingButton : Loginstyles.button, { backgroundColor: '#F18551' }]}>
      {loading ? "Loading.." : otpSent ? "Reset Password" : "Send OTP"}
    </Button>
    </View>
  }
    </LoginLayout>
  );
};


const mapStateToProps = (state: any) => ({
  forgotPassword: state.forgotPassword?.response,
  resetPassword: state.resetPassword?.response,
  forgotPasswordMobile: state.forgotPasswordMobile?.response,
  resetPasswordMobile: state.resetPasswordMobile?.response,
});

const mapDispatchToProps = (dispatch: any) => ({
  forgotPassword_: (data: any) => dispatch(forgotPassword(data)),
  resetPassword_: (data: any) => dispatch(resetPassword(data)),
  forgotPasswordMobile_: (data: any) => dispatch(forgotPasswordMobile(data)),
  resetPasswordMobile_: (data: any) => dispatch(resetPasswordMobile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);