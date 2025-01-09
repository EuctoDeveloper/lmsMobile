import * as type from '../../types';

export function getRecentCourses() {
    return {
        type: type.GET_RECENT_COURSES,
    }
}

export function enrollCourse(id: any) {
    return {
        type: type.ENROLL_COURSE,
        payload: id
    }
}

export function getCourseDetail(id: any) {
    return {
        type: type.GET_COURSE_DETAILS,
        payload: id
    }
}

export function resetCourseDetail() {
    return {
        type: type.RESET_COURSE_DETAILS,
    }
}

export function getLesson(id: any) {
    return {
        type: type.GET_LESSON_DETAILS,
        payload: id
    }
}

export function saveLessonProgress(lessonId: any, progress: any) {
    return {
        type: type.SAVE_LESSON_PROGRESS,
        payload: { lessonId, progress }
    }
}

export function resetLessonProgress() {
    return {
        type: type.RESET_SAVE_LESSON_PROGRESS,
        payload: { lessonId: null, progress: null }
    }
}

export function getCourseList() {
    return {
        type: type.GET_COURSE_LIST,
    }
}

export function getMyAchievements() {
    return {
        type: type.GET_MY_ACHIEVEMENTS,
    }
}

export function getNotifications() {
    return {
        type: type.FETCH_NOTIFICATIONS,
    }
}

export function dirtNotification() {
    return {
        type: type.DIRT_NOTIFICATION,
    }
}

export function clearNotification(id: any) {
    return {
        type: type.CLEAR_NOTIFICATION,
        payload: id
    }
}

export function enableAutoNavigate() {
    return {
        type: type.ENABLE_AUTO_NAVIGATE,
    }
}

export function disableAutoNavigate() {
    return {
        type: type.DISABLE_AUTO_NAVIGATE,
    }
}

export function getCompletedCourses() {
    return {
        type: type.GET_COMPLETED_COURSES,
    }
}