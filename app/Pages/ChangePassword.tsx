import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import Header from '@/components/Input/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { changePassword } from '@/store/action/common/authAction';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';

const ChangePassword = (props: any) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [isFocusedNew, setIsFocusedNew] = useState(false);
  const [isFocusedConfirm, setIsFocusedConfirm] = useState(false);
  const [paswordResetSuccess, setPasswordResetSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordCriteria = {
    matches: newPassword === confirmPassword && newPassword.length > 0,
    minLength: newPassword.length > 7,
    hasUpperCase: /[A-Z]/.test(newPassword),
    hasLowerCase: /[a-z]/.test(newPassword),
    hasNumber: /\d/.test(newPassword),
    hasSpecialCharacter: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(newPassword),
  };

  const submit = ()=> {
    setLoading(true);
    props.changePassword_({oldPassword: currentPassword, newPassword});
  }

  useEffect(() => {
    if (currentPassword && props.changePassword && props.changePassword.message) {
        setLoading(false);
        if(props.changePassword.message.includes('Success')){
            setTimeout(()=>{
                setPasswordResetSuccess(false);
                router.push('/(tabs)/profile');
            }, 2000)
            setPasswordResetSuccess(true)
        }
        else if(props.changePassword.message.includes('Invalid'))
            alert("Invalid Current Password");
    }
  }, [props.changePassword]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
            <Header title="Change Password" page="(tabs)/profile" />
            <ScrollView style={styles.container}>
                {/* Current Password Input */}
                <View style={{marginTop: 50}}></View>
                <View style={styles.inputContainer}>
                <Text style={[styles.label, styles.labelFocused]}>
                    Current Password
                </Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={!showCurrentPassword}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                />
                <TouchableOpacity style={{ marginLeft: -25, zIndex: 50 }} onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                    <Icon name={showCurrentPassword ? 'eye-slash' : 'eye'} size={20} />
                </TouchableOpacity>
                </View>

                {/* New Password Input */}
                <View style={styles.inputContainer}>
                <Text style={[styles.label, styles.labelFocused]}>
                    New Password
                </Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={!showPassword}
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TouchableOpacity style={{ marginLeft: -25, zIndex: 50 }} onPress={() => setShowPassword(!showPassword)}>
                    <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} />
                </TouchableOpacity>
                </View>

                {/* Confirm Password Input */}
                <View style={styles.inputContainer}>
                <Text style={[styles.label, styles.labelFocused]}>
                    Confirm Password
                </Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    onFocus={() => setIsFocusedConfirm(true)}
                    onBlur={() => setIsFocusedConfirm(false)}
                />
                </View>

                {/* Password Validation Criteria */}
                <View style={styles.criteriaContainer}>
                <CheckBox
                    title="Have at least 8 characters"
                    checked={passwordCriteria.minLength}
                    checkedColor="green"
                />
                <CheckBox
                    title="Contains an uppercase"
                    checked={passwordCriteria.hasUpperCase}
                    checkedColor="green"
                />
                <CheckBox
                    title="Contains a lowercase"
                    checked={passwordCriteria.hasLowerCase}
                    checkedColor="green"
                />
                <CheckBox
                    title="Contains a number"
                    checked={passwordCriteria.hasNumber}
                    checkedColor="green"
                />
                <CheckBox
                    title="Contains a special character"
                    checked={passwordCriteria.hasSpecialCharacter}
                    checkedColor="green"
                />
                <CheckBox
                    title="Password matches"
                    checked={passwordCriteria.matches}
                    checkedColor="green"
                />
                </View>
                {paswordResetSuccess ? <ThemedText
                  style={{
                    fontSize: 15,
                    color: 'green',
                    marginBottom: 5,
                    textAlign: "center"
                  }}
                >
                  Password Changed Successfully
                </ThemedText> : <>

                    {
                    passwordCriteria.matches &&
                    passwordCriteria.minLength &&
                    passwordCriteria.hasUpperCase &&
                    passwordCriteria.hasLowerCase &&
                    passwordCriteria.hasNumber &&
                    passwordCriteria.hasSpecialCharacter &&
                    <Button style={loading ? styles.loadingButton : styles.button} onPress={() => submit()} textColor={loading ? 'black' : 'white'}>{loading ? 'Loading...' : 'Update'}</Button>
                    }
                </>}
            </ScrollView>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#c1c1c1',
    },
    label: {
        position: 'absolute',
        left: 10,
        top: 18,
        fontSize: 16,
        zIndex: 15,
        backgroundColor: "rgb(242, 242, 242)"
    },
    labelFocused: {
        top: -10,
        fontSize: 12,
    },
    input: {
        height: 40,
        paddingHorizontal: 10,
        fontSize: 16,
        paddingTop: 20,
        zIndex: 10,
        width: "100%",
        backgroundColor: "transparent",
        borderColor: "black",
        borderStyle: "solid",
    },
    criteriaContainer: {
        marginVertical: 20,
    },
    button: {
        backgroundColor: "#ff7f45",
        color: "white",
        borderRadius: 10,
        marginBottom: 100
    },
    loadingButton: {
        backgroundColor: "#E6E6E6",
        color: "black",
        borderRadius: 10,
        marginBottom: 100
    }
});

const mapStateToProps = (state: any) => ({
    changePassword: state.changePassword?.response,
});
  
const mapDispatchToProps = (dispatch: any) => ({
    changePassword_: (data: any) => dispatch(changePassword(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
