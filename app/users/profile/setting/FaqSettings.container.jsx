import React, {Component} from 'react';
import ProfileSettingsMenu from './components/ProfileSettingsMenu.component';
import FAQ from './components/FAQ.component';

export default class FaqSettings extends Component {
    render() {
        return (
            <div id="faq-settings" className="setting-feature">
                <div className="background-cover"></div>
                <div className="header-title">Settings</div>
                <div className="settings-container">
                    <div className="side-bar inline-block">
                        <ProfileSettingsMenu/>
                    </div>
                    <div className="main-content inline-block">
                        <FAQ/>
                    </div>
                </div>
            </div>
        );
    }
}