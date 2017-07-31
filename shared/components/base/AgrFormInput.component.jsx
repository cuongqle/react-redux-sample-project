import React, {Component} from 'react';
import InputWrapper from '../../utils/InputWrapper';

export default class AgrFormInput extends Component {
    applyChange(event) {
        this.props.onChange(event.target.value);
        if (typeof this.props.valueChange == 'function') {
            this.props.valueChange(event.target.value);
        }

    }

    render() {
        let propsForm = InputWrapper(this.props);
        let type = this.props.type ? this.props.type : 'text';
        let maxLength = this.props.maxLength ? this.props.maxLength : 1000;

        return (
            <input {...propsForm} className={this.props.className} placeholder={this.props.placeholder} type={type}
                   onChange={::this.applyChange} disabled={this.props.disabled} maxLength={maxLength}
                   onClick={ (e) => this.props.onClick(e)}/>
        );
    }
}
AgrFormInput.defaultProps = {
    onClick: (e) => e
}
