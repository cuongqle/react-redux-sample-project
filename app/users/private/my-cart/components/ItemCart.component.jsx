import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {formatCurrency} from '../../../../../shared/utils/FormatCurrency';

export default class ItemCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPinned: props.isPinned
        };
    }

    onRemoveFromCart() {
        this.props.onRemoveItemCart()
    }

    togglePin() {
        this.setState({
            isPinned: !this.state.isPinned
        })
    }

    getStringLicense(meta) {
        if (!meta) return '';
        let result = [];
        let _unit = meta.resUnit != "none" ? meta.resUnit : '';

        if (meta.width) {
            result.push(meta.width + 'px');
        }

        if (meta.height) {
            result.push(meta.height + 'px');
        }

        if (meta.resX) {
            result.push(meta.resX + _unit)
        }

        if (meta.resX) {
            result.push(meta.resY + _unit)
        }

        return result.join(" ")

    }

    render() {
        let {
            isPurchased,
            mediaDetails = {
                images: {
                    standardResolution: {
                        url: ""
                    }
                }
            }
        } = this.props;

        if (mediaDetails == null) {
            mediaDetails = {
                images: {
                    standardResolution: {
                        url: ""
                    }
                }
            }
        }

        return (
            <div className={`purchase-item ${isPurchased ? 'col-md-6 col-xs-6' : 'purchasing'}`}>
                <div className="item-preview" style={{backgroundImage: `url(${mediaDetails.images.standardResolution.url})`}}>
                    {
                        isPurchased ? <i className="agr-download"/> : null
                    }
                </div>
                <div className="item-info">
                    {
                        isPurchased ? <div className="detail"><span className="label">PURCHASED</span> <span>Jan, 14th 2016</span></div> : null
                    }
                    <div className="actions-wrapper">
                        ADVANCED
                        <div className="actions">
                            {
                                isPurchased ? null : <div onClick={::this.onRemoveFromCart}><i className="agr-delete"/> DELETE FROM CART </div>
                            }
                            <div onClick={::this.togglePin}><i className={`agr-${this.state.isPinned ? 'fill' : 'unfill'}-pin`}/> {this.state.isPinned ? 'PINNED' : 'PIN IMAGE'} </div>
                        </div>
                    </div>
                    <div className="detail">
                        <span className="label">PRICE</span>
                        <span>{formatCurrency("4.99")}</span>
                    </div>
                    <div className="detail">
                        <span className="label">BY</span>
                        <span>{mediaDetails.author.name}</span>
                    </div>
                    <div className="detail license">
                        License status
                        <div>{this.getStringLicense(mediaDetails.metaData)}</div>
                    </div>
                    <div className="detail">
                        <span className="label">ID</span>
                        <span className="img-id">{mediaDetails.id}</span>
                    </div>
                </div>
            </div>
        )
    }
}

ItemCart.propTypes = {
    onRemoveItemCart: React.PropTypes.func
};

ItemCart.defaultTypes = {
    isPurchased: false,
    isPinned: false,
    onRemoveItemCart: (e) => e
};