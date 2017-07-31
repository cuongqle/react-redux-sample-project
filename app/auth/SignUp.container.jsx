import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import SignUpForm from './components/SignUpForm.component';
import {AuthPropsBindings, AuthDispatchBindings} from "./Auth.bindings";

@connect(AuthPropsBindings, AuthDispatchBindings)
export default class SignUp extends Component {
    componentWillUnmount() {
        if (this.props.errorMessage) {
            this.props.cleanErrorMessage();
        }
    }

    render() {
        return (<div id="auth" className="backdrop-grey">
            <div className="cover"></div>
            <div className="main-container">
                <div className="body">
                    <div className="block-logo-title">
                        <div className="logo-small pointer"
                             onClick={()=> browserHistory.push(process.env.PUBLIC_PATH)}></div>
                        <div className="title-content">
                            <h1 className="bold-600 no-margin">Welcome to AGORA images,</h1>
                            <div className="slogan bold-500">the Global Images Market.</div>
                        </div>
                    </div>
                    <div className="auth-box">
                        <div className="main-btn">
                            <div className="tab font-sm active pointer">SIGN UP</div>
                            <div onClick={()=> browserHistory.push(process.env.PUBLIC_PATH + 'login')}
                                 className="tab font-sm pointer">LOG IN
                            </div>
                        </div>
                        <SignUpForm {...this.props}/>
                    </div>
                    <div className="logo-big pointer"
                         onClick={(e) => browserHistory.push(process.env.PUBLIC_PATH)}></div>
                </div>
            </div>
        </div>)
    }
}