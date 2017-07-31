import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProfileSettingsMenu from './components/ProfileSettingsMenu.component';
import ProfileSettingsDetails from './components/ProfileSettingsDetails.component';
import {ProfileSettingsPropsBindings, ProfileSettingsDispatchBindings} from './ProfileSettings.bindings';

@connect(ProfileSettingsPropsBindings,ProfileSettingsDispatchBindings)
export default class ProfileSettings extends Component {
    update(profile) {
        this.props.updateProfile(profile, this.props.token);
    }

    render() {
        return (
            <div id="profile-settings" className="font-avenir setting-feature">
                <div className="background-cover"></div>
                <div className="header-title">Settings</div>
                <div className="settings-container">
                    <div className="side-bar inline-block">
                        <ProfileSettingsMenu/>
                    </div>
                    <div className="main-content inline-block">
                        <ProfileSettingsDetails initialValues={this.props.profile} updateProfile={::this.update} />
                    </div>
                </div>
            </div>
        )
    }
}