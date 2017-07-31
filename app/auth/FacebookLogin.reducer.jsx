import reducerFactory from 'shared/utils/ReducerFactory';

export const CHECK_USERNAME_EXISTS_BEFORE_SIGNUP_BY_FB_SUCCESS = 'CHECK_USERNAME_EXISTS_BEFORE_SIGNUP_BY_FB_SUCCESS';
export const CHECK_USERNAME_EXISTS_BEFORE_SIGNUP_BY_FB_ERROR = 'CHECK_USERNAME_EXISTS_BEFORE_SIGNUP_BY_FB_ERROR';
export const CHECK_FACEBOOK_ACCOUNT_EXISTS_SUCCESS = 'CHECK_FACEBOOK_ACCOUNT_EXISTS_SUCCESS';
export const CHECK_FACEBOOK_ACCOUNT_EXISTS_ERROR = 'CHECK_FACEBOOK_ACCOUNT_EXISTS_ERROR';
export const CLEAN_FB_AUTH_MESSAGE = 'CLEAN_FB_AUTH_MESSAGE';

export const fbauthDomain = 'fbauth';

export const initialState = {
    errorMessage: null,
    facebookProfile: null,
    usernameExistsBeforeSignUpByFb: null
};

let onAccountExistsSuccess = (state, exists, facebookProfile) => {
    let fbProfile = facebookProfile;
    Object.assign(fbProfile, {accessToken: FB.getAccessToken()});
    return {
        ...state,
        fbIdExists: exists,
        facebookProfile: fbProfile,
        errorMessage: null
    }
};

let cases = (state, action) => {
    switch (action.type) {
        case CHECK_USERNAME_EXISTS_BEFORE_SIGNUP_BY_FB_SUCCESS:
            return {...state, usernameExistsBeforeSignUpByFb: action.exists, errorMessage: null};
        case CHECK_USERNAME_EXISTS_BEFORE_SIGNUP_BY_FB_ERROR:
            return {...state, errorMessage: action.errorMessage};
        case CHECK_FACEBOOK_ACCOUNT_EXISTS_SUCCESS:
            return onAccountExistsSuccess(state, action.exists, action.facebookProfile);
        case CHECK_FACEBOOK_ACCOUNT_EXISTS_ERROR:
            return {...state, errorMessage: action.errorMessage, facebookProfile: {}};
        case CLEAN_FB_AUTH_MESSAGE:
            return {...state, errorMessage: null, usernameExistsBeforeSignUpByFb: null}
    }
};

export default reducerFactory(initialState, fbauthDomain, cases);