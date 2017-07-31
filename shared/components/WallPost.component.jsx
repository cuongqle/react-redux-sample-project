import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import AgrPrivateAction from 'shared/components/base/AgrPrivateAction.component';
import {connect} from 'react-redux';
import {modifyItemFromCart} from 'services/Mycart.service';
const mapStateToProps = (state, props) => ({
    items: state.mycart.items
});

const dispatchPropsToBinding = (dispatch, ownProps) => ({
    addToCart: items => dispatch(modifyItemFromCart(items))
});

@connect(mapStateToProps, dispatchPropsToBinding)
export default class WallPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addToCart: this.cartAdded(),
            starred: false
        };
        this.modalDetail = null;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.items.length != nextProps.items.length) {
            this.setState({
                addToCart: this.cartAdded(nextProps)
            })
        }
    }

    cartAdded(next) {
        return (next || this.props).items.filter(item => item.id == (next || this.props).id).length > 0
    }

    onAddToCart() {
        if (!this.props._item) return;
        let nextState = !this.state.addToCart;

        this.setState({
            addToCart: nextState
        });

        let added = this.props.items;
        if (nextState) {
            if (!this.cartAdded()) {
                added.push(this.props._item);
            }
        } else {
            added = added.filter(item => item.id != this.props.id)
        }

        this.props.addToCart(added);
    }

    gotoProfile() {
        browserHistory.push(process.env.PUBLIC_PATH + 'user/profile/' + this.props.ownerId);
    }

    onRatingStar() {
        if (this.state.starred && typeof this.props.removeMediaStar === 'function')
            this.props.removeMediaStar(this.props.mediaId || this.props.id);
        else if (!this.state.starred && typeof this.props.giveMediaStar === 'function')
            this.props.giveMediaStar(this.props.mediaId || this.props.id);
        this.setState({ starred: !this.state.starred })
    }

    render() {
        let {
            images = {},
            author = {},
            stats = {}
        } = this.props;

        return (
            <div className="item-with-hover-actions" key={this.props.index}>
                {!this.props.noHover ?
                    <div className="author-info">
                        <div className="author-info-sm-round-img"
                             style={{backgroundImage: `url('${(!!author && !!author.profileImage) ? author.profileImage : require("../../assets/img/default_avatar.png")}')`}}>
                        </div>
                        <div className="author-info-credit">
                            <AgrPrivateAction component={
                                <div className="credit-name bold-700"
                                     onClick={::this.gotoProfile}>
                                    <div>{!!author.name ? author.name : ''}</div>
                                </div>
                            }/>
                            <div className="credit-level font-sm">
                                {!!author.stats && !!author.stats.level ? author.stats.level : ''}
                                <span className="extra-tag bold-600">
                                    {!!author.username ? ' @' + author.username : ''}
                                </span>
                            </div>
                        </div>
                    </div> : ''}
                <div className="feature-image"
                     onClick={(e) => this.props.toDetails(this.props.mediaId || this.props.id)}>
                    <div className="image-frame">
                        <img
                            src={images && images.highResolution ? images.highResolution.url : ''}
                        />
                        {!this.props.forVote ? '' :
                            <AgrPrivateAction component={
                                <div className="vote center-middle">
                                    <i className="agr-medal"/>
                                </div>
                            }/>
                        }
                    </div>
                </div>
                {!this.props.noHover ? <div className="actions-wrapper">
                    <div className="actions-wrapper-more-info">
                        {/*{!this.props.noSale ?
                         <AgrPrivateAction component={
                         <div
                         className={`actions-wrapper-more-info-detail${this.state.addToCart ? ' added' : ''}`}
                         onClick={::this.onAddToCart}>
                         <i className="agr-bag"/>
                         </div>
                         }/> : ''}*/}
                    </div>
                    {
                        this.props.requestId ? <div className="actions-wrapper-right-buttons">
                            <AgrPrivateAction component={
                                <div className="actions-wrapper-rate-it"
                                     onClick={::this.onRatingStar}>
                                    <span className="count">{this.props.stars ? this.props.stars : 0}</span>
                                    <i className={`agr-${this.state.starred ? 'fill' : 'unfill'}-star`}/>
                                </div>
                            }/>
                        </div> :
                            <div className="actions-wrapper-right-buttons">
                                {/*<AgrPrivateAction component={
                                    <div className="actions-wrapper-pin-it">
                                        <span className="count">{stats && stats.pinned ? stats.pinned : 0}</span>
                                        <i className="agr-unfill-pin"/>
                                    </div>
                                }/>*/}

                                <AgrPrivateAction component={
                                    <div className="actions-wrapper-rate-it"
                                         onClick={::this.onRatingStar}>
                                        <span className="count">{stats && stats.stars ? stats.stars : 0}</span>
                                        <i className={`agr-${this.state.starred ? 'fill' : 'unfill'}-star`}/>
                                    </div>
                                }/>
                            </div>
                    }
                </div> : ''}
            </div>
        )
    }
}