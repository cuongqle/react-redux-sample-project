import {
    userLogin,
    userLoginByPopup,
    checkUserByUserName,
    checkUserByEmail,
    sendForgotPassword,
    createUser,
    createUserByPopup,
    resetForgottenPassword
} from "../../services/Users.service";

import {
    userLoginByFacebook,
    checkUserNameExistsBeforeSignUpByFb,
    createUserByFacebook,
    checkFbIdExists,
    onCheckFbIdExistsWithFbAccountConnected
} from "../../services/FbUsers.service";

import {USER_LOGOUT, authDomain, CLEAN_ERROR_MESSAGE} from './Login.reducer';

import {CLEAN_FB_AUTH_MESSAGE, fbauthDomain} from './FacebookLogin.reducer';

import Notifications from 'react-notification-system-redux';

let cleanErrorMessage = () => ({type: CLEAN_ERROR_MESSAGE, domain: authDomain})
let cleanErrorMessageFbAuth = () => ({type: CLEAN_FB_AUTH_MESSAGE, domain: fbauthDomain})

export function AuthPropsBindings(state) {
    return {
        token: state.auth.token,
        errorMessage: state.auth.errorMessage,
        createAccountByFbErrorMessage: state.fbauth.errorMessage,
        usernameExists: state.user.usernameExists,
        emailExists: state.user.emailExists,
        emailNotValid: state.user.emailNotValid,
        facebookProfile: state.fbauth.facebookProfile,
        fbIdExists: state.fbauth.fbIdExists,
        usernameExistsBeforeSignUpByFb: state.fbauth.usernameExistsBeforeSignUpByFb,
        resetPasswordSuccess: state.user.resetPasswordSuccess
    }
}

export function AuthDispatchBindings(dispatch, ownProps) {
    return {
        onLogin: (username, password) => dispatch(userLogin(username, password)),
        onLogout: () => dispatch({type: USER_LOGOUT, domain: authDomain}),
        onCheckUserName: (username) => dispatch(checkUserByUserName(username)),
        onCheckEmail: (email) => dispatch(checkUserByEmail(email)),
        sendForgotPassword: (token, email) => sendForgotPassword(token, email).then(dispatch),
        onSignup: (username, email, password) => dispatch(createUser(username, email, password)),
        onSignupByFacebook: (username, email, facebookId) => dispatch(createUserByFacebook(username, email, facebookId)),
        onSignupByPopup: (username, email, password) => dispatch(createUserByPopup(username, email, password)),
        onLoginByPopup: (username, password) => dispatch(userLoginByPopup(username, password)),
        onConnectFacebookSuccess: () => dispatch(
            dispatch(Notifications.info({
                message: "Your facebook account had been connected successfully!",
                position: 'tc'
            }))
        ),
        cleanErrorMessage: () => dispatch(cleanErrorMessage()),
        onCheckFbIdExists: (info) => dispatch(checkFbIdExists(info)),

        onLoginByFacebook: (info) => dispatch(userLoginByFacebook(info)),
        checkUserNameExistsBeforeSignUpByFb: (username) => dispatch(checkUserNameExistsBeforeSignUpByFb(username)),
        cleanErrorMessageFbAuth: () => dispatch(cleanErrorMessageFbAuth()),
        onResetForgottenPassword: (token, password) => resetForgottenPassword(token, password).then(dispatch)
    }
}