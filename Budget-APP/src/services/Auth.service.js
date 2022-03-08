/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 03/04/18.
 */

import { postRequest, formDataRequest } from '../util/AxiosService.util';

export async function serviceVersionCheck(params) {
    return await postRequest('versioncheck', params,{});
}
export async function serviceLogout(params) {
    return await postRequest('logout', params,{});
}
export async function serviceLogin(params) {
    return await postRequest('login', params,{});
}

export async function serviceSignup(params) {
    return await postRequest('signup', params,{});
}

export async function serviceIsUser(params) {
    return await postRequest('isuser', params,{});
}

export async function CaptureInfoService(params) {
    return await postRequest('captureinfo', params,{});
}

export async function serviceForgotPassword(params) {
    return await postRequest('forgotpassword', params,{});
}

export async function serviceSocialLogin(params) {
    return await postRequest('sociallogin', params,{});
}

export async function serviceUserProfile() {
    //export async function serviceUserProfile(params){
   // return await postRequest('profile', params)
    return await postRequest('profile', {},{});
}

export async function serviceUpdateProfile(params) {
    return await formDataRequest('updateprofile', params);
}

export async function serviceChangePassword(params) {
    return await postRequest('changepassword', params,{});
}

export async function serviceGetTNC(params) {
    return await postRequest('gettc', params,{});
}

export async function serviceContact(params) {
    return await postRequest('contact', params,{});
}

export async function serviceNotificationStatus(params) {
    return await postRequest('notification/status', params,{});
}

export async function serviceNotificationStatusUpdate(params) {
    return await postRequest('notification/status/update', params,{});
}
