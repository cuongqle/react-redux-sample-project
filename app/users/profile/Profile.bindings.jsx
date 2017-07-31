import {
    getMyProfileDetails,
    getUserProfileDetails,
    getUserFollower,
    getMyFollower,
    getUserFollows,
    getMyFollows
} from '../../../services/Users.service';

import { createPaymentAccount, connectPlatform, charge } from '../../../services/Payment.service';

import {FETCH_MY_PROFILE_DETAILS_SUCCESS, FETCH_USER_PROFILE_DETAILS_SUCCESS} from '../User.reducer';

export function ProfilePropsBindings(state, ownProps) {
    return {
        profileDetails: state.user.profileDetails,
        token: state.auth.token,
        followers: state.user.followers,
        follows: state.user.follows
    }
}

export function ProfileDispatchBindings(dispatch, ownProps) {
    return {
        getMyProfileDetails: (token, feature) => getMyProfileDetails(token).then((result) => {
            dispatch(result);
            if (result.type === FETCH_MY_PROFILE_DETAILS_SUCCESS) {
                switch (feature) {
                    case 'followers':
                        getMyFollower(token).then(dispatch);
                        break;
                    case 'following':
                        getMyFollows(token).then(dispatch);
                        break;
                    default:
                        getMyFollower(token).then(dispatch);
                        break;

                }
            }
        }),
        getUserProfileDetails: (token, userId, feature) => getUserProfileDetails(token, userId).then((result) => {
            dispatch(result);
            if (result.type === FETCH_USER_PROFILE_DETAILS_SUCCESS) {
                switch (feature) {
                    case 'followers':
                        getUserFollower(token, userId).then(dispatch);
                        break;
                    case 'following':
                        getUserFollows(token, userId).then(dispatch);
                        break;
                    default:
                        getUserFollower(token, userId).then(dispatch);
                        break;
                }
            }
        }),
        getUserFollower: (token, userId) => getUserFollower(token, userId).then(dispatch),
        getMyFollower: (token) => getMyFollower(token).then(dispatch),
        getUserFollows: (token, userId) => getUserFollows(token, userId).then(dispatch),
        getMyFollows: (token) => getMyFollows(token).then(dispatch),
        createPaymentAccount: (userid, email, country) => createPaymentAccount(userid, email, country).then(dispatch),
        connectPlatForm: (userId) => connectPlatform(userId).then(dispatch),
        charge: (number, exp_month, exp_year, cvc, amount, user) => charge(number, exp_month, exp_year, cvc, amount, user).then(dispatch)
    }
}