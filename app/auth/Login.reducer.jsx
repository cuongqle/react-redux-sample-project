import reducerFactory from 'shared/utils/ReducerFactory';

export const authDomain = 'auth';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const GUEST_AUTH_SUCCESS = 'GUEST_AUTH_SUCCESS';
export const GUEST_AUTH_ERROR = 'GUEST_AUTH_ERROR';
export const AUTH_POPUP_SUCCESS = 'AUTH_POPUP_SUCCESS';
export const AUTH_POPUP_ERROR = 'AUTH_POPUP_ERROR';
export const SEND_FORGOT_PASSWORD_SUCCESS = 'SEND_FORGOT_PASSWORD_SUCCESS';
export const SEND_FORGOT_PASSWORD_ERROR = 'SEND_FORGOT_PASSWORD_ERROR';
export const USER_LOGOUT = 'USER_LOGOUT';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';
export const CREATE_USER_POPUP_SUCCESS = 'CREATE_USER_POPUP_SUCCESS';
export const CREATE_USER_POPUP_ERROR = 'CREATE_USER_POPUP_ERROR';
export const FETCH_CREDENTIALS_SUCCESS = 'FETCH_CREDENTIALS_SUCCESS';
export const FETCH_CREDENTIALS_ERROR = 'FETCH_CREDENTIALS_ERROR';
export const CLEAN_ERROR_MESSAGE = 'CLEAN_ERROR_MESSAGE';
export const VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS';
export const VERIFY_EMAIL_ERROR = 'VERIFY_EMAIL_ERROR';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_ERROR = 'REFRESH_TOKEN_ERROR';

export const initialState = {
    errorMessage: null
};

let cases = (state, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, token: action.token, refreshToken: action.refreshToken, errorMessage: null};
        case AUTH_ERROR:
            return {...state, errorMessage: action.errorMessage};
        case GUEST_AUTH_SUCCESS:
            return {...state, guest_token: action.token, errorMessage: null};
        case GUEST_AUTH_ERROR:
            return {...state, errorMessage: action.errorMessage};
        case AUTH_POPUP_SUCCESS:
            return {...state, token: action.token, refreshToken: action.refreshToken, errorMessage: null};
        case AUTH_POPUP_ERROR:
            return {...state, errorMessage: action.errorMessage};
        case CREATE_USER_SUCCESS:
            return {...state, token: action.token, errorMessage: null};
        case CREATE_USER_ERROR:
            return {...state, errorMessage: action.errorMessage};
        case CREATE_USER_POPUP_SUCCESS:
            return {...state, token: action.token, errorMessage: null};
        case CREATE_USER_POPUP_ERROR:
            return {...state, errorMessage: action.errorMessage};
        case USER_LOGOUT:
            return {...state, token: null};
        case FETCH_CREDENTIALS_SUCCESS:
            return {...state, credentials: action.credentials};
        case FETCH_CREDENTIALS_ERROR:
            return {...state, errorMessage: action.errorMessage};
        case CLEAN_ERROR_MESSAGE:
            return {...state, errorMessage: null};
        case REFRESH_TOKEN_SUCCESS:
            return {...state, token: action.token};
        case REFRESH_TOKEN_ERROR:
            return {...state, errorMessage: action.errorMessage};
    }
};

export default reducerFactory(initialState, authDomain, cases);
