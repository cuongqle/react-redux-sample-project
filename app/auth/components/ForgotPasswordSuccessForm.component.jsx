import React, {Component} from 'react';
import {browserHistory} from 'react-router';

export default class ForgotPasswordSuccessForm extends Component {
    render() {
        return (<div className="box-container">
            <div className="title">
                <div className="icon-checked center-middle">
                    <i className="agr-checked"/>
                </div>
                <div className="big-title">We sent you an email with a recovery link.</div>
                <div className="small-title">Click on the link on the email we sent you and follow the indications.
                </div>
            </div>
            <div className="btn log-me-in center-middle recover-link success">
                <div className="sub-btn col-md-6">
                    <div className="btn-left center-middle" onClick={()=>this.props.onResend()}>
                        Send link again
                    </div>
                </div>
                <div className="btn-right sub-btn col-md-6">
                    <div className="btn-right center-middle" onClick={() => browserHistory.push(process.env.PUBLIC_PATH + 'login')}>
                        LOG IN
                    </div>
                </div>
            </div>
            <div className="title-end">
                <span className="small-title">Having trouble logging in?</span>
                <span className="bold-title pointer">Contact us</span>
            </div>
        </div>)
    }
}