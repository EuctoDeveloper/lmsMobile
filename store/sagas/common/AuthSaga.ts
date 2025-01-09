import { call, put, takeEvery } from 'redux-saga/effects'
import * as type from '../../types';
import { changePasswordApi, forgotPasswordApi, forgotPasswordMobileApi, getMyDetailsApi, loginApi, otpLoginApi, resetPasswordApi, resetPasswordMobileApi, sendOtpApi } from '../../api/common/authApi';
import { SagaIterator } from 'redux-saga';

function* fetchLoginSaga(action: any): SagaIterator {
    try {
       const data = yield call(loginApi, action.payload);
       yield put({type: type.FETCH_LOGIN_SUCCESS, data});
    } catch (e: any) {
       yield put({type: type.FETCH_LOGIN_FAILURE, message: e.response?.data?.message});
    }
}
function* fetchSendOtpSaga(action: any): SagaIterator {
    try {
       const data = yield call(sendOtpApi, action.payload);
       yield put({type: type.SEND_OTP_SUCCESS, data});
    } catch (e: any) {
       yield put({type: type.SEND_OTP_FAILURE, message: e.response?.data?.message});
    }
}
function* fetchOtpLoginSaga(action: any): SagaIterator {
    try {
       const data = yield call(otpLoginApi, action.payload);
       yield put({type: type.OTP_LOGIN_SUCCESS, data});
    } catch (e: any) {
       yield put({type: type.OTP_LOGIN_FAILURE, message: e.response?.data?.message});
    }
}
function* fetchForgotPasswordSaga(action: any): SagaIterator {
    try {
       const data = yield call(forgotPasswordApi, action.payload);
       yield put({type: type.FORGOT_PASSWORD_SUCCESS, data});
    } catch (e: any) {
       yield put({type: type.FORGOT_PASSWORD_FAILURE, message: e.response?.data?.message});
    }
}
function* fetchResetPasswordSaga(action: any): SagaIterator {
    try {
       const data = yield call(resetPasswordApi, action.payload);
       yield put({type: type.RESET_PASSWORD_SUCCESS, data});
    } catch (e: any) {
       yield put({type: type.RESET_PASSWORD_FAILURE, message: e.response?.data?.message});
    }
}
function* fetchForgotPasswordMobileSaga(action: any): SagaIterator {
    try {
       const data = yield call(forgotPasswordMobileApi, action.payload);
       yield put({type: type.FORGOT_PASSWORD_MOBILE_SUCCESS, data});
    } catch (e: any) {
       yield put({type: type.FORGOT_PASSWORD_MOBILE_FAILURE, message: e.response?.data?.message});
    }
}
function* fetchResetPasswordMobileSaga(action: any): SagaIterator {
    try {
       const data = yield call(resetPasswordMobileApi, action.payload);
       yield put({type: type.RESET_PASSWORD_MOBILE_SUCCESS, data});
    } catch (e: any) {
       yield put({type: type.RESET_PASSWORD_MOBILE_FAILURE, message: e.response?.data?.message});
    }
}
function* fetchChangePasswordSaga(action: any): SagaIterator {
    try {
       const data = yield call(changePasswordApi, action.payload);
       yield put({type: type.CHANGE_PASSWORD_SUCCESS, data});
    } catch (e: any) {
       yield put({type: type.CHANGE_PASSWORD_FAILURE, message: e.response?.data?.message});
    }
}
function* fetchMyDetailsSaga(action: any): SagaIterator {
    try {
       const data = yield call(getMyDetailsApi);
       yield put({type: type.GET_MY_DETAILS_SUCCESS, data});
    } catch (e: any) {
       yield put({type: type.GET_MY_DETAILS_FAILURE, message: e.response?.data?.message});
    }
}
 


export function* watchFetchLoginSaga() {
    yield takeEvery(type.FETCH_LOGIN, fetchLoginSaga);
}
export function* watchSendOtpSaga() {
    yield takeEvery(type.SEND_OTP, fetchSendOtpSaga);
}
export function* watchOtpLoginSaga() {
    yield takeEvery(type.OTP_LOGIN, fetchOtpLoginSaga);
}
export function* watchFetchForgotPasswordSaga() {
    yield takeEvery(type.FORGOT_PASSWORD, fetchForgotPasswordSaga);
}
export function* watchFetchResetPasswordSaga() {
    yield takeEvery(type.RESET_PASSWORD, fetchResetPasswordSaga);
}
export function* watchForgotPasswordMobileSaga() {
    yield takeEvery(type.FORGOT_PASSWORD_MOBILE, fetchForgotPasswordMobileSaga);
}
export function* watchResetPasswordMobileSaga() {
    yield takeEvery(type.RESET_PASSWORD_MOBILE, fetchResetPasswordMobileSaga);
}
export function* watchChangePasswordSaga() {
    yield takeEvery(type.CHANGE_PASSWORD, fetchChangePasswordSaga);
}
export function* watchFetchMyDetailsSaga() {
    yield takeEvery(type.GET_MY_DETAILS, fetchMyDetailsSaga);
}