import { getApi } from "../api";

export const getMyWebinarApi = (date: any)=>getApi(`/stream/webinar/myWebinars?date=${date}`);
export const getWebinarDetailApi = (id: any)=>getApi(`/stream/webinar/${id}`);
export const getUpcomingWebinarApi = ()=>getApi(`/stream/webinar/upcoming`);