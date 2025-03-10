import { combineReducers } from "redux";
import { changePasswordReducer, fetchMyDetailsReducer, forgotPasswordMobileReducer, forgotPasswordReducer, loginReducer, otpLoginReducer, resetPasswordMobileReducer, resetPasswordReducer, sendOtpReducer, userReducer } from "./common/authReducer";
import { autoNavigateReducer, clearNotificationsReducer, courseDetailReducer, courseListReducer, dirtNotificationsReducer, enrollCourseReducer, fetchCompletedCoursesReducer, fetchMyAchievementsReducer, fetchNotificationsReducer, lessonDetailReducer, recentCoursesReducer, saveLessonProgressReducer } from "./common/courseReducer";
import { myWebinarsReducer, upcomingWebinarReducer, webinarDetailReducer } from "./common/webinarReducer";
// import posts from "./postReducer";

// import posts from "./postReducer";

const rootReducer = combineReducers({
    login: loginReducer,
    user: userReducer,
    recentCourses: recentCoursesReducer,
    enrollCourse: enrollCourseReducer,
    courseDetail: courseDetailReducer,
    lessonDetail: lessonDetailReducer,
    saveLessonProgress: saveLessonProgressReducer,
    courseList:  courseListReducer,
    sendOtp: sendOtpReducer,
    otpLogin: otpLoginReducer,
    myAchievements: fetchMyAchievementsReducer,
    notifications: fetchNotificationsReducer,
    dirtNotifications: dirtNotificationsReducer,
    clearNotifications: clearNotificationsReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    forgotPasswordMobile : forgotPasswordMobileReducer,
    resetPasswordMobile : resetPasswordMobileReducer,
    changePassword: changePasswordReducer,
    me: fetchMyDetailsReducer,
    autoNavigate: autoNavigateReducer,
    completedCourses: fetchCompletedCoursesReducer,
    myWebinars: myWebinarsReducer,
    webinarDetail: webinarDetailReducer,
    upcomingWebinar: upcomingWebinarReducer,
});


export default rootReducer;
