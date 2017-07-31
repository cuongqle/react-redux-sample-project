import {getMyCompactProfile} from '../../services/Users.service';

export const NavBarStateToProps = (state, props) => {
    return {
        token: state.auth.token,
        refreshToken: state.auth.refreshToken,
        compactProfile: state.user.compactProfile,
        mycart: state.mycart
    }
};

export const NavBarDispatchToPropsBinding = (dispatch, ownProps) => ({
    getCompactProfile: (token, refreshToken) => { getMyCompactProfile(token, refreshToken).then(dispatch) }
});