import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import AgrInput from '../../../shared/components/base/AgrInput.component';
import {connect} from 'react-redux';

export default class ForgotPasswordForm extends Component {
    constructor() {
        super();
        this.errors = {
            isRequired: 'This field is mandatory.',
            emailNotValid: 'Email is not valid.',
            emailNotRegistered: 'This email is not registered on AGORA!'
        };
        this.state = {
            emailError: null
        };
    }

    onChangeField(field, value) {
        this[field] = value;
        if (this.props.onChangeField) {
            this.props.onChangeField(field, value);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (!!this.email) {
            this.updateEmailState(nextProps, nextState);
        }
    }

    updateEmailState(props, state) {
        if (props.emailExists === false) {
            if (state.emailError !== this.errors.emailNotRegistered) {
                this.setState({emailError: this.errors.emailNotRegistered});
            }
        }
    }

    validateEmail() {
        let error = null;
        this.setState({ emailError: null });
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

    validate(e) {
        e.preventDefault();
        this.setState({
            emailError: this.validateEmail()
        }, this.sendForgot);
    }

    validateUnique() {
        if (!!this.email) {
            this.props.onCheckEmail(this.email);
        }
    }

    sendForgot() {
        this.validateUnique();
        if (!this.state.emailError && !!this.email) {
            this.props.sendForgotPassword(this.props.token, this.email);
        }
    }

    render() {
        return (<div className="box-container">
            <div className="title">
                <div className="big-title">Please, introduce the email you introduced when you
                    signed up.
                </div>
            </div>
            <form onSubmit={::this.validate}>
                <div className="input-container">
                    <AgrInput className="email-box"
                              label="EMAIL"
                              formItem="email"
                              iconclass="agr-mail"
                              inputclass="email"
                              type="email"
                              changeField={::this.onChangeField}
                              placeholder="EMAIL"
                              error={this.state.emailError}
                    />
                </div>
                <input type="submit" className="btn log-me-in center-middle recover-link with-animate" value="SEND ME RECOVERY LINK"/>
            </form>

            {/*<div className="title-end">*/}
                {/*<span className="small-title">I am new.</span>*/}
                {/*<span className="bold-title pointer"*/}
                      {/*onClick={() => browserHistory.push(process.env.PUBLIC_PATH + 'sign-up')}>SIGN UP</span>*/}
            {/*</div>*/}
            {/*<div className="title-end">*/}
                {/*<span className="small-title">Having trouble logging in?</span>*/}
                {/*<span className="bold-title pointer">Contact us</span>*/}
            {/*</div>*/}

        </div>)
    }
}