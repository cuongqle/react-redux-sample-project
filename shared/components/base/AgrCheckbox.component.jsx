import React, {Component, PropTypes} from 'react';
import InputWrapper from 'shared/utils/InputWrapper';

export default class AgrCheckbox extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            active: props.isActive
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     if (this.props.isActive !== nextProps.isActive) {
    //         this.setState({
    //             active: nextProps.isActive
    //         })
    //     }
    // }

    onCheckboxChange(e) {
        let _next = !this.state.active;

        this.setState({
            active: _next
        }, () => {
            this.props.onChange(_next)
        });
        this.props.reduxFormProps.onChange(e);
    }

    render() {
        let {
            onChange,// dont use here
            checked = this.state.active,
            ...rest
        } = InputWrapper(this.props.reduxFormProps);

        return (
            <div className="agora-checkbox">
                <div className="checkbox">
                    <label>
                        <input type="checkbox" className="checkbox" disabled={this.props.isDisable} checked={checked} {...rest} onChange={::this.onCheckboxChange}/>
                        <span className="agora-checkbox-text">
                            {this.props.text}
                        </span>
                    </label>
                </div>
            </div>
        )
    }
}

AgrCheckbox.propTypes = {
    isActive: React.PropTypes.bool,
    text: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element
    ]),
    onChange: React.PropTypes.func
};

AgrCheckbox.defaultProps = {
    isDisable: false,
    isActive: false,
    text: "",
    onChange: (e) => e,
    reduxFormProps: {
        onChange: e => e
    }
};