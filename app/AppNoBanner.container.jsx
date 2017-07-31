import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavBar from './header/NavBar.component.jsx';
import {AppPropsBindings} from './App.bindings';
import Notifications from 'react-notification-system-redux';
import AgrModal from 'shared/components/base/AgrModal.component';
import style from 'shared/utils/Notifications.style';

@connect(AppPropsBindings, null)
export default class AppNoBanner extends Component {
    render() {
        let {
            notifications,
            popups
        } = this.props;

        return (
            <div id="app">
                <AgrModal popups={popups}/>
                <div id="wrapper">
                    <div id="container">
                        <NavBar isLogged={this.props.isLogged}/>
                        <div className="children">
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <Notifications
                    notifications={notifications}
                    style={style}
                />
            </div>
        )
    }
}