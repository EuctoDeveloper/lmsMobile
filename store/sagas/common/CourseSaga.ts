import { call, put, takeEvery } from 'redux-saga/effects'
import * as type from '../../types';
import { SagaIterator } from 'redux-saga';
import { clearNotificationApi, dirtNotificationApi, enrollCourseApi, getCompletedCoursesApi, getCourseDetailApi, getCourseListApi, getLessonApi, getMyAchievementsApi, getNotificationsApi, getRecentCoursesApi, saveLessonProgressApi } from '@/store/api/common/courseApi';

function* fetchRecentCoursesSaga(action: any): SagaIterator {
    try {
        const data = yield call(getRecentCoursesApi);
        yield put({type: type.GET_RECENT_COURSES_SUCCESS, data});
    } catch (e: any) {
        yield put({type: type.GET_RECENT_COURSES_FAILURE, message: e.response?.data?.message});
    }
}

function* enrollCourseSaga(action: any): SagaIterator {
    try {
        const data = yield call(enrollCourseApi, action.payload);
        yield put({type: type.ENROLL_COURSE_SUCCESS, data});
    } catch (e: any) {
        yield put({type: type.ENROLL_COURSE_FAILURE, message: e.response?.data?.message});
    }
}
function* fetchCourseDetailSaga(action: any): SagaIterator {
    try {
        const data = yield call(getCourseDetailApi, action.payload);
        yield put({type: type.GET_COURSE_DETAILS_SUCCESS, data});
    } catch (e: any) {
        yield put({type: type.GET_COURSE_DETAILS_FAILURE, message: e.response?.data?.message});
    }
}
function* fetchLessonDetailSaga(action: any): SagaIterator {
    try {
        const data = yield call(getLessonApi, action.payload);
        yield put({type: type.GET_LESSON_DETAILS_SUCCESS, data});
    } catch (e: any) {
        yield put({type: type.GET_LESSON_DETAILS_FAILURE, message: e.response?.data?.message});
    }
}
function* saveLessonProgressSaga(action: any): SagaIterator {
    try {
        const data = yield call(saveLessonProgressApi, action.payload.lessonId, action.payload.progress);
        yield put({type: type.SAVE_LESSON_PROGRESS_SUCCESS, data});
    } catch (e: any) {
        yield put({type: type.SAVE_LESSON_PROGRESS_FAILURE, message: e.response?.data?.message});
    }
}
function* fetchCourseListSaga(action: any): SagaIterator {
    try {
        const data = yield call(getCourseListApi);
        yield put({type: type.GET_COURSE_LIST_SUCCESS, data});
    } catch (e: any) {
        yield put({type: type.GET_COURSE_LIST_FAILURE, message: e.response?.data?.message});
    }
}
function* fetchMyAchievementsSaga(action: any): SagaIterator {
    try {
        const data = yield call(getMyAchievementsApi);
        yield put({type: type.GET_MY_ACHIEVEMENTS_SUCCESS, data});
    } catch (e: any) {
        yield put({type: type.GET_MY_ACHIEVEMENTS_FAILURE, message: e.response?.data?.message});
    }
}
function* fetchNotificationsSaga(action: any): SagaIterator {
    try {
        const data = yield call(getNotificationsApi);
        yield put({type: type.FETCH_NOTIFICATIONS_SUCCESS, data});
    } catch (e: any) {
        yield put({type: type.FETCH_NOTIFICATIONS_FAILURE, message: e.response?.data?.message});
    }
}
function * dirtNotificationSaga(action: any): SagaIterator {
    try {
        const data = yield call(dirtNotificationApi);
        yield put({type: type.DIRT_NOTIFICATION_SUCCESS, data});
    } catch (e: any) {
        yield put({type: type.DIRT_NOTIFICATION_FAILURE, message: e.response?.data?.message});
    }
}
function* clearNotificationSaga(action: any): SagaIterator {
    try {
        const data = yield call(clearNotificationApi, action.payload);
        yield put({type: type.CLEAR_NOTIFICATION_SUCCESS, data});
    } catch (e: any) {
        yield put({type: type.CLEAR_NOTIFICATION_FAILURE, message: e.response?.data?.message});
    }
}
function* fetchCompletedCoursesSaga(action: any): SagaIterator {
    try {
        const data = yield call(getCompletedCoursesApi);
        yield put({type: type.GET_COMPLETED_COURSES_SUCCESS, data});
    } catch (e: any) {
        yield put({type: type.GET_COMPLETED_COURSES_FAILURE, message: e.response?.data?.message});
    }
}


export function* watchFetchRecentCoursesSaga() {
    yield takeEvery(type.GET_RECENT_COURSES, fetchRecentCoursesSaga);
}
export function* watchEnrollCourseSaga() {
    yield takeEvery(type.ENROLL_COURSE, enrollCourseSaga);
}
export function* watchFetchCourseDetailSaga() {
    yield takeEvery(type.GET_COURSE_DETAILS, fetchCourseDetailSaga);
}
export function* watchFetchLessonDetailSaga() {
    yield takeEvery(type.GET_LESSON_DETAILS, fetchLessonDetailSaga);
}
export function* watchSaveLessonProgressSaga() {
    yield takeEvery(type.SAVE_LESSON_PROGRESS, saveLessonProgressSaga);
}
export function* watchFetchCourseListSaga() {
    yield takeEvery(type.GET_COURSE_LIST, fetchCourseListSaga);
}
export function* watchFetchMyAchievementsSaga() {
    yield takeEvery(type.GET_MY_ACHIEVEMENTS, fetchMyAchievementsSaga);
}
export function* watchFetchNotificationsSaga() {
    yield takeEvery(type.FETCH_NOTIFICATIONS, fetchNotificationsSaga);
}
export function* watchDirtNotificationSaga() {
    yield takeEvery(type.DIRT_NOTIFICATION, dirtNotificationSaga);
}
export function* watchClearNotificationSaga() {
    yield takeEvery(type.CLEAR_NOTIFICATION, clearNotificationSaga);
}
export function* watchFetchCompletedCoursesSaga() {
    yield takeEvery(type.GET_COMPLETED_COURSES, fetchCompletedCoursesSaga);
}