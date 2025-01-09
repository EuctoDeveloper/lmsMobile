import { getApi, postApi } from "../api";

export const getRecentCoursesApi = () => getApi(`/stream/listMyRecetCourses`);
export const getCourseDetailApi = (id: any) => getApi(`/stream/getCourse/${id}`);
export const enrollCourseApi = (id: any) => getApi(`/stream/enroll/${id}`);   
export const getLessonApi = (id: any) => getApi(`/stream/getLesson/${id}`);
export const saveLessonProgressApi = (lessonId: any, progress: any) => postApi(`/stream/saveLessonProgress/${lessonId}`, progress);
export const getCourseListApi = () => getApi(`/stream/listCourses`);
export const getMyAchievementsApi = () => getApi(`/stream/getMyAchievements`);
export const getNotificationsApi = () => getApi(`/stream/getMyNotification`);
export const dirtNotificationApi = () => getApi(`/stream/dirtNotification`);
export const clearNotificationApi = (id: any) => getApi(`/stream/actionNotification/${id}`);
export const getCompletedCoursesApi = () => getApi(`/stream/getCompletedCourse`);