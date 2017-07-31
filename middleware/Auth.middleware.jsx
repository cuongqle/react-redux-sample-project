import {push} from 'react-router-redux';
import {
    AUTH_SUCCESS,
    USER_LOGOUT,
    CREATE_USER_SUCCESS,
    VERIFY_EMAIL_SUCCESS,
    VERIFY_EMAIL_ERROR
} from '../app/auth/Login.reducer';

import {
    CHECK_FACEBOOK_ACCOUNT_EXISTS_SUCCESS
} from '../app/auth/FacebookLogin.reducer';

import {myCartClearAll} from '../services/Mycart.service';

export default store => next => action => {
    let nextAction = next(action);
    switch (action.type) {
        case CHECK_FACEBOOK_ACCOUNT_EXISTS_SUCCESS:
            if (!action.exists) {
                store.dispatch(push(process.env.PUBLIC_PATH + `new-user?id=${btoa(action.facebookProfile.id)}`));
            }
            break;
        case AUTH_SUCCESS:
            store.dispatch(push(process.env.PUBLIC_PATH + 'me/profile'));
            break;
        case CREATE_USER_SUCCESS:
            store.dispatch(push(process.env.PUBLIC_PATH + 'me/profile'));
            break;
        case USER_LOGOUT:
            store.dispatch(myCartClearAll());
            store.dispatch(push(process.env.PUBLIC_PATH));
            break;
        case VERIFY_EMAIL_SUCCESS:
            store.dispatch(push(process.env.PUBLIC_PATH + 'verify-email-success'));
            break;
        case VERIFY_EMAIL_ERROR:
            store.dispatch(push(process.env.PUBLIC_PATH + 'verify-email-error'));
            break;
    }
    return nextAction;
}
