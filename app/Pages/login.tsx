// SimpleComponent.js
import { Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, Text } from 'react-native';
import { errorMessages } from '@/constants/helper';
import { Loginstyles } from '@/components/Layout/LoginLayoutStyle';
import LoginLayout from '@/components/Layout/LoginLayout';
import { connect } from 'react-redux';
import { loginAction } from '@/store/action/common/authAction';
import { router, useFocusEffect } from 'expo-router';
import useBackHandler from '@/hooks/useBackHandler';

const Login = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  useBackHandler();

  const handleLogin = () => {
    let valid = true;
    if (!email) {
      setEmailError(errorMessages.email.required);
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(errorMessages.email.invalid);
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError(errorMessages.password.required);
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      setLoading(true);
      props.loginAction_({ email, password });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setEmail('');
        setPassword('');
        setEmailError('');
        setPasswordError('');
        setLoginError('');
      };
    }, [])
  );

  useEffect(() => {
    if (props.login && props.login.userData) {
      setLoading(false);
      router.push("/(tabs)/");
    } else {
      if (props.login && props.login.message) {
        setLoading(false);
        setLoginError(props.login.message);
      }
    }
  }, [props.login]);

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

  return (
    <LoginLayout>
      <Text style={Loginstyles.sptext}>Log in to your Vision fund account!</Text>
        <Text style={Loginstyles.text}>Email / Phone Number</Text>
        <TextInput
        value={email}
        onChangeText={text => setEmail(text)}
        style={[Loginstyles.input, { backgroundColor: 'white' }]}
        left={<TextInput.Icon icon="account" />}
        error={!!emailError}
        placeholder='Enter your email or phone'
        />
        {emailError ? <Text style={Loginstyles.errorText}>{emailError}</Text> : null}
        <Text style={Loginstyles.text}>Password</Text>
        <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        style={[Loginstyles.input, { backgroundColor: 'white' }]}
        secureTextEntry={!passwordVisible}
        left={<TextInput.Icon icon="lock" />}
        error={!!passwordError}
        placeholder='Enter your password'
        right={
          <TextInput.Icon
            icon={passwordVisible ? "eye" : "eye-off"}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        }
        />
        {passwordError ? <Text style={Loginstyles.errorText}>{passwordError}</Text> : null}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
          <Text
            style={{
              color: '#007BFF',
            }}
            onPress={() => {
              router.push('../Pages/otplogin')
            }}
          >
            Login with OTP
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
        <Button mode="contained" onPress={handleLogin} style={[loading ? Loginstyles.loadingButton : Loginstyles.button]} textColor={loading ? 'black' : 'white'}>
        {loading ? "Loading.." : "Login"}
        </Button>
    </LoginLayout>
  );
};


const mapStateToProps = (state: any) => ({
  login: state.login?.response,
});

const mapDispatchToProps = (dispatch: any) => ({
  loginAction_: (data: any)=>{dispatch(loginAction(data))},
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);