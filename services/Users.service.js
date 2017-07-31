import 'whatwg-fetch';
import config from 'config';
import {
    baseUrls,
    checkStatus,
    getOptions,
    postOptions,
    putOptions,
    getDefaultLocale
} from './Utils';
import {
    authDomain,
    AUTH_SUCCESS,
    AUTH_ERROR,
    GUEST_AUTH_SUCCESS,
    GUEST_AUTH_ERROR,
    AUTH_POPUP_SUCCESS,
    AUTH_POPUP_ERROR,
    SEND_FORGOT_PASSWORD_SUCCESS,
    SEND_FORGOT_PASSWORD_ERROR,
    FETCH_CREDENTIALS_SUCCESS,
    FETCH_CREDENTIALS_ERROR,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,
    CREATE_USER_POPUP_SUCCESS,
    CREATE_USER_POPUP_ERROR,
    VERIFY_EMAIL_SUCCESS,
    VERIFY_EMAIL_ERROR,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_ERROR
} from '../app/auth/Login.reducer';

import {
    userDomain,
    CHECK_USER_BY_USERNAME_SUCCESS,
    CHECK_USER_BY_USERNAME_ERROR,
    CHECK_USER_BY_EMAIL_SUCCESS,
    CHECK_USER_BY_EMAIL_ERROR,
    FETCH_MY_PROFILE_DETAILS_SUCCESS,
    FETCH_MY_PROFILE_DETAILS_ERROR,
    FETCH_MY_COMPACT_PROFILE_SUCCESS,
    FETCH_MY_COMPACT_PROFILE_ERROR,
    FETCH_USER_PROFILE_DETAILS_SUCCESS,
    FETCH_USER_PROFILE_DETAILS_ERROR,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_ERROR,
    FETCH_USER_FOLLOWER_SUCCESS,
    FETCH_USER_FOLLOWER_ERROR,
    FETCH_MY_FOLLOWER_SUCCESS,
    FETCH_MY_FOLLOWER_ERROR,
    FETCH_USER_FOLLOWS_SUCCESS,
    FETCH_USER_FOLLOWS_ERROR,
    FETCH_MY_FOLLOWS_SUCCESS,
    FETCH_MY_FOLLOWS_ERROR,
    GET_RELATIONSHIP_SUCCESS,
    GET_RELATIONSHIP_ERROR,
    SET_RELATIONSHIP_SUCCESS,
    SET_RELATIONSHIP_ERROR,
    RESET_FOLLOWERS_FOLLOWS,
    RESET_FORGOTTEN_PASSWORD_SUCCESS,
    RESET_FORGOTTEN_PASSWORD_ERROR
} from '../app/users/User.reducer';

function authCheckStatus(response, onSuccess, onError) {
    return (dispatch) => {
        return response.json().then(data => {
            if (data.accessToken) {
                dispatch(onSuccess(data));
            } else {
                dispatch(onError(data));
            }
        });
    }
}

function guestAuthCheckStatus(response, onSuccess, onError) {
    return (dispatch) => {
        return response.json().then(data => {
            if (data.token) {
                dispatch(onSuccess(data));
            } else {
                dispatch(onError(data));
            }
        });
    }
}

function checkUserNameExistStatus(response, onSuccess, onError) {
    return (dispatch) => {
        return response.json().then(json => {
            if (json.data) {
                dispatch(onSuccess(json.data));
            } else {
                dispatch(onError(json));
            }
        });
    }
}

function checkEmailExistStatus(response, onSuccess, onError) {
    return (dispatch) => {
        switch (response.status) {
            case 200:
                return response.json().then(json => {
                    if (json.data) {
                        dispatch(onSuccess(json.data));
                    } else {
                        dispatch(onError());
                    }
                });
            case 500:
                return dispatch(onError());
        }
    }
}

function checkCreateUserStatus(response, onSuccess, onError) {
    return (dispatch) => {
        response.json().then(json => {
            if (json.data && json.data.accessToken) {
                dispatch(onSuccess(json.data));
            } else {
                dispatch(onError(json));
            }
        });
    }
}

function verifyEmailStatus(response, onSuccess, onError) {
    return (dispatch) => {
        response.json().then(json => {
            if (json.data && json.data.success) {
                dispatch(onSuccess(json));
            } else {
                dispatch(onError(json));
            }
        });
    }
}

function getMyCompactProfileStatus(response, onSuccess, onError, token) {
    var resp = response.json();
    switch (response.status) {
        case 200:
            return resp.then(onSuccess);
        case 403:
            return refreshToken(token);
        default:
            return resp.then(onError);
    }
}

