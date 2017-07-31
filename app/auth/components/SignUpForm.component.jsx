import React, {Component} from 'react';
import AgrInput from '../../../shared/components/base/AgrInput.component';
import config from '../../../config';

export default class SignUpForm extends Component {
    constructor() {
        super();
        this.errors = {
            isRequired: 'This field is mandatory.',
            nameExist: 'Username already exists.',
            emailExist: 'Email already exists.',
            emailNotValid: 'Email is not valid.',
            passwordNotValid: 'Password must have more than 8 characters.'
        };
        this.state = {
            usernameError: null,
            emailError: null,
            passwordError: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.fbIdExists) {
            this.props.onLoginByFacebook(nextProps.facebookProfile);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (!!this.username) {
            this.updateUsernameState(nextProps, nextState);
        }
        if (!!this.email) {
            this.updateEmailState(nextProps, nextState);
        }
    }

    updateUsernameState(props, state) {
        if (props.usernameExists) {
            if (state.usernameError !== this.errors.nameExist) {
                this.setState({usernameError: this.errors.nameExist});
            }
        } else if (props.usernameExists === false) {
            if (!!state.usernameError) {
                this.setState({usernameError: null});
            }
        }
    }

    updateEmailState(props, state) {
        if (props.emailExists) {
            if (state.emailError !== this.errors.emailExist) {
                this.setState({emailError: this.errors.emailExist});
            }
        } else if (props.emailExists === false) {
            if (!!state.emailError) {
                this.setState({emailError: null});
            }
        } else if (props.emailNotValid) {
            if (state.emailError !== this.errors.emailNotValid) {
                this.setState({emailError: this.errors.emailNotValid});
            }
        }
    }

    validateUsername() {
        let error = null;
        if (!this.username) {
            error = this.errors.isRequired;
        }
        return error;
    }

    validateEmail() {
        let error = null;
        if (!this.email) {
            error = this.errors.isRequired;
        } else {
            let regEx = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
            if (!regEx.test(this.email)) {
                error = this.errors.emailNotValid;
            }
        }
        return error;
    }

    validatePassword() {
        let error = null;
        if (!this.password) {
            error = this.errors.isRequired;
        } else if (this.password.length < 8) {
            error = this.errors.passwordNotValid;
        }
        return error;
    }

    validate(e) {
        e.preventDefault();
        this.setState({
            usernameError: this.validateUsername(),
            emailError: this.validateEmail(),
            passwordError: this.validatePassword()
        }, this.signUp);
    }

    validateUnique() {
        if (!!this.username) {
            this.props.onCheckUserName(this.username);
        }
        if (!!this.email) {
            this.props.onCheckEmail(this.email);
        }
    }

    signUp() {
        this.validateUnique();
        if (!this.state.usernameError && !this.state.emailError && !this.state.passwordError) {
            this.props.onSignup(this.username, this.email, this.password);
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

    getFbStatus(resp, onConnected, onDisconnected) {
        switch (resp.status) {
            case 'connected':
                // Logged into your app and Facebook.
                onConnected(resp);
                return;
            case 'not_authorized':
                // The person is logged into Facebook, but not your app.
                onDisconnected('not_authorized', resp);
                return;
            case 'unknown':
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
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
                        <i className="agr-facebook" aria-hidden="true"></i>
                        <span>Sign Up with your Facebook account</span>
                    </div>
                </div>
                <hr/>
                <form onSubmit={::this.validate}>
                    <div id="sign-up" className="input-container">
                        <AgrInput className="username-box"
                                  label="USERNAME"
                                  formItem="username"
                                  iconclass="agr-user"
                                  inputclass="email"
                                  type="text"
                                  changeField={::this.onChangeField}
                                  placeholder="USERNAME"
                                  error={this.state.usernameError}/>
                        <AgrInput className="email-box"
                                  label="EMAIL"
                                  formItem="email"
                                  iconclass="agr-mail"
                                  inputclass="email"
                                  type="mail"
                                  placeholder="EMAIL"
                                  changeField={::this.onChangeField}
                                  error={this.state.emailError}/>
                        <AgrInput className="password-box"
                                  label="PASSWORD"
                                  formItem="password"
                                  iconclass="agr-lock"
                                  inputclass="email"
                                  type="password"
                                  placeholder="PASSWORD"
                                  changeField={::this.onChangeField}
                                  error={this.state.passwordError}/>
                        {this.props.errorMessage ? <div className="has-error">{this.props.errorMessage}</div> : ''}
                        <div className="forgot-pw">
                            By clicking Sign me up you accept the <span className="pointer">Terms & Conditions</span>
                        </div>
                    </div>
                    <input type="submit" className="btn log-me-in center-middle with-animate" value="SIGN ME UP"></input>
                </form>
            </div>
        )
    }
}
