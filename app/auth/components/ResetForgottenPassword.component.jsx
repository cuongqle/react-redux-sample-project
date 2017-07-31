import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {AuthPropsBindings, AuthDispatchBindings} from "../Auth.bindings";
import AgrInput from '../../../shared/components/base/AgrInput.component';


@connect(AuthPropsBindings, AuthDispatchBindings)
export default class ResetForgottenPassword extends Component {
    constructor(props) {
        super(props);
        this.errors = {
            isRequired: 'This field is mandatory.',
            passwordNotValid: 'Password must have more than 7 characters.',
            passwordNotMatch: 'Password not match'
        };
        this.state = {
            passwordError: null,
            reEnterPasswordError: null
        };
    }

    componentDidMount() {
        if (this.props.errorMessage) {
            this.props.cleanErrorMessage();
        }
    }

    componentWillUnmount() {
        if (this.props.errorMessage) {
            this.props.cleanErrorMessage();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.resetPasswordSuccess)
            browserHistory.push(process.env.PUBLIC_PATH + 'password-reset-success');
        else if (!nextProps.resetPasswordSuccess)
            browserHistory.push(process.env.PUBLIC_PATH + 'password-reset-error');

    }

    validate(e) {
        e.preventDefault();
        this.setState({
            passwordError: this.validatePassword(),
            reEnterPasswordError: this.validateReEnterPassword()
        }, this.resetForgottenPassword);
    }

    validateReEnterPassword() {
        let error = null;
        if (!this.reEnterPassword)
            return this.errors.isRequired;
        if (this.password && this.reEnterPassword && this.password != this.reEnterPassword) {
            return this.errors.passwordNotMatch;
        }
        return error;
    }

    validatePassword() {
        let error = null;
        if (!this.password) {
            return this.errors.isRequired;
        } else if (this.password.length < 8) {
            return this.errors.passwordNotValid;
        }
        return error;
    }

    onChangeField(field, value) {
        this[field] = value;
    }

    resetForgottenPassword() {
        if (!this.state.passwordError && !this.state.reEnterPasswordError) {
            this.props.onResetForgottenPassword(this.props.location.query.token, this.password);
        }
    }

    onGotoAgora() {
        window.open('http://www.agoraimages.com','_blank');
    }

    render() {
        return (<div id="auth" className="backdrop-grey">
            <div className="main-container">
                <div className="body">
                    <div className="block-logo-title">
                        <div className="logo-small pointer"
                             onClick={()=>this.onGotoAgora()}></div>
                        <div className="title-content">
                            <h1 className="bold-600 no-margin">Create a New Password</h1>
                        </div>
                    </div>
                    <div className="auth-box">
                        <div className="box-container">
                            <form onSubmit={::this.validate}>
                                <h3 className="title">Please, introduce your new password</h3>
                                <div id="reset-forgotten-password" className="input-container">
                                    <AgrInput className="password-box"
                                              label="PASSWORD"
                                              formItem="password"
                                              iconclass="agr-lock"
                                              inputclass="email"
                                              type="password"
                                              placeholder="PASSWORD"
                                              changeField={::this.onChangeField}
                                              error={this.state.passwordError}/>
                                    <AgrInput className="password-box"
                                              label="REENTER PASSWORD"
                                              formItem="reEnterPassword"
                                              iconclass="agr-lock"
                                              inputclass="email"
                                              type="password"
                                              placeholder="REENTER PASSWORD"
                                              changeField={::this.onChangeField}
                                              error={this.state.reEnterPasswordError}/>
                                    {this.props.errorMessage ?
                                        <div className="has-error">{this.props.errorMessage}</div> : ''}
                                </div>
                                <input type="submit" className="btn log-me-in center-middle with-animate"
                                       value="SAVE PASSWORD"></input>

                                {/*<div className="forgot-pw footer-title">*/}
                                    {/*Having trouble logging in? <span className="pointer">Contact us</span>*/}
                                {/*</div>*/}

                            </form>
                        </div>
                    </div>
                    <div className="logo-big pointer" onClick={()=>this.onGotoAgora()}></div>
                </div>
            </div>
        </div>)
    }
}