import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {AuthPropsBindings, AuthDispatchBindings} from "./Auth.bindings";
import ForgotPasswordForm from './components/ForgotPasswordForm.component';
import ForgotPasswordSuccessForm from './components/ForgotPasswordSuccessForm.component';

@connect(AuthPropsBindings, AuthDispatchBindings)
export default class ForgotPassword extends Component {
    constructor() {
        super();
        this.state = {
            recoverSuccess: false
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.emailExists && !this.state.recoverSuccess) {
            this.setState({ recoverSuccess: true });
        }
    }

    onChangeField(field, value) {
        this[field] = value;
    }

    onResend() {
        this.props.sendForgotPassword(this.props.token, this.email);
    }

    onGotoAgora() {
        window.open('http://www.agoraimages.com','_blank');
    }

    render() {
        return (<div id="auth" className="backdrop-grey font-avenir">
            <div className="main-container">
                <div className="body">
                    <div className="block-logo-title">
                        <div className="logo-small pointer"
                             onClick={()=>this.onGotoAgora()}></div>
                        <div className="title-content">
                            <h1 className="bold-600 no-margin">Recover your password.</h1>
                        </div>
                    </div>
                    <div className="auth-box">
                        {this.state.recoverSuccess ? <ForgotPasswordSuccessForm onResend={::this.onResend} /> :
                            <ForgotPasswordForm {...this.props} onChangeField={::this.onChangeField} />}
                    </div>
                    <div className="logo-big pointer"
                         onClick={()=>this.onGotoAgora()}></div>
                </div>
            </div>
        </div>)
    }
}