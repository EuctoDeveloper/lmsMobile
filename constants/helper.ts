import * as SecureStore from 'expo-secure-store';

export const NO_TOKEN_URL:string[]= [
    "login",
];
export const LOGIN_URL: string = "/login";

export const DATE_FORMAT: string = "DD-MM-YYYY";

export async function postLoginFn(data: any) {
    await SecureStore.setItemAsync("accessToken", data.accessToken);
    await SecureStore.setItemAsync("refreshToken", data.refreshToken);
    await SecureStore.setItemAsync("email", data.userData.email);
    await SecureStore.setItemAsync("firstName", data.userData.firstName);
    await SecureStore.setItemAsync("lastName", data.userData.lastName);
    await SecureStore.setItemAsync("role", data.userData.role);
}

export const errorMessages = {
    email: {
        required: "Email is required",
        invalid: "Email is invalid",
    },
    password: {
        required: "Password is required",
        shortLength: "Password should be atleast 8 characters long",
        noSpecial: "Password should have atleast 1 special Character",
        noUpper: "Password should have atleast 1 uppercase letter",
        noLower: "Password should have atleast 1 lowercase letter",
        noNumber: "Password should have atleast 1 number",
    },
    phone: {
        required: "Phone Number is required",
        invalid: "Phone Number is invalid",
    },
    otp: {
        required: "OTP is required",
        invalid: "OTP is invalid",
    }
}

export const getS3Key = (url: string) => {
    return url.split('/').pop();;
}

export const clear_storage = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("email");
    await SecureStore.deleteItemAsync("firstName");
    await SecureStore.deleteItemAsync("lastName");
    await SecureStore.deleteItemAsync("role");
}