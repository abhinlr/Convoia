import {environment} from "./environment";

export const apiConfig = {
    generateOtp: environment.apiUrl + '/generate-otp',
    login: environment.apiUrl + '/verify-otp',
    profile: environment.apiUrl + '/profile'
};