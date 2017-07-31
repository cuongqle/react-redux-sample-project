import React, {Component} from 'react';
import {browserHistory, Link} from 'react-router';

export default class SettingsMenu extends Component {
    render() {
        return (<div className="profile-settings-menu inline-block">
            <ul className="list-menu">
                <li className="pointer">
                    <Link
                        className="pointer"
                        activeClassName={"active"}
                        to={process.env.PUBLIC_PATH + 'me/profile-settings'}>Profile</Link>
                </li>
                <li className="pointer">
                    <Link
                        className="pointer"
                        activeClassName={"active"}
                        to={process.env.PUBLIC_PATH + 'me/payout'}>Payouts</Link>
                </li>
                <li className="pointer">
                    <Link
                        className="pointer"
                        activeClassName={"active"}
                        to={process.env.PUBLIC_PATH + 'me/faqs'}>Faqs</Link>
                </li>
                {/*<li className="pointer">
                    <Link
                        className="pointer"
                        activeClassName={"active"}
                        to={process.env.PUBLIC_PATH + 'me/settings'}>Settings</Link>
                </li>
                <li className="pointer">
                    <Link
                        className="pointer"
                        activeClassName={"active"}
                        to={process.env.PUBLIC_PATH + 'support'}>Support</Link>
                </li>
                <li className="pointer">
                    <Link
                        className="pointer"
                        activeClassName={"active"}
                        to={process.env.PUBLIC_PATH + 'about'}>About</Link>
                </li>*/}
            </ul>
        </div>)
    }
}