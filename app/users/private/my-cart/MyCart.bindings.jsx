import Notifications from 'react-notification-system-redux';
import {modifyItemFromCart} from 'services/Mycart.service';
import {charge, clearCharges} from 'services/Payment.service';
import AgrModal from 'shared/components/base/AgrModal.component';

export const MyCartStateToPropsBinding = (state, props) => {
    return {
        items: state.mycart.items.map && state.mycart.items || [],
        charges: state.payment.charges,
        chargeErr: state.payment.err,
        compactProfile: state.user.compactProfile
    }
};

/*
 * VALIDATE CART ITEM BEFORE MAKING MODIFICATIONS
 * */

export const MyCartDispatchToPropsBinding = (dispatch, ownProps) => ({
    displayCheckoutPopup: component => {
        let modal = AgrModal.show({
            template: component,
            blurBackground: true,
            position: 'center'
        });
        dispatch(modal);
        return modal.popup
    },
    modifyCart: items => {
        dispatch(modifyItemFromCart(items));
        dispatch(clearCharges());
    },
    notifyCart: (text, type = 'warning') => {
        dispatch(Notifications[type]({
            message: text,
            position: 'tc',
            autoDismiss: type == 'info' ? 5 : 180
        }))
    },
    chargeCart: (number, exp_month, exp_year, cvc, amount, user, items) => charge(number, exp_month, exp_year, cvc, amount, user, items).then(dispatch)
});