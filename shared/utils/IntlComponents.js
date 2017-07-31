import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
    FormattedMessage,
    FormattedHTMLMessage,
    FormattedDate,
    FormattedNumber,
    FormattedRelative
} from "react-intl";

function wrapIt(Component) {
    let mapStateToProps = (state) => ({
        locale: state.intl.locale,
        messages: state.intl.messages
    });

    @connect(mapStateToProps, null)
    class Wrapped extends React.Component {
        getDefaultMessage() {
            const pathParts = this.props.id.split(".");
            let message = this.props.id;
            try {
                message = pathParts.reduce((obj, pathPart) => obj[pathPart], this.props.messages);
            } catch(err) {
            }
            return message;
        }

        render() {
            return (
                <Component {...this.props} defaultMessage={this.getDefaultMessage()} />
            )
        }
    }

    return Wrapped;
};

module.exports = {
    FormattedMessage: wrapIt(FormattedMessage),
    FormattedHTMLMessage: wrapIt(FormattedHTMLMessage),
    FormattedDate: wrapIt(FormattedDate),
    FormattedNumber: wrapIt(FormattedNumber),
    FormattedRelative: wrapIt(FormattedRelative)
};