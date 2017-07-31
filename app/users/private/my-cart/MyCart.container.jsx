import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import ItemCart from './components/ItemCart.component';
import {formatCurrency} from 'shared/utils/FormatCurrency';
import {MyCartStateToPropsBinding, MyCartDispatchToPropsBinding} from './MyCart.bindings';
import {FormattedMessage} from 'shared/utils/IntlComponents';
import FormCheckout from './components/FormCheckOut.component';

@connect(MyCartStateToPropsBinding, MyCartDispatchToPropsBinding)
export default class MyCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasing: props.items
        };
        this.modalCheckout = null;
    }

    goToPurchaseHistory() {
        browserHistory.push(process.env.PUBLIC_PATH + 'history/purchase');
    }

    onCheckOut() {
        this.removeModalCheckOut();
        this.modalCheckout = this.props.displayCheckoutPopup(<FormCheckout amount={this.calculateTotalPrice()} makePayment={::this.onMakePayment}/>);
    }

    removeModalCheckOut() {
        if (this.modalCheckout) {
            this.modalCheckout.onRemove();
            this.modalCheckout = null;
        }
    }

    calculateTotalPrice() {
        return 19;
    }

    onMakePayment(data) {
        /* MAKE REAL PAYMENT HERE*/
        let expiry = data.expiry.split("/");
        this.props.chargeCart(data.number, expiry[0], expiry[1], data.cvc, this.calculateTotalPrice(), this.props.compactProfile, this.props.items);
    }

    onRemoveItemCart(index) {
        let items = this.state.purchasing;
        items.splice(index, 1);

        this.setState({
            purchasing: items
        });

        this.props.modifyCart(items);
    }

    isSuccessPayment(nextProps) {
        if (nextProps.charges.length > 0) {
            this.props.notifyCart("Make payment success", 'info');
            this.props.modifyCart([]); // empty cart
            this.removeModalCheckOut();
            this.goToPurchaseHistory();
        }
    }

    isFailPayment(nextProps) {
        if (nextProps.chargeErr == null) return;
        let _err = this.props.chargeErr || {};

        if (!!nextProps.chargeErr.requestId &&
            nextProps.chargeErr.requestId != _err.requestId) {
            this.props.notifyCart(nextProps.chargeErr.message);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.isSuccessPayment(nextProps);
        this.isFailPayment(nextProps);
    }

    render() {
        const isEmpty = this.state.purchasing.length == 0;
        return (
            <div className={`section-mycart${isEmpty ? ' empty' : ''}`}>
                <div className="mycart-items">
                    <div className="mycart-title">
                        <FormattedMessage id="myCart.cart_title"/>
                        <div className="sub"><FormattedMessage id="myCart.cart_desc"/></div>
                    </div>
                    <div className="wrapper">
                        {
                            this.state.purchasing.map((data, i) =>
                                <ItemCart mediaDetails={data} onRemoveItemCart={(e) => this.onRemoveItemCart(i)} key={i}/>
                            )
                        }
                        {
                            isEmpty ?
                                <div className="purchase-item purchasing">
                                    <h3> Your cart is empty</h3>
                                </div> : null
                        }
                    </div>
                </div>
                {
                    isEmpty ?
                        null :
                        <div className="mycart-summary">
                            <div className="summary-box">
                                <div className="summary-title"><FormattedMessage id="myCart.summary"/></div>
                                <div className="summary-item">
                                    <div className="summary-cost">{`Images (${this.state.purchasing.length})`}<div>{formatCurrency("9.99")}</div></div>
                                    <ul className="costs-ul">
                                        {
                                            this.state.purchasing.map((data, i) =>
                                                <li key={i}>Image {formatCurrency("4.99")}</li>
                                            )
                                        }
                                    </ul>
                                </div>
                                <div className="summary-item">
                                    <div className="summary-cost">Tax (16%)<div>{formatCurrency("1.7")}</div></div>
                                </div>
                                <div className="summary-item">
                                    <div className="summary-cost">Stripe fee<div>{formatCurrency("2.4")}</div></div>
                                    <ul className="costs-ul">
                                        <li>{formatCurrency("0.25")}</li>
                                        <li>1.4%</li>
                                    </ul>
                                </div>
                                <div className="summary-item border-top">
                                    <div className="summary-cost padding-top-10"><FormattedMessage id="myCart.total"/><div>{formatCurrency("19.09")}</div></div>
                                </div>
                            </div>
                            <div className="summary-checkout" onClick={::this.onCheckOut}><FormattedMessage id="myCart.checkout"/></div>
                            <div className="summary-purchased" onClick={::this.goToPurchaseHistory}>
                                <i className="agr-bag"/>
                                <FormattedMessage id="myCart.purchased"/>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

MyCart.propTypes = {
    items: React.PropTypes.array
};

MyCart.defaultProps = {
    items: []
};