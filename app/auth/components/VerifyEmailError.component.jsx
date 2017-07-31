import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {AuthPropsBindings, AuthDispatchBindings} from "../Auth.bindings";


@connect(AuthPropsBindings, AuthDispatchBindings)
export default class VerifyEmailError extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        if (this.props.errorMessage) {
            this.props.cleanErrorMessage();
        }
    }

    onGotoAgora() {
        window.open('http://www.agoraimages.com','_blank');
    }

    render() {
        return (<div id="auth" className="backdrop-grey ">
            <div className="main-container">
                <div className="body reset-password">
                    <div className="block-logo-title">
                        <div className="logo-small pointer"
                             onClick={()=>this.onGotoAgora()}></div>
                    </div>
                    <div className="auth-box">
                        <div className="box-container reset-password-success verify-email-error">
                            <div className="btn-close"><i className="agr-cross"/></div>
                            <div className="main-title">
                                <div className="checked-circle inline-block"><i className="agr-cross"/></div>
                                <div className="bold-title inline-block">We couldn’t verify your email.
                                    Please, retry or contact us.</div>
                            </div>
                            <a className="link-support" href="mailto:support@agoraimages.com">
                                support@agoraimages.com
                            </a>
                        </div>
                    </div>
                    <div className="logo-big pointer"
                         onClick={()=>this.onGotoAgora()}></div>
                </div>
            </div>
        </div>)
    }
}