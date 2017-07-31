import React, {Component, PropTypes} from 'react';
import {FormattedHTMLMessage} from 'shared/utils/IntlComponents';

export default class FAQ extends Component {
    static propTypes = {};
    static defaultProps = {};

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            <div className="section-faqs">
                <FormattedHTMLMessage id="faq.welcome"/>
                <FormattedHTMLMessage id="faq.about"/>
                <FormattedHTMLMessage id="faq.earn-money"/>
                <FormattedHTMLMessage id="faq.requests"/>
                <FormattedHTMLMessage id="faq.levelling-stars"/>
                <FormattedHTMLMessage id="faq.uploading"/>
                <FormattedHTMLMessage id="faq.selling"/>
                <FormattedHTMLMessage id="faq.payment"/>
                <FormattedHTMLMessage id="faq.image-rights"/>
                <FormattedHTMLMessage id="faq.others"/>
            </div>
        )
    }
}