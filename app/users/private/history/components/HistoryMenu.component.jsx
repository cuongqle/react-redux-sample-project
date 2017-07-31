
import React, {Component} from 'react';
import {FormattedMessage} from 'shared/utils/IntlComponents';
export default class HistoryMenu extends Component {
    render() {
        return (<div className="history-menu">
            <div className="main-content">
                <div className="menu">
                    <div className="menu-item active left">
                        <i className="agr-bag"/><span className="label"><FormattedMessage id="myCart.purchased"/></span>
                    </div>
                    <div className="menu-item right">
                        <i className="agr-trophy"/><span className="label"><FormattedMessage id="myCart.wins"/></span>
                    </div>
                </div>
            </div>
        </div>)
    }
}
