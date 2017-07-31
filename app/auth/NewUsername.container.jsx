import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {AuthPropsBindings, AuthDispatchBindings} from "./Auth.bindings";
import AgrInput from '../../shared/components/base/AgrInput.component';
import config from 'config';

@connect(AuthPropsBindings, AuthDispatchBindings)
export default class NewUsername extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null
        };
        try {
            this.facebookId = atob(props.location.query.id);
        } catch (e) {
            this.facebookId = null
        }
    }

    componentWillMount() {
        const {
            appId,
            _version,
            _source,
            _sourceScriptId
        } = config.fbSdk;

        window.fbAsyncInit = function () {
            FB.init({
                appId: appId,
                xfbml: true,
                version: _version
            });
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = _source;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', _sourceScriptId));
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.usernameExistsBeforeSignUpByFb === false) {
            console.log('check success');
            this.signUp();
        }

        if (nextProps.usernameExistsBeforeSignUpByFb === true) {
            this.setState({
                errorMessage: 'Username have already exists!'
            });
        }

        if (nextProps.createAccountByFbErrorMessage)
            this.setState({
                errorMessage: nextProps.createAccountByFbErrorMessage
            });
    }

    componentWillUnmount() {
        this.props.cleanErrorMessageFbAuth();
    }

    onChangeField(field, value) {
        this[field] = value;
    }

    validateUsername() {
        let error = null;
        if (typeof this.username == "undefined" || !this.username.trim()) {
            error = 'This field is empty.';
        }
        return error;
    }

    validate() {
        this.setState({
            errorMessage: this.validateUsername()
        }, this.checkUserNameExists)
    }

    checkUserNameExists() {
        this.props.checkUserNameExistsBeforeSignUpByFb(this.username);
    }

    signUp() {
        const {
            id,
            email
        } = this.props.facebookProfile || {};

        if (this.username && id && email) {
            this.props.onSignupByFacebook(this.username, email, id)
        }
    }

    render() {

        return (<div id="auth" className="backdrop-grey">
            <div className="main-container">
                <div className="body">
                    <div className="block-logo-title">
                        <div className="logo-small pointer"
                             onClick={() => browserHistory.push(process.env.PUBLIC_PATH)}></div>
                    </div>
                    <div className="auth-box">
                        <div className="box-container">
                            <div className="title-content">
                                <div className="new-user-slogan">Welcome to AGORA! Choose a Username</div>
                            </div>
                            <div id="new-username" className="input-container">
                                <AgrInput className="username-box"
                                          label="CHOOSE A USERNAME"
                                          formItem="username"
                                          iconclass="agr-user"
                                          inputclass="email"
                                          type="text"
                                          changeField={::this.onChangeField}
                                          placeholder="USERNAME"
                                          error={this.state.errorMessage}/>
                            </div>
                            <div className="btn log-me-in new-username center-middle with-animate" onClick={::this.validate}>SIGN ME
                                UP
                            </div>
                        </div>
                    </div>
                    <div className="logo-big pointer"
                         onClick={(e) => browserHistory.push(process.env.PUBLIC_PATH)}></div>
                </div>
            </div>
        </div>)
    }
}

NewUsername.propTypes = {};

NewUsername.defaultProps = {};