function authSuccess(payload) {
    return {
        type: AUTH_SUCCESS,
        domain: authDomain,
        token: payload.accessToken,
        refreshToken: payload.refreshToken
    }
}

function authError(error) {
    return {
        type: AUTH_ERROR,
        domain: authDomain,
        errorMessage: error.errorMessage ? error.errorMessage : 'Invalid username or password. Please try again!'
    }
}

function refreshTokenSuccess(payload) {
    return {
        type: REFRESH_TOKEN_SUCCESS,
        domain: authDomain,
        token: payload.token
    }
}

function refreshTokenError(error) {
    return {
        type: REFRESH_TOKEN_ERROR,
        domain: authDomain,
        errorMessage: error
    }
}

function guestAuthSuccess(payload) {
    return {
        type: GUEST_AUTH_SUCCESS,
        domain: authDomain,
        token: payload.token
    }
}

function guestAuthError(error) {
    return {
        type: GUEST_AUTH_ERROR,
        domain: authDomain
    }
}

function authPopupSuccess(payload) {
    return {
        type: AUTH_POPUP_SUCCESS,
        domain: authDomain,
        token: payload.accessToken
    }
}

function authPopupError(error) {
    return {
        type: AUTH_POPUP_ERROR,
        domain: authDomain,
        errorMessage: error.errorMessage ? error.errorMessage : 'Invalid username or password. Please try again!'
    }
}

function createUserSuccess(payload) {
    return {
        type: CREATE_USER_SUCCESS,
        domain: authDomain,
        token: payload.accessToken
    }
}

function createUserError(error) {
    return {
        type: CREATE_USER_ERROR,
        domain: authDomain,
        errorMessage: error.errorMessage
    };
}

function createUserByPopupSuccess(payload) {
    return {
        type: CREATE_USER_POPUP_SUCCESS,
        domain: authDomain,
        token: payload.accessToken
    }
}

function createUserByPopupError(error) {
    return {
        type: CREATE_USER_POPUP_ERROR,
        domain: authDomain,
        error
    };
}

function fetchCredentialsSuccess(payload) {
    return {
        type: FETCH_CREDENTIALS_SUCCESS,
        domain: authDomain,
        credentials: payload
    }
}

function fetchCredentialsError(error) {
    return {
        type: FETCH_CREDENTIALS_ERROR,
        domain: authDomain,
        error
    };
}

function checkUserByUserNameSuccess(resp) {
    return {
        type: CHECK_USER_BY_USERNAME_SUCCESS,
        domain: userDomain,
        exists: resp.exists
    }
}

function checkUserByUserNameError(exists) {
    return {
        type: CHECK_USER_BY_USERNAME_ERROR,
        domain: userDomain
    };
}

function checkUserByEmailSuccess(resp) {
    return {
        type: CHECK_USER_BY_EMAIL_SUCCESS,
        domain: userDomain,
        exists: resp.exists
    }
}

function checkUserByEmailError(error) {
    return {
        type: CHECK_USER_BY_EMAIL_ERROR,
        domain: userDomain,
        error
    };
}

function getMyProfileDetailsSuccess(resp) {
    return {
        type: FETCH_MY_PROFILE_DETAILS_SUCCESS,
        domain: userDomain,
        data: resp.data
    }
}

function getMyProfileDetailsError(error) {
    return {
        type: FETCH_MY_PROFILE_DETAILS_ERROR,
        domain: userDomain,
        error
    }
}

function getMyCompactProfileSuccess(resp) {
    return {
        type: FETCH_MY_COMPACT_PROFILE_SUCCESS,
        domain: userDomain,
        data: resp.data
    }
}

function getMyCompactProfileError(error) {
    return {
        type: FETCH_MY_COMPACT_PROFILE_ERROR,
        domain: userDomain,
        error
    }
}

function getUserProfileDetailsSuccess(resp) {
    return {
        type: FETCH_USER_PROFILE_DETAILS_SUCCESS,
        domain: userDomain,
        data: resp.data
    }
}

function getUserProfileDetailsError(error) {
    return {
        type: FETCH_USER_PROFILE_DETAILS_ERROR,
        domain: userDomain,
        error
    }
}

function updateUserProfileSuccess(resp) {
    return {
        type: UPDATE_USER_PROFILE_SUCCESS,
        domain: userDomain,
        data: resp.data
    }
}

function updateUserProfileError(error) {
    return {
        type: UPDATE_USER_PROFILE_ERROR,
        domain: userDomain,
        error
    };
}

function fetchUserFollowerSuccess(resp) {
    return {
        type: FETCH_USER_FOLLOWER_SUCCESS,
        domain: userDomain,
        followers: resp.data
    }
}

