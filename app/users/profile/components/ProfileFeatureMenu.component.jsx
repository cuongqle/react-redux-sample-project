import React, {Component} from 'react';
import {browserHistory} from 'react-router';

export default class ProfileFeatureMenu extends Component {

    gotoFeature(featureName) {
        let userId = this.props.userId;
        if (!!userId) {
            if (featureName == 'pinned')
                browserHistory.push(process.env.PUBLIC_PATH + 'user/profile/' + userId + '/pinned');
            else if (featureName == 'followers')
                browserHistory.push(process.env.PUBLIC_PATH + 'user/profile/' + userId + '/followers');
            else if (featureName == 'following')
                browserHistory.push(process.env.PUBLIC_PATH + 'user/profile/' + userId + '/following');
            else
                browserHistory.push(process.env.PUBLIC_PATH + 'user/profile/' + userId);
        } else {
            if (featureName == 'pinned')
                browserHistory.push(process.env.PUBLIC_PATH + 'me/profile/pinned');
            else if (featureName == 'followers')
                browserHistory.push(process.env.PUBLIC_PATH + 'me/profile/followers');
            else if (featureName == 'following')
                browserHistory.push(process.env.PUBLIC_PATH + 'me/profile/following');
            else
                browserHistory.push(process.env.PUBLIC_PATH + 'me/profile');
        }
    }

    render() {
        let {
            featureActive,
            profileDetails
        } = this.props;
        let classPinned = featureActive == 'pinned' ? 'pinned feature-menu active' : 'pinned feature-menu';
        let classGallery = featureActive == 'gallery' ? 'gallery feature-menu active' : 'gallery feature-menu';
        let classFollowers = featureActive == 'followers' ? 'followers feature-menu active' : 'followers feature-menu';
        let classFollowing = featureActive == 'following' ? 'following feature-menu active' : 'following feature-menu';

        return (<div className="profile-feature-menu font-poppins">
            <div className="menu-container">
                <div className={classGallery} onClick={(e) => this.gotoFeature('gallery')}>
                    <i className="agr-photo"></i>
                    <div className="block-title">
                        <span className="main-title">GALLERY</span>
                        <span className="number">{!!profileDetails.stats ? profileDetails.stats.images : 0}</span>
                    </div>
                </div>
                <div className={classPinned} onClick={(e) => this.gotoFeature('pinned')}>
                    <i className="agr-pin-menu"></i>
                    <div className="block-title">
                        <span className="main-title">PINNED</span>
                        <span className="number">{!!profileDetails.stats ? profileDetails.stats.pinned : 0}</span>
                    </div>
                </div>
                <div className={classFollowers} onClick={(e) => this.gotoFeature('followers')}>
                    <span className="big-number">{!!profileDetails.stats ? profileDetails.stats.followers : 0}</span>
                    <span className="main-title">FOLLOWERS</span>
                </div>
                <div className={classFollowing} onClick={(e) => this.gotoFeature('following')}>
                    <span className="big-number">{!!profileDetails.stats ? profileDetails.stats.following : 0}</span>
                    <span className="main-title">FOLLOWING</span>
                </div>
            </div>
            <hr />
        </div>)
    }
}