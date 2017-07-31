/**
 * Created by kanguyen on 12/19/16.
 */
import React, {Component} from 'react';
import InputWrapper from '../../utils/InputWrapper';

export default class AgrFormTextArea extends Component {
    applyChange(event) {
        this.props.onChange(event.target.value);
        if (typeof this.props.valueChange == 'function') {
            this.props.valueChange(event.target.value);
        }
        this.textAreaAdjust(event.target);
    }

    textAreaAdjust(obj) {
        obj.style.height = '1px';
        obj.style.height = (20 + obj.scrollHeight) + 'px';
    }

    render() {
        let propsForm = InputWrapper(this.props);
        let maxLength = this.props.maxLength ? this.props.maxLength : 1000;

        return (
            <textarea {...propsForm} className={this.props.className} placeholder={this.props.placeholder}
                      onChange={::this.applyChange} disabled={this.props.disabled} maxLength={maxLength}
                      onClick={ (e) => this.props.onClick(e)}/>
        );
    }
}
AgrFormTextArea.defaultProps = {
    onClick: (e) => e
}