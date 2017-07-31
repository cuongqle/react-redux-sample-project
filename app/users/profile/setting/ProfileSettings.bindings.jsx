import {getMyProfileDetails, getMyCompactProfile, updateUserProfile} from "../../../../services/Users.service";
import {UPDATE_USER_PROFILE_SUCCESS} from "../../User.reducer";
import Notifications from 'react-notification-system-redux';

export function ProfileSettingsPropsBindings(state, ownProps) {
    return {
        token: state.auth.token,
        profile: {
            name: state.user.profileDetails.name,
            username: state.user.profileDetails.username,
            location: state.user.profileDetails.location,
            signature: state.user.profileDetails.signature,
            bio: state.user.profileDetails.bio,
            email: state.user.profileDetails.email
        }
    }
}

export function ProfileSettingsDispatchBindings(dispatch, ownProps) {
    return {
        updateProfile: (profile, token) =>  {
            updateUserProfile(profile, token).then((result) => {
                if (result.type === UPDATE_USER_PROFILE_SUCCESS) {
                    getMyCompactProfile(token).then(dispatch);
                    getMyProfileDetails(token).then(dispatch);
                    dispatch(Notifications.info({
                        message: "Saved successfully!",
                        position: 'tc'
                    }))
                }
            });
        }
    }
}