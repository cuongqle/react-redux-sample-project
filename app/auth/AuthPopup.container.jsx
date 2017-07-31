import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import LoginForm from './components/LoginForm.component';
import SignUpForm from './components/SignUpForm.component';
import {AuthPropsBindings, AuthDispatchBindings} from "./Auth.bindings";

@connect(AuthPropsBindings, AuthDispatchBindings)
export default class AuthPopup extends Component {
    constructor() {
        super();
        this.state = {
            activeTab: 'login'
        };
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.errorMessage && nextProps.errorMessage == this.props.errorMessage)
            this.props.cleanErrorMessage();
    }

    swithToSignUp() {
        this.setState({
            activeTab: 'signUp'
        });
    }

    swithToLogin() {
        this.setState({
            activeTab: 'login'
        });
    }

    render() {
        let classSignUp = this.state.activeTab == 'signUp' ? 'tab font-sm pointer active' : 'tab font-sm pointer';
        let classLogin = this.state.activeTab == 'login' ? 'tab font-sm pointer active' : 'tab font-sm pointer';
        return (<div id="auth" className="backdrop-grey popup">
            <div className="main-container">
                <div className="cover-popup" onClick={(e) => this.props.hidePopup()}></div>
                <div className="body">
                    <div className="block-logo-title">
                        <div className="title-content">
                            <div className="slogan bold-500">Sign Up to be part of the Global Images Market.</div>
                            <div className="cover-delete pointer" onClick={(e) => this.props.hidePopup()}>
                                <i className="agr-delete"/>
                            </div>

                        </div>
                    </div>
                    <div className="auth-box popup">
                        <div className="main-btn">
                            <div className={classSignUp} onClick={::this.swithToSignUp}>SIGN UP</div>
                            <div className={classLogin} onClick={::this.swithToLogin}>LOG IN</div>
                        </div>
                        {this.state.activeTab == 'login' ?
                            <LoginForm {...this.props} onLogin={::this.props.onLoginByPopup} /> :
                            <SignUpForm {...this.props} onSignup={::this.props.onSignupByPopup} />}
                    </div>
                </div>
            </div>
        </div>)
    }
}