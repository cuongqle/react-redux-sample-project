import React, {Component} from 'react';
import {connect} from 'react-redux';
import ItemCart from '../my-cart/components/ItemCart.component';
import HistoryMenu from './components/HistoryMenu.component';
import {FormattedMessage} from 'shared/utils/IntlComponents';
import {fetchPaymentHistory} from 'services/Payment.service'

const mapStateToProps = (state, ownProps) => ({
    compactProfile: state.user.compactProfile,
    chargesHistory: state.payment.chargesHistory
});

const dispatchToPropsBinding = (dispatch, ownProps) => ({
    getPaymentHistory: (userId) => fetchPaymentHistory(userId).then(dispatch)
});

@connect(mapStateToProps, dispatchToPropsBinding)
export default class History extends Component {
    componentWillMount() {
        if (this.props.compactProfile.id) {
            this.props.getPaymentHistory(this.props.compactProfile.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.compactProfile.id !== this.props.compactProfile.id) {
            this.props.getPaymentHistory(nextProps.compactProfile.id);
        }
    }

    render() {
        return (<div className="section-history font-avenir">
            <div className="history-items">
                <div className="history-title">
                    <FormattedMessage id="myCart.history_title"/>
                    <div className="sub">
                        <FormattedMessage id="myCart.history_desc"/>
                    </div>
                </div>
                <HistoryMenu/>
                <div className="wrapper">
                    {
                        this.props.chargesHistory.map((data, i) =>
                            <ItemCart mediaDetails={data} key={i} isPurchased={true}/>
                        )
                    }
                </div>
            </div>
        </div>)
    }
}