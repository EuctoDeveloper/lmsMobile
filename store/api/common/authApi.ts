import { getApi, postApi } from "../api";

export const loginApi = (data: any) => postApi(`/auth/login`, data);
export const sendOtpApi = (data: any) => postApi(`/auth/sendOtp`, data);
export const otpLoginApi = (data: any) => postApi(`/auth/otpLogin`, data);

export const forgotPasswordApi = (data: any) => postApi(`/auth/forgotPassword`, data);
export const resetPasswordApi = (data: any) => postApi(`/auth/resetPassword`, data);

export const forgotPasswordMobileApi = (data: any) => postApi(`/auth/forgotPasswordMobile`, data);
export const resetPasswordMobileApi = (data: any) => postApi(`/auth/resetPasswordMobile`, data);

export const changePasswordApi = (data: any) => postApi(`/auth/changePassword`, data);

export const getMyDetailsApi = () => getApi(`/auth/me`);