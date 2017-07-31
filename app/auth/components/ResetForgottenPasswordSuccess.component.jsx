import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import config from 'config';

export default class ResetForgottenPasswordSuccess extends Component {
    constructor(props) {
        super(props);
    }

    onFollow(url) {
        window.open(url,'_blank');
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
                        <div className="box-container reset-password-success">
                            <div className="btn-close"><i className="agr-cross"/></div>
                            <div className="main-title">
                                <div className="checked-circle inline-block"><i className="agr-checked"/></div>
                                <div className="bold-title inline-block">Your password was modified succesfully.</div>
                            </div>
                            <div className="normal-title">
                                <p>Do you want to stay tunned?</p>
                                <p>FOLLOW AGORA:</p>
                            </div>
                            <div className="social-buttons">
                                <div className="social-buttons-item fb">
                                    <div onClick={()=>this.onFollow(config.fbSdk.profileUrl)}>
                                        <i className="agr-facebook pointer"/>
                                    </div>
                                </div>
                                <div className="social-buttons-item">
                                    <div onClick={()=>this.onFollow(config.twConfig.profileUrl)}>
                                        <i className="agr-twitter pointer"/>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="btn-footer pointer" onClick={()=>this.onGotoAgora()}>
                            Ok, go to AGORA images
                        </div>
                    </div>
                    <div className="logo-big pointer"
                         onClick={()=>this.onGotoAgora()}></div>
                </div>
            </div>
        </div>)
    }
}