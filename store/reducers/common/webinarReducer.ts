import * as type from '../../types';

const initialMyWebinars = {
    response: {},
    loading: false,
    error: null
}
const initialWebinarDetail = {
    response: {},
    loading: false,
    error: null
}
const initialUpcomingWebinar = {
    response: {},
    loading: false,
    error: null
}


export function myWebinarsReducer(state = initialMyWebinars, action: any) {
    switch (action.type) {
        case type.GET_MY_WEBINARS:
            return {
                ...state,
                loading: true
            }
        case type.GET_MY_WEBINARS_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.GET_MY_WEBINARS_FAILURE:
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}

export function webinarDetailReducer(state = initialWebinarDetail, action: any) {
    switch (action.type) {
        case type.GET_WEBINAR_DETAILS:
            return {
                ...state,
                loading: true
            }
        case type.GET_WEBINAR_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.GET_WEBINAR_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}

export function upcomingWebinarReducer(state = initialUpcomingWebinar, action: any) {
    switch (action.type) {
        case type.GET_UPCOMING_WEBINAR:
            return {
                ...state,
                loading: true
            }
        case type.GET_UPCOMING_WEBINAR_SUCCESS:
            console.log('action.data.data', action.data.data)
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.GET_UPCOMING_WEBINAR_FAILURE:
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}