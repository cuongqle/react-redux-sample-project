import React from 'react';
import {FormattedHTMLMessage} from '../shared/utils/IntlComponents';

export default function NotFoundContainer() {
    return (
        <div className="container">
            <FormattedHTMLMessage id="notfound"/>
        </div>
    )
}