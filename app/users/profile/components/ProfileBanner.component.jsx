import React, {Component} from 'react';
import {map} from'lodash';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import AuthPopup from '../../../auth/AuthPopup.container';
import {FBShare,TwitterShare} from 'shared/utils/SocialShare';
import {getRelationship, setFollowRelationship, setUnfollowRelationship} from '../../../../services/Users.service';
import {FormattedMessage} from 'shared/utils/IntlComponents';
import {levels} from 'services/Utils';
import {formatNumber} from 'shared/utils/FormatNumber';

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.auth.token,
        sId: state.user.compactProfile.id,
        relationship: state.user.relationship
    }
}

const dispatchPropsToBinding = (dispatch, ownProps) => ({
    setFollow: (token, userId) => setFollowRelationship(token, userId).then(dispatch),
    setUnFollow: (token, userId) => setUnfollowRelationship(token, userId).then(dispatch),
    getRelationship: (token, userId) => getRelationship(token, userId).then(dispatch)
});

@connect(mapStateToProps, dispatchPropsToBinding)
export default class ProfileBanner extends Component {
    constructor() {
        super();
        this.state = {
            isFollowed: null,
            showAuthPopup: false
        }
    }

    componentWillMount() {
        if (this.props.userId) {
            this.props.getRelationship(this.props.token, this.props.userId);
        }
    }

    componentWillReceiveProps(nextProps) {
        let relationship = nextProps.relationship;
        this.setState({
            isFollowed: (!relationship || nextProps.userId === nextProps.sId) ? null : (relationship.outgoingStatus === "follows") ? true : false
        });
    }

    changeFollow(userId) {
        if (!this.props.token) {
            this.setState({ showAuthPopup: true });
            document.body.style.overflow = 'hidden';
        } else {
            if (this.state.isFollowed) {
                this.setState({ isFollowed: false });
                this.props.setUnFollow(this.props.token, userId);
            } else {
                this.setState({ isFollowed: true });
                this.props.setFollow(this.props.token, userId);
            }
        }
    }

    onFBShare(thumbnailUrl, id) {
        FBShare(thumbnailUrl, '/user/profile/' + id);
    }

    onTwitterShare(thumbnailUrl, id) {
        TwitterShare(thumbnailUrl, '/user/profile/' + id);
    }

    hidePopup() {
        this.setState({
            showAuthPopup: false
        });
    }

    displayUserLevel(current, stars) {
        let info = levels[current];
        if (!info || !stars) return {now: "Junior", percentage: 0, next: "Advanced"};
        return {now: info.now, percentage: Math.round(parseInt(stars, 10) * 100 / info.need), next: info.next}
    }

    render() {
        let {
            profileDetails,
            followers
        } = this.props;
        /* UI prompt bug: stat star will drop down if percentage < ~12%, lack of time to change html */
        const userLevel = this.displayUserLevel(profileDetails.stats && profileDetails.stats.level || '', profileDetails.stats && profileDetails.stats.stars || 0);
        const divStyle = {width: userLevel.percentage + '%'};
        let titleFollow = (this.state.isFollowed === null) ? '' : (this.state.isFollowed ? 'FOLLOWING' : '+ FOLLOW');
        let profile_img = (!!profileDetails && !!profileDetails.profileImage) ? profileDetails.profileImage : null;

        return (
            <div id="profile-banner" style={{backgroundImage: "url('" + profileDetails.coverImage + "')"}}>
                {
                    this.props.status == 'myProfile' ?
                        <button className="btn btn-white btn-trans btn-edit"
                                onClick={() => browserHistory.push(process.env.PUBLIC_PATH + 'me/profile-settings')}>
                            <i className="agr-pen"/>
                            <span>EDIT</span>
                        </button> : ''
                }
                <div className="cover"></div>
                <div className="profile-banner-container">
                    <div className="main-info">
                        <div className="avatar">
                            <img src={!!profile_img ? profile_img : require("../../../../assets/img/default_avatar.png")} alt=""/>
                        </div>
                        <div className="info-description">
                            <div className="name-info">
                                <span className="name">{profileDetails.name}</span>
                                {!!this.props.userId ?
                                    <span className="follow pointer"
                                          onClick={()=>this.changeFollow(profileDetails.id)}>{titleFollow}</span> : ''}
                            </div>
                            <div className="alias">{profileDetails.username ? '@' + profileDetails.username : ''}</div>
                            <div className="rating">
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar"
                                         aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={divStyle}>
                                        <div className="title-rating" style={{right: userLevel.percentage < 12 ? '-45px' : 0}}>{!!profileDetails.stats ? formatNumber(profileDetails.stats.stars) : 0} <i className="agr-fill-star"></i></div>
                                    </div>
                                </div>
                                <div className="title-progress">
                                    <span className="advance">{userLevel.now}</span>
                                    <span className="pro">{userLevel.next}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        !!followers && followers.length > 0 ?
                        <div className="follow-info">
                            <span className="title">followed by</span>
                            <ul className="list-follower">
                                {
                                    map(followers, (follower, i) => {
                                        return <li key={i} className="follower">{!!follower.name ? '@' + follower.name : ''}</li>;
                                    })
                                }
                            </ul>
                            <span className="follower-remaining" style={{display: "none"}}>(+6)...</span>
                        </div>
                        : null
                    }
                    <div className="description-info">
                        {profileDetails.bio}
                    </div>
                    <div className="main-title"><FormattedMessage id="profile.shareWithFriend"/></div>
                    <div className="social">
                        <div className="facebook">
                            <div className="circle center-middle" onClick={() => this.onFBShare(profileDetails.profileImage, profileDetails.id)}><i className="agr-facebook"></i></div>
                            <span className="number">0</span>
                        </div>
                        <div className="twitter">
                            <div className="circle center-middle" onClick={() => this.onTwitterShare(profileDetails.profileImage, profileDetails.id)}><i className="agr-twitter"></i></div>
                            <span className="number">0</span>
                        </div>
                    </div>
                </div>
                {this.state.showAuthPopup && !this.props.token ? <AuthPopup hidePopup={::this.hidePopup}/> : ''}
            </div>
        );
    }
}