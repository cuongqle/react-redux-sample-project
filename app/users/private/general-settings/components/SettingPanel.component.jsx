import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {FormattedMessage} from 'shared/utils/IntlComponents';
import AgrSelectBox from 'shared/components/base/AgrSelectBox.component';
import AgrCheckbox from 'shared/components/base/AgrCheckbox.component';
import {reduxForm} from 'redux-form';
import InputWrapper from 'shared/utils/InputWrapper';

const generalSettingInfo = {
    locale: "en",
    unit: "Inches",
    notifications: ["nominated", "win", "interest", "relevant"]
};

@reduxForm({
    form: 'user-settings',
    fields: ['email', 'password', 'confirmPassword', 'nominated', 'win', 'interest', 'relevant', 'language', 'unit']
})
export default class SettingPanel extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isSaving: false,
            editEmail: true,
            editPassword: true,
            resetForm: false
        };
    }

    componentWillMount() {
        this.props.initializeForm({
            email: "asd!!@yahoo.net",
            password: "t@0eob!t",
            nominated: true,
            win: true,
            interest: true,
            relevant: true,
            language: "English US",
            unit: "Inches"
        });
    }

    onSocialConnect(connectWith) {
        switch (connectWith) {
            case "facebook":
                break;
            case "google-plus":
                break;
            case "linkedin":
                break;
            case "twitter":
                break;
            case "instagram":
                break;
        }
    }

    toggleEditEmail() {
        this.setState({
            editEmail: !this.state.editEmail
        });
    }

    toggleEditPassword() {
        this.setState({
            editPassword: !this.state.editPassword
        });
    }

    onDeleteAccount() {
        // display confirm popup
    }

    onSubmit(e) {
        console.log(e);
    }

    render() {
        const {
            fields: {email, password, confirmPassword, nominated, win, interest, relevant, language, unit},
            handleSubmit,
            resetForm,
            submitting
        } = this.props;

        return (
            <div className="user-settings">
                <div className="setup social-connect">
                    <div className="header"><FormattedMessage id="const.CONNECT_WITH"/></div>
                    <div className="settings-container setting-row">
                        <div className="social-logo facebook" onClick={e => this.onSocialConnect("facebook")}>
                            <i className="agr-facebook"/>
                        </div>
                        <div className="social-logo google-plus" onClick={e => this.onSocialConnect("google-plus")}>
                            <i className="agr-social-google-plus"/>
                        </div>
                        <div className="social-logo linked-in" onClick={e => this.onSocialConnect("linkedin")}>
                            <i className="agr-social-linked-in"/>
                        </div>
                        <div className="social-logo twitter" onClick={e => this.onSocialConnect("twitter")}>
                            <i className="agr-twitter"/>
                        </div>
                        <div className="social-logo instagram" onClick={e => this.onSocialConnect("instagram")}>
                            <i className="agr-social-instagram"/>
                        </div>
                    </div>
                </div>
                <div className="setup notify">
                    <div className="header"><FormattedMessage id="const.NOTIFICATIONS"/></div>
                    <div className="settings-container setting-row">
                        <div className="box">
                            <div className="title"><FormattedMessage id="const.LANGUAGE"/></div>
                            <div className="select-setting">
                                <i className="agr-global"/>
                                <AgrSelectBox reduxFormProps={language} options={["English US", "Español ES"]}/>
                            </div>
                        </div>
                        <div className="box">
                            <div className="title"><FormattedMessage id="const.UNITS"/></div>
                            <div className="select-setting">
                                <i className="agr-rules"/>
                                <AgrSelectBox reduxFormProps={unit} options={["Inches", "Centimeter", "Feet"]}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="setup notify">
                    <div className="header"><FormattedMessage id="const.NOTIFICATIONS"/></div>
                    <div className="settings-container">
                        <AgrCheckbox
                            text={<FormattedMessage id="generalSettings.notify-nominated"/>}
                            reduxFormProps={nominated}
                        />
                        <AgrCheckbox
                            text={<FormattedMessage id="generalSettings.notify-win"/>}
                            reduxFormProps={win}
                        />
                        <AgrCheckbox
                            text={<FormattedMessage id="generalSettings.notify-interest"/>}
                            reduxFormProps={interest}
                        />
                        <AgrCheckbox
                            text={<FormattedMessage id="generalSettings.notify-relevant"/>}
                            reduxFormProps={relevant}
                        />
                    </div>
                </div>
                <div className="setup authentication">
                    <div className="header"><FormattedMessage id="const.AUTHENTICATION"/></div>
                    <div className="settings-container">
                        <div className="box edit-email">
                            <div className="title"><FormattedMessage id="const.EMAIL"/></div>
                            <div className="select-setting">
                                <i className="agr-mail"/>
                                <input
                                    type="email"
                                    ref={e => this.inputEmail = e}
                                    readOnly={this.state.editEmail}
                                    {...InputWrapper(email)}
                                />
                                <div className="btn-edit" onClick={e => this.toggleEditEmail(e)}><FormattedMessage id="const.EDIT_EMAIL"/></div>
                            </div>
                        </div>
                        <div className="box edit-password">
                            <div className="title"><FormattedMessage id="const.CHANGE_PASSWORD"/></div>
                            <div className="select-setting">
                                <i className="agr-lock"/>
                                <input
                                    type="password"
                                    ref={e => this.inputPassword = e}
                                    readOnly={this.state.editPassword}
                                    {...InputWrapper(password)}
                                />
                                <div className="btn-edit" onClick={e => this.toggleEditPassword(e)}><FormattedMessage id="const.CHANGE_PASSWORD"/></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user-settings-actions">
                    <div className="btn-actions btn-delete" onClick={this.onDeleteAccount}>
                        <i className="agr-trash"/>
                        <FormattedMessage id="const.DELETE_ACCOUNT"/>
                    </div>
                    <div className="user-settings-actions-right">
                        <div className={`btn-actions btn-cancel ${submitting ? 'disabled' : 'active'}`} onClick={resetForm}><FormattedMessage id="const.CANCEL"/></div>
                        <div className="btn-actions btn-save" onClick={handleSubmit(::this.onSubmit)}><FormattedMessage id="const.SAVE"/></div>
                    </div>
                </div>
            </div>
        )
    }
}

SettingPanel.propTypes = {
    generalSettings: PropTypes.object.isRequired
};

SettingPanel.defaultProps = {
    generalSettings: generalSettingInfo
};