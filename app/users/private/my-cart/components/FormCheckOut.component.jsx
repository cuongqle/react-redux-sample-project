import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {FormattedMessage} from 'shared/utils/IntlComponents';
import {reduxForm} from 'redux-form';
import AgrFormInput from 'shared/components/base/AgrFormInput.component';

@reduxForm({
    form: "cart-checkout",
    fields: ['number', 'expiry', 'cvc']
})
export default class CheckOutForm extends Component {
    static propTypes = {
        amount: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
        makePayment: PropTypes.func.isRequired
    };

    static defaultProps = {
        makePayment: e => e
    };

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    onPay(data) {
        this.props.makePayment(data);
    }

    render() {
        const {
            fields: {number, expiry, cvc},
            handleSubmit
        } = this.props;
        return (
            <div className="mycart-checkout">
                <div className="mycart-checkout-header">
                    <i className="agr-delete" onClick={e => this.props.onRemove()}/>
                    <div className="summary">Agora Payment</div>
                </div>
                <div className="mycart-checkout-information">
                    <AgrFormInput {...number} placeholder="Card Number"/>
                    <AgrFormInput {...expiry} placeholder="MM/YY"/>
                    <AgrFormInput {...cvc} placeholder="CVC"/>
                </div>
                <div className="btn-pay" onClick={handleSubmit(::this.onPay)}>Pay ${this.props.amount}</div>
            </div>
        )
    }
}