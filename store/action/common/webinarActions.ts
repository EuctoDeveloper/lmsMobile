import * as type from '../../types';

export function getWebinarList(date: any) {
    console.log('date', date)
    return {
        type: type.GET_MY_WEBINARS,
        payload: date
    }
}

export function getWebinarDetail(id: any) {
    return {
        type: type.GET_WEBINAR_DETAILS,
        payload: id
    }
}

export function getUpcomingWebinar() {
    return {
        type: type.GET_UPCOMING_WEBINAR
    }
}