import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';
import NotFoundContainer from "shared/NotFound.container";
import requiresAuth from 'hoc/requiresAuth';
import fetchRecentImage from 'hoc/fetchRecentMedia';
import fetchCredentials from 'hoc/fetchCredentials';
import fetchMediaRequest from 'hoc/fetchMediaRequest';
import App from "app/App.container";
import AppNoBanner from "app/AppNoBanner.container";
import Home from "app/home/Home.container";
import Login from 'app/auth/Login.container';
import Logout from 'app/auth/Logout.container';
import SignUp from 'app/auth/SignUp.container';
import ForgotPassword from 'app/auth/ForgotPassword.container';
import NewUsername from 'app/auth/NewUsername.container';
import Profile from 'app/users/profile/Profile.container';
import UploadImage from 'app/users/private/uploads/UploadImage.container';
import ProfileSettings from 'app/users/profile/setting/ProfileSettings.container';
import SearchPage from 'app/home/search/SearchPage.container';
import RequestDetails from 'app/home/request/RequestDetails.container';
import MyCart from 'app/users/private/my-cart/MyCart.container';
import History from 'app/users/private/history/History.containner';
import UserSettings from 'app/users/private/general-settings/UserSettings.container';
import Payout from 'app/users/private/payment/Payout.container';
import FaqSettings from 'app/users/profile/setting/FaqSettings.container';

export default () => {
    return (
        <Route>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="new-user" component={NewUsername}/>
            </Route>
            <Route path="login" component={Login}/>
            <Route path="logout" component={Logout}/>
            <Route path="sign-up" component={SignUp}/>
            <Route path="forgot-password" component={ForgotPassword}/>
            <Route component={AppNoBanner}>
                <Route path="search" component={SearchPage}/>
                <Route path="me">
                    <IndexRedirect to="profile"/>
                    <Route path="profile" component={requiresAuth(fetchRecentImage(Profile))} featureActive={"gallery"}/>
                    <Route path="profile/pinned" featureActive={"pinned"} component={requiresAuth(fetchRecentImage(Profile))}/>
                    <Route path="profile/followers" featureActive={"followers"} component={requiresAuth(Profile)}/>
                    <Route path="profile/following" featureActive={"following"} component={requiresAuth(Profile)}/>
                    <Route path="profile-settings" component={requiresAuth(ProfileSettings)}/>
                    <Route path="faqs" component={FaqSettings} />
                    <Route path="settings" component={requiresAuth(UserSettings)}/>
                    <Route path="payout" components={requiresAuth(Payout)}/>
                </Route>
                <Route path="user/profile/:userId" component={fetchRecentImage(Profile)} featureActive={"gallery"}/>
                <Route path="user/profile/:userId/pinned" featureActive={"pinned"}
                       component={fetchRecentImage(Profile)}/>
                <Route path="user/profile/:userId/followers" featureActive={"followers"}
                       component={Profile}/>
                <Route path="user/profile/:userId/following" featureActive={"following"}
                       component={Profile}/>
                <Route path="user/uploads" component={requiresAuth(fetchCredentials(UploadImage))}/>
                <Route path="user/cart" component={requiresAuth(MyCart)}/>
                <Route path="request/:requestId/submit" featureActive={"submit"}
                       component={fetchMediaRequest(RequestDetails)}/>
                <Route path="request/:requestId/vote" featureActive={"vote"}
                       component={fetchMediaRequest(RequestDetails)}/>
                <Route path="request/:requestId/winner" featureActive={"winner"} component={RequestDetails}/>
                <Route path="history/purchase" component={requiresAuth(History)}/>
            </Route>
            <Route path="shared/image/:mediaId" component={App}>
                <IndexRoute component={Home}/>
            </Route>
            <Route path="*" component={NotFoundContainer}/>
        </Route>
    );
};
