import React, {Component} from 'react';
import SearchBox from './components/SearchBox.component';
import {FormattedMessage} from '../../shared/utils/IntlComponents';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {NavBarStateToProps, NavBarDispatchToPropsBinding} from './NavBar.bindings';
import AgrPrivateAction from 'shared/components/base/AgrPrivateAction.component';
import WatchClickOutSide from '../../shared/components/base/WatchClickOutSide.component';

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            showMenu: false
        }
    }

    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu
        });
    }


    gotoProfile() {
        browserHistory.push(process.env.PUBLIC_PATH + 'me/profile');
    };

    onClickOutSide() {
        this.state.showMenu && this.setState({
            showMenu: false
        });
    }

    render() {
        const {compactProfile} = this.props;
        let profile_img = (!!compactProfile && !!compactProfile.profileImage) ? compactProfile.profileImage : null;
        return (
            <WatchClickOutSide onClickOutside={::this.onClickOutSide}>
                <div className="profile hidden-xs pointer" onClick={() => this.toggleMenu()}>
                    <div className="avatar pointer"><img
                        src={!!profile_img ? profile_img : require("../../assets/img/default_avatar.png")}/></div>
                    <div className="title pointer font-sm color-blue margin-left-5">
                        <strong>{!!compactProfile ? compactProfile.name : ""}</strong><br/><span
                        className="color-darkgrey">{(!!compactProfile && !!compactProfile.stats) ? compactProfile.stats.level : null}</span>
                    </div>
                    {this.state.showMenu ?

                        <div className="lst-menu">
                            <div className="content">
                                <div className="arrow-up">
                                    <div className="inner-triangle"></div>
                                </div>
                                <ul>
                                    <li onClick={() => browserHistory.push(process.env.PUBLIC_PATH + 'me/profile')}>MY
                                        PROFILE
                                    </li>
                                    <li onClick={() => browserHistory.push(process.env.PUBLIC_PATH + 'me/profile-settings')}>
                                        SETTINGS
                                    </li>
                                    <li onClick={() => browserHistory.push(process.env.PUBLIC_PATH + 'logout')}>LOG
                                        OUT
                                    </li>
                                </ul>
                            </div>

                        </div>
                        : ''}
                </div>
            </WatchClickOutSide>
        );
    }
}

const LoginSignup = () => {
    return (
        <div className="profile hidden-xs">
            <div className="btn btn-black" onClick={(e) => browserHistory.push(process.env.PUBLIC_PATH + 'login')}><span
                className="text font-sm transition bold-600"><FormattedMessage id="const.LOGIN"/></span></div>
            <div className="btn btn-blue"
                 onClick={(e) => browserHistory.push(process.env.PUBLIC_PATH + 'sign-up')}><span
                className="text font-sm transition bold-600"><FormattedMessage id="const.SIGNUP"/></span></div>
        </div>
    );
};

@connect(NavBarStateToProps, NavBarDispatchToPropsBinding)
export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAuthPopup: false
        }
    }

    componentWillMount() {
        if (this.props.token) {
            this.props.getCompactProfile(this.props.token, this.props.refreshToken);
        }
    }

    toggleMobileMenu() {
    }

    onUploadImage() {
        browserHistory.push(process.env.PUBLIC_PATH + 'user/uploads');
    }

    render() {
        const {
            isLogged
        } = this.props;
        const cartItems = (this.props.mycart.items || 0).length;

        return (
            <nav id="header">
                <div className="logo-home" onClick={() => browserHistory.push(process.env.PUBLIC_PATH)}></div>
                <SearchBox isWallSearch={false}/>

                <div className="button-upload hidden-xs">
                    <AgrPrivateAction component={
                        <div className="btn btn-black" onClick={::this.onUploadImage}>
                            <i className="agr-camera-with-money"/>
                            <span className="text font-sm transition bold-600">
                                <FormattedMessage id="home.navbar.upload"/>
                            </span>
                        </div>
                    }/>
                </div>

                <div className="menu hidden-xs">
                    <Link
                        className="menu-item"
                        activeClassName={"active"} to={process.env.PUBLIC_PATH}><i className="agr-home"/></Link>
                    <Link
                        className="menu-item"
                        activeClassName={"active"}><i className="agr-speaker"/></Link>
                    <Link
                        className="menu-item"
                        activeClassName={"active"}><i className="agr-bell-with-middle-line"/></Link>
                </div>

                <Link
                    className="wallet"
                    activeClassName={"active"}
                    to={process.env.PUBLIC_PATH + 'user/cart'}
                >
                    <i className="agr-add-to-cart"/>
                    {
                        cartItems != 0 ?
                            <div className="font-sm bold-700">
                                {cartItems} <span className="text hidden-xs"><FormattedMessage
                                id={cartItems == 1 ? 'const.IMAGE' : 'const.IMAGES'}/></span>
                            </div> : null
                    }
                </Link>
                {
                    isLogged ? <Profile compactProfile={this.props.compactProfile}/> : <LoginSignup/>
                }

                <div className="visible-xs mobile-menu" onClick={::this.toggleMobileMenu}>
                    <i className="agr-menu-hamburger"/>
                </div>
            </nav>
        );
    }
}