function fetchUserFollowerError(error) {
    return {
        type: FETCH_USER_FOLLOWER_ERROR,
        domain: userDomain,
        error
    }
}

function fetchMyFollowerSuccess(resp) {
    return {
        type: FETCH_MY_FOLLOWER_SUCCESS,
        domain: userDomain,
        followers: resp.data
    }
}

function fetchMyFollowerError(error) {
    return {
        type: FETCH_MY_FOLLOWER_ERROR,
        domain: userDomain,
        error
    }
}


function fetchMyFollowsSuccess(resp) {
    return {
        type: FETCH_MY_FOLLOWS_SUCCESS,
        domain: userDomain,
        follows: resp.data
    }
}

function fetchMyFollowsError(error) {
    return {
        type: FETCH_MY_FOLLOWS_ERROR,
        domain: userDomain,
        error
    }
}

function fetchUserFollowsSuccess(resp) {
    return {
        type: FETCH_USER_FOLLOWS_SUCCESS,
        domain: userDomain,
        follows: resp.data
    }
}

function fetchUserFollowsError(error) {
    return {
        type: FETCH_USER_FOLLOWS_ERROR,
        domain: userDomain,
        error
    }
}

function sendForgotPasswordSuccess(resp) {
    return {
        type: SEND_FORGOT_PASSWORD_SUCCESS,
        domain: authDomain,
        token: resp.data
    }
}

function sendForgotPasswordError(error) {
    return {
        type: SEND_FORGOT_PASSWORD_ERROR,
        domain: authDomain,
        error
    }
}

function setRelationshipSuccess(resp) {
    return {
        type: SET_RELATIONSHIP_SUCCESS,
        domain: userDomain,
        data: resp.data
    }
}

function setRelationshipError(error) {
    return {
        type: SET_RELATIONSHIP_ERROR,
        domain: userDomain,
        error
    }
}

function getRelationshipSuccess(resp) {
    return {
        type: GET_RELATIONSHIP_SUCCESS,
        domain: userDomain,
        data: resp.data
    }
}

function getRelationshipError(error) {
    return {
        type: GET_RELATIONSHIP_ERROR,
        domain: userDomain,
        error
    }
}

function verifyEmailSuccess(resp) {
    return {
        type: VERIFY_EMAIL_SUCCESS,
        domain: authDomain,
        data: resp.data
    }
}

function verifyEmailError(error) {
    return {
        type: VERIFY_EMAIL_ERROR,
        domain: authDomain,
        error
    }
}

export function clearFollowersFollows(error) {
    return {
        type: RESET_FOLLOWERS_FOLLOWS,
        domain: userDomain
    }
}

function resetForgottenPasswordSuccess(resp) {
    return {
        type: RESET_FORGOTTEN_PASSWORD_SUCCESS,
        domain: userDomain,
        data: resp.data
    }
}

function resetForgottenPasswordError(error) {
    return {
        type: RESET_FORGOTTEN_PASSWORD_ERROR,
        domain: userDomain,
        errorMessage: error.errorMessage
    }
}

function refreshToken(token) {
    return fetch(config.api.url + baseUrls.auth + '/auth/refresh-token', postOptions({grantType: 'refresh_token'}, token))
        .then(data => checkStatus(data, refreshTokenSuccess, refreshTokenError));
}

export function userLogin(email, password) {
    return (dispatch) => {
        return fetch(config.api.url + baseUrls.auth + '/auth/login', postOptions({email: email, password: password}))
            .then(data => dispatch(authCheckStatus(data, authSuccess, authError)));
    }
}

export function guestLogin() {
    return (dispatch) => {
        return fetch(config.api.url + baseUrls.auth + '/auth/guest-token', postOptions({grantType: 'guest'}))
            .then(data => dispatch(guestAuthCheckStatus(data, guestAuthSuccess, guestAuthError)));
    }
}

export function getCredentials(token) {
    return fetch(config.api.url + baseUrls.auth + '/auth/identity', getOptions(token))
        .then(data => checkStatus(data, fetchCredentialsSuccess, fetchCredentialsError));
}

export function userLoginByPopup(email, password) {
    return (dispatch) => {
        return fetch(config.api.url + baseUrls.auth + '/auth/login', postOptions({email: email, password: password}))
            .then(data => dispatch(authCheckStatus(data, authPopupSuccess, authPopupError)));
    }
}

export function createUser(username, email, password) {
    return (dispatch) => {
        return fetch(config.api.url + baseUrls.auth + '/auth/signup', postOptions({
            username: username,
            email: email,
            password: password,
            locale: getDefaultLocale()
        })).then(data => dispatch(checkCreateUserStatus(data, createUserSuccess, createUserError)))
    }
}

