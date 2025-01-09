import { all } from 'redux-saga/effects'
import { watchChangePasswordSaga, watchFetchForgotPasswordSaga, watchFetchLoginSaga, watchFetchMyDetailsSaga, watchFetchResetPasswordSaga, watchForgotPasswordMobileSaga, watchOtpLoginSaga, watchResetPasswordMobileSaga, watchSendOtpSaga } from './common/AuthSaga'
import { watchClearNotificationSaga, watchDirtNotificationSaga, watchEnrollCourseSaga, watchFetchCompletedCoursesSaga, watchFetchCourseDetailSaga, watchFetchCourseListSaga, watchFetchLessonDetailSaga, watchFetchMyAchievementsSaga, watchFetchNotificationsSaga, watchFetchRecentCoursesSaga, watchSaveLessonProgressSaga } from './common/CourseSaga'

export default function* rootSaga() {
    yield all([
        watchFetchLoginSaga(),
        watchFetchRecentCoursesSaga(),
        watchEnrollCourseSaga(),
        watchFetchCourseDetailSaga(),
        watchFetchLessonDetailSaga(),
        watchSaveLessonProgressSaga(),
        watchFetchCourseListSaga(),
        watchSendOtpSaga(),
        watchOtpLoginSaga(),
        watchFetchMyAchievementsSaga(),
        watchFetchNotificationsSaga(),
        watchDirtNotificationSaga(),
        watchClearNotificationSaga(),
        watchFetchForgotPasswordSaga(),
        watchFetchResetPasswordSaga(),
        watchForgotPasswordMobileSaga(),
        watchResetPasswordMobileSaga(),
        watchChangePasswordSaga(),
        watchFetchMyDetailsSaga(),
        watchFetchCompletedCoursesSaga(),
    ])
}