import { call, put, takeEvery } from 'redux-saga/effects'
import * as type from '../../types';
import { SagaIterator } from 'redux-saga';
import { getMyWebinarApi, getUpcomingWebinarApi, getWebinarDetailApi } from '../../api/common/webinarApi';

function* fetchMyWebinarsSaga(action: any): SagaIterator {
    try {
        const data = yield call(getMyWebinarApi, action.payload);
        yield put({type: type.GET_MY_WEBINARS_SUCCESS, data});
    } catch (e: any) {
        yield put({type: type.GET_MY_WEBINARS_FAILURE, message: e.response?.data?.message});
    }
}

function* fetchWebinarDetailSaga(action: any): SagaIterator {
    try {
        const data = yield call(getWebinarDetailApi, action.payload);
        yield put({type: type.GET_WEBINAR_DETAILS_SUCCESS, data});
    } catch (e: any) {
        yield put({type: type.GET_WEBINAR_DETAILS_FAILURE, message: e.response?.data?.message});
    }
}

function* fetchUpcomingWebinarSaga(action: any): SagaIterator {
    try {
        const data = yield call(getUpcomingWebinarApi);
        yield put({type: type.GET_UPCOMING_WEBINAR_SUCCESS, data});
    }
    catch (e: any) {
        yield put({type: type.GET_UPCOMING_WEBINAR_FAILURE, message: e.response?.data?.message});
    }
}


export function* watchFetchMyWebinarsSaga() {
    yield takeEvery(type.GET_MY_WEBINARS, fetchMyWebinarsSaga);
}
export function* watchFetchWebinarDetailSaga() {
    yield takeEvery(type.GET_WEBINAR_DETAILS, fetchWebinarDetailSaga);
}
export function* watchFetchUpcomingWebinarSaga() {
    yield takeEvery(type.GET_UPCOMING_WEBINAR, fetchUpcomingWebinarSaga);
}