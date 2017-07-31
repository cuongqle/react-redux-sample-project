import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import AgrInput from '../../../shared/components/base/AgrInput.component';
import config from '../../../config';
import {FormattedMessage} from 'shared/utils/IntlComponents';

export default class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            usernameError: null,
            passwordError: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.fbIdExists) {
            this.props.onLoginByFacebook(nextProps.facebookProfile);
        }
    }

    validateEmail() {
        let error = null;
        if (!this.username) {
            error = 'This field is mandatory.';
        } else {
            let regEx = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
            if (!regEx.test(this.username)) {
                error = 'Email is not valid.';
            }
        }
        return error;
    }

    validatePassword() {
        let error = null;
        if (!this.password) {
            error = 'This field is mandatory.';
        }
        return error;
    }

    validate(e) {
        e.preventDefault();
        this.setState({
            usernameError: this.validateEmail(),
            passwordError: this.validatePassword()
        }, this.login);
    }

    login() {
        if (!this.state.usernameError && !this.state.passwordError) {
            this.props.onLogin(this.username, this.password);
        }
    }

    onChangeField(field, value) {
        this[field] = value;
    }

    componentWillMount() {
        const {
            appId,
            _version,
            _source,
            _sourceScriptId
        } = config.fbSdk;

        window.fbAsyncInit = function() {
            FB.init({
                appId      : appId,
                xfbml      : true,
                version    : _version
            });
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = _source;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', _sourceScriptId));
    }

    getFbStatus(resp, onConnected, onDisconnected) {
        switch (resp.status) {
            case 'connected':
                onConnected(resp);
                return;
            case 'not_authorized':
                onDisconnected('not_authorized', resp);
                return;
            case 'unknown':
                onDisconnected('unknown', resp);
                return;
            default:
                onDisconnected(resp.status, resp);
                return;
        }
    }

    onLoginByFacebookAccount() {
        !!FB && FB.getLoginStatus(response => {
            this.getFbStatus(
                response,
                () => {
                    FB.api(config.fbSdk.apiMe, response => {
                        this.props.onCheckFbIdExists(response)
                    });
                },
                () => {
                    FB.login(response => {
                        this.getFbStatus(
                            response,
                            () => {
                                FB.api(config.fbSdk.apiMe, response => {
                                    this.props.onCheckFbIdExists(response)
                                });
                            },
                            (status) => {
                                console.log("fail due to ", status)
                            }
                        )
                    }, {
                        scope: config.fbSdk.scope,
                        return_scopes: true
                    })
                }
            );
        });
    }

    render() {
        return (
            <div className="box-container">
                <div className="fb" onClick={::this.onLoginByFacebookAccount}>
                    <div className="fb-btn">
                        <i className="agr-facebook" aria-hidden="true"/>
                        <span><FormattedMessage id="const.login_with_facebook"/></span>
                    </div>
                </div>
                <hr/>
                <form onSubmit={::this.validate}>
                    <div className="input-container">
                        <AgrInput className="email-box"
                                  label="USERNAME"
                                  formItem="username"
                                  iconclass="agr-mail"
                                  inputclass="email"
                                  type="email"
                                  changeField={::this.onChangeField}
                                  placeholder="USERNAME"
                                  error={this.state.usernameError}/>
                        <AgrInput className="password-box"
                                  label="PASSWORD"
                                  formItem="password"
                                  iconclass="agr-lock"
                                  inputclass="email"
                                  type="password"
                                  placeholder="PASSWORD"
                                  changeField={::this.onChangeField}
                                  error={this.state.passwordError}/>

                        {this.props.errorMessage?<div className="has-error">{this.props.errorMessage}</div>:''}
                        <div className="forgot-pw">
                            <span className="pointer" onClick={() => browserHistory.push(process.env.PUBLIC_PATH + 'forgot-password')}>
                                <FormattedMessage id="const.forgot_password"/>
                            </span>
                        </div>
                    </div>
                    <input type="submit" className="btn log-me-in center-middle with-animate" value="LOG ME IN"/>
                </form>
            </div>
        )
    }
}