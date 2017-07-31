import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {FormattedMessage} from 'shared/utils/IntlComponents';
import ProfileSettingsMenu from '../../profile/setting/components/ProfileSettingsMenu.component';
import SettingPanel from './components/SettingPanel.component';

export default class UserSettings extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
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
                        <SettingPanel/>
                    </div>
                </div>
            </div>
        )
    }
}

UserSettings.propTypes = {};

UserSettings.defaultProps = {};