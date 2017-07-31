import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import AgrSelectBox from './AgrSelectBox.component';

export default class AgrFilterBox extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    onFilterChange(option) {
        let _field = (this.props.field || this.props.text).replace(" ", "_");
        let _filter = {};
        if (!_field) return;
        _filter[_field] = option;

        this.props.onChange(_filter);
    };

    render() {
        const {
            text,
            options,
            capitalize,
            upperCase,
            lookupFilter
        } = this.props;
        const cap = (e) => e.toString().replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
        });
        return (
            <div className="filters hidden-xs">
                <div className="filters-by">
                    {
                        capitalize ? cap(text) : upperCase ? text.toUpperCase() : text
                    }
                </div>
                <div className="filters-by-menu">
                    <AgrSelectBox
                        text={text}
                        options={options}
                        capitalize={capitalize}
                        lookupFilter={lookupFilter}
                        onChange={::this.onFilterChange}
                    />
                </div>
            </div>
        )
    }
}

AgrFilterBox.propTypes = {
    text: React.PropTypes.string,
    options: React.PropTypes.array,
    capitalize: React.PropTypes.bool,
    lookupFilter: React.PropTypes.bool,
    onChange: React.PropTypes.func
};

AgrFilterBox.defaultProps = {
    text: "",
    options: [],
    capitalize: false,
    upperCase: false,
    lookupFilter: false,
    onChange: (e) => e
};