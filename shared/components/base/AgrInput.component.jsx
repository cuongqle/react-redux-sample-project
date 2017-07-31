import React, {Component} from 'react';

export default class AgrInput extends Component {
    state = {
        value: null
    };

    changeItem() {
        this.props.changeField(this.props.formItem, this[this.props.formItem].value);
        this.setState({
            value: this[this.props.formItem].value
        });
    }

    clear() {
        this[this.props.formItem].value = null;
        this.changeItem();
    }

    render() {
        let {
            type,
            placeholder,
            formItem,
            iconclass,
            inputclass,
            error
        } = this.props;
        return (
            <div className="agr-input">
                <div className="icon">
                    <i className={iconclass} aria-hidden="true"></i>
                </div>
                <div className="input-details">
                    <div className="notification">
                        {this.state.value ?
                            <span className="label">{this.props.label}</span> : ''}
                        {
                            !!error ? <span className="error">{error}</span> : null
                        }
                    </div>
                    <input ref={node => this[formItem] = node} type={type} placeholder={placeholder}
                           className={inputclass} onChange={::this.changeItem}/>
                    <div className="logo logo-checked center-middle"><i className="agr-checked"></i>
                    </div>
                    {
                        !!this.state.value ?
                            <div className="logo logo-delete center-middle" onClick={::this.clear}><i
                                className="agr-delete"></i></div>
                            : null
                    }
                </div>
            </div>
        )
    }
}

AgrInput.defaultProps = {
    changeField: (e) => e
}