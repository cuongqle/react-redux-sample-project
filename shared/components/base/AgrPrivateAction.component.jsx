import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {FormattedMessage} from 'shared/utils/IntlComponents';
import AuthPopup from 'app/auth/AuthPopup.container';
import AgrModal from 'shared/components/base/AgrModal.component';

const privateActionMapStateToProps = (state, ownProps) => ({
    token: state.auth.token
});

const dispatchToPropsBinding = (dispatch, ownProps) => ({
    authPopup: template => {
        let modal = AgrModal.show({
            template: template,
            blurBackground: false,
            overflowHidden: true
        });
        dispatch(modal);
        return modal.popup;
    }
});

@connect(privateActionMapStateToProps, dispatchToPropsBinding)
export default class AgrPrivateAction extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showAuthPopup: false
        };
        this.modalAuth = null;
        this.captureEvent = null;
    }

    componentWillReceiveProps(nextProps) {
        /*
        * case: AuthPopup is showed and user login-ed (has token)
        * */
        if (this.state.showAuthPopup && nextProps.token) {
            this.removeAgrModal();
            this.continueUserAction(this.captureEvent);
        }
    }

    removeAgrModal() {
        if (this.modalAuth) {
            this.modalAuth.onRemove();
            this.modalAuth = null;
        }
    }

    togglePopup() {
        const nextState = !this.state.showAuthPopup;

        if (nextState) {
            this.removeAgrModal();
            this.modalAuth = this.props.authPopup(<AuthPopup hidePopup={::this.togglePopup}/>);
        } else {
            this.removeAgrModal();
        }

        this.setState({
            showAuthPopup: nextState
        });
    }

    validateToken(e) {
        this.captureEvent = e;

        if (!this.props.token) {
            this.togglePopup();
        } else {
            this.continueUserAction(e);
        }
    }

    continueUserAction(e) {
        /*
         * because we capture component onClick so we have to call it after user authorized
         * */
        let evtClick = this.props.component.props.onClick;
        if (evtClick && !!this.captureEvent) {
            evtClick.apply(this.props.component, [e]);
            this.captureEvent = null;
        }
    }

    render() {
        const {
            onClick, // capture onClick event
            ...rest
        } = this.props.component.props;

        return (
            React.cloneElement(
                this.props.component,
                {
                    ...rest,
                    onClick: ::this.validateToken
                }
            )
        )
    }
}

AgrPrivateAction.propTypes = {
    component: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.element
    ]).isRequired
};

AgrPrivateAction.defaultProps = {};