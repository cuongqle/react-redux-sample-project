import React, {Component} from 'react';
import {FormattedMessage} from 'shared/utils/IntlComponents';

export default class AgrSelectBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: props.options,
            expanding: false,
            searching: false,
            selectedValue: props.options[0] || "",
        };
        this.initialValue = props.options[0] || "";
    }

    onToggle() {
        this.setState({
            expanding: !this.state.expanding
        })
    }

    hideMenu(e) {
        let _target = e.target || e.srcElement;
        const {containerClassName} = this.props;

        while (_target
        && _target.className
        && _target.className.indexOf(containerClassName) == -1) /* will stop at div.id="container" because no className found */
        {
            _target = _target.parentNode
        }
        if (!_target) return;

        if (_target.parentNode !== this._selectContainer
            && this.state.expanding
            && !this.state.searching) {
            this.setState({
                expanding: false
            })
        }
    }

    onSelected(option) {
        if (this._select) {
            this._select.focus();
            this._select.value = option;
            this.setState({
                selectedValue: option
            }, () => {
                this.onToggle({type: "click"}); // fake event.type="click"
                this.props.onChange(option);
                this.props.reduxFormProps.onChange(this._select);
            })
        }
    }

    onLookupFocus(bool) {
        this.setState({
            searching: bool
        })
    }

    onLookupChange(e) {
        let _targetValue = e.target.value;
        let _propOptions = this.props.options;

        let results = _propOptions.filter((option) => {
            option = String(option).toLowerCase();
            return option.indexOf(_targetValue.trim().toLowerCase()) > -1
        });

        this.setState({
            options: results
        })
    }

    componentWillMount() {
        this._hideMenu = (e) => this.hideMenu(e);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            options: nextProps.options
        });

        if (!!this.props.reduxFormProps.value && this.props.reduxFormProps.value != nextProps.reduxFormProps.value) {
            this.onSelected(nextProps.reduxFormProps.value);
        }
    }

    componentDidMount() {
        window.addEventListener('click', this._hideMenu);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this._hideMenu);
        this._hideMenu = null
    }

    render() {
        const {
            options,
            expanding,
            selectedValue
        } = this.state;

        const {
            containerClassName,
            upperCase,
            lookupFilter,
            capitalize,
            moreClassName,
            reduxFormProps
        } = this.props;

        const cap = (e) => String(e).replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
        });

        return (
            <div
                className={`${containerClassName} ${moreClassName} ${expanding ? 'expand' : ''}`}
                ref={(e) => this._selectContainer = e}
                tabIndex="0"
            >
                <button
                    className="agora-select-button"
                    onClick={::this.onToggle}
                >
                    <span className={`filter-option ${this.props.hideSelectedValue ? 'hidden' : ''}`}>
                        {
                            capitalize ? cap(selectedValue) : selectedValue
                        }
                    </span>
                    <i className="agr-angle-down"/>
                </button>
                <div className="agora-select-dropdown">
                    <ul className="agora-select-dropdown-menu">
                        {
                            lookupFilter ?
                                <div className="agora-select-dropdown-menu-item lookup">
                                    <i className="agr-search"/>
                                    <input
                                        type="text"
                                        className="lookup-input"
                                        onFocus={(e) => this.onLookupFocus(true)}
                                        onBlur={(e) => this.onLookupFocus(false)}
                                        onChange={::this.onLookupChange}
                                    />
                                </div>
                                : null
                        }

                        {
                            options.map((option, i) =>
                                <li
                                    key={i}
                                    className={`agora-select-dropdown-menu-item ${option === selectedValue ? 'selected' : ''}`}
                                    onClick={() => this.onSelected(option)}
                                >{capitalize ? cap(option) : option}</li>
                            )
                        }

                        {
                            options.length == 0 ?
                                <li className="agora-select-dropdown-menu-item not-found">
                                    <FormattedMessage id="const.result_not_found"/>
                                </li> : null
                        }
                    </ul>
                </div>
                <select
                    className="agora-select-hidden"
                    tabIndex="-98"
                    ref={e => this._select = e}
                    value={selectedValue}
                    onChange={e => e}
                >
                    {
                        options.map((option, i) =>
                            <option key={i}>{option}</option>
                        )
                    }
                </select>
            </div>
        )
    }
}

AgrSelectBox.propTypes = {
    containerClassName: React.PropTypes.string,
    options: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onChange: React.PropTypes.func,
    upperCase: React.PropTypes.bool,
    hideSelectedValue: React.PropTypes.bool,
    moreClassName: React.PropTypes.string
};

AgrSelectBox.defaultProps = {
    containerClassName: 'agora-select',
    options: [],
    onChange: (e) => e,
    upperCase: false,
    lookupFilter: false,
    hideSelectedValue: false,
    moreClassName: '',
    reduxFormProps: {
        onChange: (e) => e
    }
};