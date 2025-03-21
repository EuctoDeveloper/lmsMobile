
import { act } from 'react-test-renderer';
import * as type from '../../types';

const initialRecentCourses = {
    response: {},
    loading: false,
    error: null
}
const initialEnrollCourse = {
    response: {},
    loading: false,
    error: null
}
const initialCourseDetail = {
    response: {},
    loading: false,
    error: null
}
const initialLessonDetail = {
    response: {},
    loading: false,
    error: null
}
const initialSaveLessonProgress = {
    response: {},
    loading: false,
    error: null
}
const initialCourseListState = {
    response: {},
    loading: false,
    error: null
}
const initialMyAchievements = {
    response: {},
    loading: false,
    error: null
}
const initialNotifications = {
    response: {},
    loading: false,
    error: null
}
const initialDirtNotifications = {
    response: {},
    loading: false,
    error: null
}
const initialClearNotifications = { 
    response: {},
    loading: false,
    error: null
}
const initialAutoNavigate = {
    response: false,
    loading: false,
    error: null
}
const initialCompletedCourse = {
    response: {},
    loading: false,
    error: null
}



export function recentCoursesReducer(state = initialRecentCourses, action: any) {
    switch (action.type) {
        case type.GET_RECENT_COURSES:
            return {
                ...state,
                loading: true
            }
        case type.GET_RECENT_COURSES_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.GET_RECENT_COURSES_FAILURE:
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}

export function enrollCourseReducer(state = initialEnrollCourse, action: any) {
    switch (action.type) {
        case type.ENROLL_COURSE:
            return {
                ...state,
                loading: true
            }
        case type.ENROLL_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.ENROLL_COURSE_FAILURE:
            return {
                ...state,
                loading: false,
                response: action.message
            }
        case type.RESET_ENROLL_COURSE:
            return {
                ...state,
                response: {}
            }
        default:
            return state
    }
}

export function courseDetailReducer(state = initialCourseDetail, action: any) {
    switch (action.type) {
        case type.GET_COURSE_DETAILS:
            return {
                ...state,
                loading: true
            }
        case type.GET_COURSE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.GET_COURSE_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                response: action.message
            }
        case type.RESET_COURSE_DETAILS:
            return {
                ...state,
                response: {}
            }
        default:
            return state
    }
}

export function lessonDetailReducer(state = initialLessonDetail, action: any) {
    switch (action.type) {
        case type.GET_LESSON_DETAILS:
            return {
                ...state,
                loading: true
            }
        case type.GET_LESSON_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.GET_LESSON_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}

export function saveLessonProgressReducer(state = initialSaveLessonProgress, action: any) {
    switch (action.type) {
        case type.SAVE_LESSON_PROGRESS:
            return {
                ...state,
                loading: true
            }
        case type.SAVE_LESSON_PROGRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.SAVE_LESSON_PROGRESS_FAILURE:
            return {
                ...state,
                loading: false,
                response: action.message
            }
        case type.RESET_SAVE_LESSON_PROGRESS:
            return {
                ...state,
                response: {}
            }
        default:
            return state
    }
}

export function courseListReducer(state = initialCourseListState, action: any) {
    switch (action.type) {
        case type.GET_COURSE_LIST:
            return {
                ...state,
                loading: true
            }
        case type.GET_COURSE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.GET_COURSE_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}

export function fetchMyAchievementsReducer(state = initialMyAchievements, action:any) {
    switch (action.type) {
        case type.GET_MY_ACHIEVEMENTS:
            return {
                ...state,
                loading: true
            }
        case type.GET_MY_ACHIEVEMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.GET_MY_ACHIEVEMENTS_FAILURE:
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}
export function fetchNotificationsReducer(state = initialNotifications, action:any) {
    switch (action.type) {
        case type.FETCH_NOTIFICATIONS:
            return {
                ...state,
                loading: true
            }
        case type.FETCH_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.FETCH_NOTIFICATIONS_FAILURE:
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}
export function dirtNotificationsReducer(state = initialDirtNotifications, action:any) {
    switch (action.type) {
        case type.DIRT_NOTIFICATION:
            return {
                ...state,
                loading: true
            }
        case type.DIRT_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.DIRT_NOTIFICATION_FAILURE:
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}
export function clearNotificationsReducer(state = initialClearNotifications, action:any) {
    switch (action.type) {
        case type.CLEAR_NOTIFICATION:
            return {
                ...state,
                loading: true
            }
        case type.CLEAR_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.CLEAR_NOTIFICATION_FAILURE:
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}

export function autoNavigateReducer(state = initialAutoNavigate, action:any) {
    switch (action.type) {
        case type.ENABLE_AUTO_NAVIGATE:
            return {
                ...state,
                response: true
            }
        case type.DISABLE_AUTO_NAVIGATE:
            return {
                ...state,
                response: false
            }
        default:
            return state
    }
}
export const fetchCompletedCoursesReducer = (state = initialCompletedCourse, action: any) => {
    switch (action.type) {
        case type.GET_COMPLETED_COURSES:
            return {
                ...state,
                loading: true
            }
        case type.GET_COMPLETED_COURSES_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.GET_COMPLETED_COURSES_FAILURE:
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}