import * as type from '../../types';

export function loginAction(data: any) {
    return {
        type: type.FETCH_LOGIN,
        payload: data
    }
}

export function clearLogin() {
    return {
        type: type.FETCH_LOGIN_CLEAR,
    }
    
}

export function clearSendOtp() {
    return {
        type: type.FETCH_SEND_OTP_CLEAR,
    }
    
}

export function setUser(data: any) {
    return {
        type: type.SET_USER,
        data
    }
}

export function sendOtpAction(data: any) {
    return {
        type: type.SEND_OTP,
        payload: data
    }
}

export function otpLoginAction(data: any) {
    return {
        type: type.OTP_LOGIN,
        payload: data
    }
}

export function forgotPassword(data: any) {
    return {
        type: type.FORGOT_PASSWORD,
        payload: data
    }
}

export function resetPassword(data: any) {
    return {
        type: type.RESET_PASSWORD,
        payload: data
    }
}

export function forgotPasswordMobile(data: any) {
    return {
        type: type.FORGOT_PASSWORD_MOBILE,
        payload: data
    }
}
export function resetPasswordMobile(data: any) {
    return {
        type: type.RESET_PASSWORD_MOBILE,
        payload: data
    }
}

export function changePassword(data: any) {
    return {
        type: type.CHANGE_PASSWORD,
        payload: data
    }
}

export function getMyDetails() {
    return {
        type: type.GET_MY_DETAILS
    }
}