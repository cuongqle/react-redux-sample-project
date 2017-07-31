import React, {Component} from 'react';
import ProfileBanner from './components/ProfileBanner.component';
import ProfileFeatureMenu from './components/ProfileFeatureMenu.component';
import OrderNav from '../../home/components/OrderNav.component';
import RecentImage from '../../home/recent-image/RecentImage.container';
import Followers from './Followers.container';
import AgrScrollContainer from '../../../shared/components/base/AgrScrollContainer.component';
import {connect} from 'react-redux';
import {ProfileDispatchBindings, ProfilePropsBindings} from './Profile.bindings';

@connect(ProfilePropsBindings, ProfileDispatchBindings)
export default class Profile extends Component {
    state = {
        status: '',
        vertical: true
    };

    componentWillMount() {
        this.getProfileDetails();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.route.featureActive !== nextProps.route.featureActive) {
            switch (nextProps.route.featureActive) {
                case 'followers':
                    if (!!this.props.params.userId) {
                        this.props.getUserFollower(this.props.token, this.props.params.userId);
                    } else {
                        this.props.getMyFollower(this.props.token);
                    }
                    break;
                case 'following':
                    if (!!this.props.params.userId) {
                        this.props.getUserFollows(this.props.token, this.props.params.userId);
                    } else {
                        this.props.getMyFollows(this.props.token);
                    }
                    break;
            }
        }
    }

    getProfileDetails() {
        let feature = this.props.route.featureActive;
        if (!!this.props.params.userId) {
            this.props.getUserProfileDetails(this.props.token, this.props.params.userId, feature);
            this.setState({status: 'userProfile'});
        } else {
            this.props.getMyProfileDetails(this.props.token, feature);
            this.setState({status: 'myProfile'});
        }
    }

    getOrder(order) {
        this.setState({
            vertical: order
        });
    }

    render() {
        let userId = this.props.params.userId;
        let {
            profileDetails,
            followers,
            follows
        } = this.props;
        return (<div id="profile">
            <ProfileBanner profileDetails={profileDetails} followers={followers} status={this.state.status}
                           userId={userId}/>
            <ProfileFeatureMenu profileDetails={this.props.profileDetails}
                                featureActive={this.props.route.featureActive} userId={userId}/>
            {this.props.route.featureActive !== 'followers' && this.props.route.featureActive !== 'following' ?
                <div className="grid-container">
                    <OrderNav onRefresh={e => this.getProfileDetails()} onToggle={::this.getOrder}/>
                </div> : ''}
            {this.props.route.featureActive == 'pinned' || this.props.route.featureActive == 'gallery' ?
                <div className="grid-container grid-full">
                    <div className="section-main-content">
                        <AgrScrollContainer>
                            <RecentImage arrangement={this.state.vertical} params={this.props.params} gridFull={false}/>
                        </AgrScrollContainer>
                    </div>
                </div>
                : ''
            }
            {
                this.props.route.featureActive == 'followers' ?
                <Followers followers={followers}/> :
                this.props.route.featureActive == 'following' ?
                <Followers followers={follows}/> : ''
            }
        </div>);
    }
}