export function sendForgotPassword(token, email) {
    return fetch(config.api.url + baseUrls.auth + '/auth/password/forgot', postOptions({email: email}, token))
        .then(data => checkStatus(data, sendForgotPasswordSuccess, sendForgotPasswordError));
}

export function createUserByPopup(username, email, password) {
    return (dispatch) => {
        return fetch(config.api.url + baseUrls.auth + '/auth/signup', postOptions({
            username: username,
            email: email,
            password: password,
            locale: getDefaultLocale()
        }))
        .then(data => dispatch(checkCreateUserStatus(data, createUserByPopupSuccess, createUserByPopupError)))
    }
}

export function checkUserByUserName(username) {
    return (dispatch) => {
        return fetch(config.api.url + baseUrls.auth + '/auth/username/check', postOptions({username: username}))
            .then(data => dispatch(checkUserNameExistStatus(data, checkUserByUserNameSuccess, checkUserByUserNameError)))
    }
}

export function checkUserByEmail(email) {
    return (dispatch) => {
        return fetch(config.api.url + baseUrls.auth + '/auth/email/check', postOptions({email: email}))
            .then(data => dispatch(checkEmailExistStatus(data, checkUserByEmailSuccess, checkUserByEmailError)))
    }
}

export function verifyEmail(token) {
    return (dispatch) => {
        return fetch(config.api.url + baseUrls.auth + '/auth/email/verify', postOptions({token: token}))
            .then(data => dispatch(verifyEmailStatus(data, verifyEmailSuccess, verifyEmailError)))
    }
}

export function getMyProfileDetails(token) {
    return fetch(config.api.url + baseUrls.accounts + '/users/me/profile', getOptions(token))
        .then(data => checkStatus(data, getMyProfileDetailsSuccess, getMyProfileDetailsError));
}

export function getMyCompactProfile(token, refreshToken) {
    return fetch(config.api.url + baseUrls.accounts + '/users/me/profile/short', getOptions(token))
        .then(response => getMyCompactProfileStatus(response, getMyCompactProfileSuccess, getMyCompactProfileError, refreshToken));
}

export function getUserProfileDetails(token, userId) {
    return fetch(config.api.url + baseUrls.accounts + '/users/' + userId + '/profile', getOptions(token))
        .then(data => checkStatus(data, getUserProfileDetailsSuccess, getUserProfileDetailsError));
}

export function updateUserProfile(details, token) {
    return fetch(config.api.url + baseUrls.accounts + '/users/me/profile', putOptions(details, token))
        .then(data => checkStatus(data, updateUserProfileSuccess, updateUserProfileError));
}

export function getUserFollower(token, userId) {
    return fetch(config.api.url + baseUrls.accounts + '/users/' + userId + '/followed-by', getOptions(token))
        .then(data => checkStatus(data, fetchUserFollowerSuccess, fetchUserFollowerError));
}

export function getMyFollower(token) {
    return fetch(config.api.url + baseUrls.accounts + '/users/me/followed-by', getOptions(token))
        .then(data => checkStatus(data, fetchMyFollowerSuccess, fetchMyFollowerError));
}

export function getMyFollows(token) {
    return fetch(config.api.url + baseUrls.accounts + '/users/me/follows', getOptions(token))
        .then(data => checkStatus(data, fetchMyFollowsSuccess, fetchMyFollowsError));
}

export function getUserFollows(token, userId) {
    return fetch(config.api.url + baseUrls.accounts + '/users/' + userId + '/follows', getOptions(token))
        .then(data => checkStatus(data, fetchUserFollowsSuccess, fetchUserFollowsError));
}

export function setFollowRelationship(token, userId) {
    return fetch(config.api.url + baseUrls.accounts + '/users/' + userId + '/relationship', postOptions({'action': 'follow'}, token))
        .then(data => checkStatus(data, setRelationshipSuccess, setRelationshipError));
}

export function setUnfollowRelationship(token, userId) {
    return fetch(config.api.url + baseUrls.accounts + '/users/' + userId + '/relationship', postOptions({'action': 'unfollow'}, token))
        .then(data => checkStatus(data, setRelationshipSuccess, setRelationshipError));
}

export function getRelationship(token, userId) {
    return fetch(config.api.url + baseUrls.accounts + '/users/' + userId + '/relationship', getOptions(token))
        .then(data => checkStatus(data, getRelationshipSuccess, getRelationshipError));
}

export function resetForgottenPassword(token, password) {
    let body = {
        newPassword: password,
        token: token
    }
    return fetch(config.api.url + baseUrls.auth + '/auth/password/reset', postOptions(body, token))
        .then(data => checkStatus(data, resetForgottenPasswordSuccess, resetForgottenPasswordError));
}