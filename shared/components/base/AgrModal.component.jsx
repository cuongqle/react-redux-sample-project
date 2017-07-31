import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import reducerFactory from '../../utils/ReducerFactory'

const SHOW_AGORA_MODAL = "SHOW_AGORA_MODAL";
const HIDE_AGORA_MODAL = "HIDE_AGORA_MODAL";
const modalDomain = 'modalDomain';

function show(options = {}) {
    return {
        type: SHOW_AGORA_MODAL,
        domain: modalDomain,
        popup: {
            ...options,
            template: options.template,
            id: options.id || Date.now() + Math.round(Math.random() * 999)
        }
    }
}

function hide(id) {
    return {
        type: HIDE_AGORA_MODAL,
        domain: modalDomain,
        id
    }
}

export default class AgrModal extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentWillMount() {
        // console.log(this.context);
    }

    componentWillReceiveProps(nextProps) {
        const { popups } = nextProps;

        popups.map(popup => {
            popup.onRemove = (callback) => {
                callback && callback();
                this.context.store.dispatch(hide(popup.id));
                popup.overflowHidden && this.bodyOverflow(popup.overflowHidden);
            };

            /* handle autoDismiss */
            if (popup.autoDismiss) {
                setTimeout(()=> {
                    popup.onRemove();
                }, popup.autoDismiss * 1000)
            }
        });
    }

    bodyOverflow(hidden) {
        let bodyOverflow = document.body.style.overflow;

        if (hidden && bodyOverflow != 'hidden') {
            document.body.style.overflow = 'hidden'
        }
        if (!hidden && bodyOverflow == 'hidden') {
            document.body.style.overflow = 'visible'
        }
    }

    getClassName() {
        /* defined class list for CSS */
        let _class = ['agora-modal'];

        const {
            popups
        } = this.props;

        /* Modal active when has childrens */
        (popups.length > 0) && _class.push('active');

        let _blurBackground = popups.filter((popup) => popup.blurBackground);

        /* Adding blur background */
        (_blurBackground.length) && _class.push('blur-background');


        let _transBackground = popups.filter((popup) => popup.transBackground);

        /* Adding trans background */
        (_transBackground.length) && _class.push('trans-background');

        let _overflowHidden = popups.filter((popup) => popup.overflowHidden);

        this.bodyOverflow(_overflowHidden.length);

        let _position = popups.filter((popup) => !!popup.position);

        if (_position[0]) {
            /* Where is the popup display? */
            switch (_position[0].position) {
                case 'center':
                case 'c':
                    _class.push('center-middle');
                    break;
                case 'top-center':
                case 'tc':
                    _class.push('top-middle');
                    break;
                default:
                    _class.push(_position[0].position);
                    break;
            }
        }

        return _class.join(" ")
    }

    render() {
        return (
            <div
                className={this.getClassName()}
                ref={(e)=> this.agoraModal = e}
            >
                {
                    this.props.popups.map((popup, i) =>
                        React.cloneElement(
                            popup.template,
                            {
                                key: i,
                                ...popup,
                                ...popup.template.props
                            }
                        )
                    )
                }

            </div>
        )
    }
}

const cases = (state, action) => {
    switch(action.type) {
        case SHOW_AGORA_MODAL:
            let popups = [...state.popups];
            let duplicated = popups.filter(popup => popup.id == action.popup.id); // check duplicated popups
            if (!duplicated.length) {
                popups.push(action.popup);
            }
            return {...state, popups: popups, id: action.id};
        case HIDE_AGORA_MODAL:
            let _remains = state.popups.filter((popup) =>
                popup.id !== action.id
            );
            return {...state, popups: _remains};
    }
    return state;
};

AgrModal.reducer = reducerFactory({
    popups: []
}, modalDomain, cases);

AgrModal.show = show;

AgrModal.hide = hide;

AgrModal.propTypes = {};

AgrModal.defaultProps = {};

AgrModal.contextTypes = {
    store: PropTypes.object
};
