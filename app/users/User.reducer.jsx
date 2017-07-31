import reducerFactory from 'shared/utils/ReducerFactory';

export const userDomain = 'user';

export const FETCH_MY_PROFILE_DETAILS_SUCCESS = 'FETCH_MY_PROFILE_DETAILS_SUCCESS';
export const FETCH_MY_PROFILE_DETAILS_ERROR = 'FETCH_MY_PROFILE_DETAILS_ERROR';
export const FETCH_MY_COMPACT_PROFILE_SUCCESS = 'FETCH_MY_COMPACT_PROFILE_SUCCESS';
export const FETCH_MY_COMPACT_PROFILE_ERROR = 'FETCH_MY_COMPACT_PROFILE_ERROR';
export const FETCH_USER_PROFILE_DETAILS_SUCCESS = 'FETCH_USER_PROFILE_DETAILS_SUCCESS';
export const FETCH_USER_PROFILE_DETAILS_ERROR = 'FETCH_USER_PROFILE_DETAILS_ERROR';
export const CHECK_USER_BY_USERNAME_SUCCESS = 'CHECK_USER_BY_USERNAME_SUCCESS';
export const CHECK_USER_BY_USERNAME_ERROR = 'CHECK_USER_BY_USERNAME_ERROR';
export const CHECK_USER_BY_EMAIL_SUCCESS = 'CHECK_USER_BY_EMAIL_SUCCESS';
export const CHECK_USER_BY_EMAIL_ERROR = 'CHECK_USER_BY_EMAIL_ERROR';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';
export const UPDATE_USER_PROFILE_ERROR = 'UPDATE_USER_PROFILE_ERROR';
export const FETCH_USER_FOLLOWER_SUCCESS = 'FETCH_USER_FOLLOWER_SUCCESS';
export const FETCH_USER_FOLLOWER_ERROR = 'FETCH_USER_FOLLOWER_ERROR';
export const FETCH_MY_FOLLOWER_SUCCESS = 'FETCH_MY_FOLLOWER_SUCCESS';
export const FETCH_MY_FOLLOWER_ERROR = 'FETCH_MY_FOLLOWER_ERROR';
export const FETCH_USER_FOLLOWS_SUCCESS = 'FETCH_USER_FOLLOWS_SUCCESS';
export const FETCH_USER_FOLLOWS_ERROR = 'FETCH_USER_FOLLOWS_ERROR';
export const FETCH_MY_FOLLOWS_SUCCESS = 'FETCH_MY_FOLLOWS_SUCCESS';
export const FETCH_MY_FOLLOWS_ERROR = 'FETCH_MY_FOLLOWS_ERROR';
export const GET_RELATIONSHIP_SUCCESS = 'GET_RELATIONSHIP_SUCCESS';
export const GET_RELATIONSHIP_ERROR = 'GET_RELATIONSHIP_ERROR';
export const SET_RELATIONSHIP_SUCCESS = 'SET_RELATIONSHIP_SUCCESS';
export const SET_RELATIONSHIP_ERROR = 'SET_RELATIONSHIP_ERROR';
export const RESET_FOLLOWERS_FOLLOWS = 'RESET_FOLLOWERS_FOLLOWS';
export const RESET_FORGOTTEN_PASSWORD_SUCCESS = 'RESET_FORGOTTEN_PASSWORD_SUCCESS';
export const RESET_FORGOTTEN_PASSWORD_ERROR = 'RESET_FORGOTTEN_PASSWORD_ERROR';

export const initialState = {
    errorMessage: null,
    token: null,
    relationship: {},
    compactProfile: {},
    profileDetails: {},
    followers: [],
    follows: []
};

let cases = (state, action) => {
    switch (action.type) {
        case FETCH_MY_PROFILE_DETAILS_SUCCESS:
            return {...state, errorMessage: null, profileDetails: action.data};
        case FETCH_MY_PROFILE_DETAILS_ERROR:
            return {...state, errorMessage: action.error};
        case FETCH_MY_COMPACT_PROFILE_SUCCESS:
            return {...state, errorMessage: null, compactProfile: action.data};
        case FETCH_MY_COMPACT_PROFILE_ERROR:
            return {...state, errorMessage: action.error};
        case FETCH_USER_PROFILE_DETAILS_SUCCESS:
            return {...state, profileDetails: action.data};
        case FETCH_USER_PROFILE_DETAILS_ERROR:
            return {...state, errorMessage: action.error};
        case CHECK_USER_BY_USERNAME_SUCCESS:
            return {...state, usernameExists: action.exists, errorMessage: null};
        case CHECK_USER_BY_USERNAME_ERROR:
            return {...state, usernameExists: null, errorMessage: action.errorMessage};
        case CHECK_USER_BY_EMAIL_SUCCESS:
            return {...state, emailExists: action.exists, errorMessage: null};
        case CHECK_USER_BY_EMAIL_ERROR:
            return {...state, emailExists: null, emailNotValid: true, errorMessage: action.errorMessage};
        case UPDATE_USER_PROFILE_ERROR:
            return {...state, errorMessage: action.errorMessage};
        case FETCH_USER_FOLLOWER_SUCCESS:
            return {...state, followers: action.followers};
        case FETCH_USER_FOLLOWER_ERROR:
            return {...state, errorMessage: action.errorMessage};
        case FETCH_MY_FOLLOWER_SUCCESS:
            return {...state, followers: action.followers};
        case FETCH_MY_FOLLOWER_ERROR:
            return {...state, errorMessage: action.errorMessage};
        case FETCH_USER_FOLLOWS_SUCCESS:
            return {...state, follows: action.follows};
        case FETCH_USER_FOLLOWS_ERROR:
            return {...state, errorMessage: action.errorMessage};
        case FETCH_MY_FOLLOWS_SUCCESS:
            return {...state, follows: action.follows};
        case FETCH_MY_FOLLOWS_ERROR:
            return {...state, errorMessage: action.errorMessage};
        case RESET_FOLLOWERS_FOLLOWS:
            return {...state, followers: [], follows: []};
        case GET_RELATIONSHIP_SUCCESS:
            return {...state, relationship: action.data};
        case GET_RELATIONSHIP_ERROR:
            return {...state, errorMessage: action.errorMessage};
        case RESET_FORGOTTEN_PASSWORD_SUCCESS:
            return {...state, resetPasswordSuccess: true, errorMessage: null}
        case RESET_FORGOTTEN_PASSWORD_ERROR:
            return {...state, errorMessage: action.errorMessage, resetPasswordSuccess: false}
    }
};

export default reducerFactory(initialState, userDomain, cases);