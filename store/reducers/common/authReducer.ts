import { postLoginFn } from '../../../constants/helper';
import OpenNotification from '../../../utils/OpenNotification';
import * as type from '../../types';
import { AnyAction } from 'redux';


const initialLoginState = {
    response: {},
    loading: false,
    error: null
}
const initialUserState = {
    response: {},
    loading: false,
    error: null
}
const initialSendOtpState = {
    response: {},
    loading: false,
    error: null
}
const initialOtpLoginState = {
    response: {},
    loading: false,
    error: null
}
const initialForgotPasswordState = {
    response: {},
    loading: false,
    error: null
}
const initialResetPasswordState = {
    response: {},
    loading: false,
    error: null
}
const initialForgotMobilePasswordState = {
    response: {},
    loading: false,
    error: null
}
const initialResetMobilePasswordState = {
    response: {},
    loading: false,
    error: null
}
const changePasswordState = {
    response: {},
    loading: false,
    error: null
}
const initialMyDetailsState = {
    response: {},
    loading: false,
    error: null
}


export function loginReducer(state = initialLoginState, action: AnyAction) {
    switch (action.type) {
        case type.FETCH_LOGIN:
            return {
                ...state,
                loading: true
            }
        case type.FETCH_LOGIN_SUCCESS:
            postLoginFn(action.data.data);
            // OpenNotification({ type: "error", heading: "Error", content: action.message });
            // document.location.href = "/";
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.FETCH_LOGIN_FAILURE:
            OpenNotification({ type: "error", heading: "Error", content: action.message });
            return {
                ...state,
                loading: false,
                response: {message: action.message}
            }
        case type.FETCH_LOGIN_CLEAR:
            return {
                ...state,
                loading: false,
                response: {}
            }
        default:
            return state
    }
}

export function userReducer(state = initialUserState, action: AnyAction) {
    switch (action.type) {
        case type.SET_USER:
            return {
                ...state,
                loading: false,
                response: action.data
            }
        default:
            return state
    }
}
export function sendOtpReducer(state = initialSendOtpState, action: AnyAction) {
    switch (action.type) {
        case type.SEND_OTP:
            return {
                ...state,
                loading: true
            }
        case type.SEND_OTP_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.SEND_OTP_FAILURE:
            return {
                ...state,
                loading: false,
                response: {message: action.message}
            }
        case type.FETCH_SEND_OTP_CLEAR:
            return {
                ...state,
                loading: false,
                response: {}
            }
        default:
            return state
    }
}
export function otpLoginReducer(state = initialOtpLoginState, action: AnyAction) {
    switch (action.type) {
        case type.OTP_LOGIN:
            return {
                ...state,
                loading: true
            }
        case type.OTP_LOGIN_SUCCESS:
            postLoginFn(action.data.data);
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.OTP_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                response: {message: action.message}
            }
        case type.FETCH_LOGIN_CLEAR:
            return {
                ...state,
                loading: false,
                response: {}
            }
        default:
            return state
    }
}

export function forgotPasswordReducer(state = initialForgotPasswordState, action: AnyAction) {
    switch (action.type) {
        case type.FORGOT_PASSWORD:
            return {
                ...state,
                loading: true
            }
        case type.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                response: {message: action.message}
            }
        default:
            return state
    }
}
export function resetPasswordReducer(state = initialResetPasswordState, action: AnyAction) {
    switch (action.type) {
        case type.RESET_PASSWORD:
            return {
                ...state,
                loading: true
            }
        case type.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.RESET_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                response: {message: action.message}
            }
        default:
            return state
    }
}
export function forgotPasswordMobileReducer(state = initialForgotMobilePasswordState, action: AnyAction) {
    switch (action.type) {
        case type.FORGOT_PASSWORD_MOBILE:
            return {
                ...state,
                loading: true
            }
        case type.FORGOT_PASSWORD_MOBILE_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.FORGOT_PASSWORD_MOBILE_FAILURE:
            return {
                ...state,
                loading: false,
                response: {message: action.message}
            }
        default:
            return state
    }
}
export function resetPasswordMobileReducer(state = initialResetMobilePasswordState, action: AnyAction) {
    switch (action.type) {
        case type.RESET_PASSWORD_MOBILE:
            return {
                ...state,
                loading: true
            }
        case type.RESET_PASSWORD_MOBILE_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.RESET_PASSWORD_MOBILE_FAILURE:
            return {
                ...state,
                loading: false,
                response: {message: action.message}
            }
        default:
            return state
    }
}
export function changePasswordReducer(state = changePasswordState, action: AnyAction) {
    switch (action.type) {
        case type.CHANGE_PASSWORD:
            return {
                ...state,
                loading: true
            }
        case type.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                response: {message: action.message}
            }
        default:
            return state
    }
}
export function fetchMyDetailsReducer(state = initialMyDetailsState, action: AnyAction) {
    switch (action.type) {
        case type.GET_MY_DETAILS:
            return {
                ...state,
                loading: true
            }
        case type.GET_MY_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.GET_MY_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}   