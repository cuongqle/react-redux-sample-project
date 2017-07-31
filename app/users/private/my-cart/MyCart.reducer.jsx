import reducerFactory from '../../../../shared/utils/ReducerFactory';

export const MycartDomain = 'MycartDomain';

export const MYCART_MODIFY_ITEM = 'MYCART_MODIFY_ITEM';
export const MYCART_CHECKOUT_SUCCESS = 'MYCART_CHECKOUT_SUCCESS';
export const MYCART_CHECKOUT_ERROR = 'MYCART_CHECKOUT_ERROR';
export const MYCART_CLEARALL_ITEM = 'MYCART_CLEARALL_ITEM';
export const FETCH_PURCHASE_HISTORY_SUCCESS = 'FETCH_PURCHASE_HISTORY_SUCCESS';
export const FETCH_PURCHASE_HISTORY_ERROR = 'FETCH_PURCHASE_HISTORY_ERROR';

export const initialState = {
    errorMessage: null,
    items: []
};

let cases = (state, action) => {
    switch (action.type) {
        case MYCART_MODIFY_ITEM:
            return {...state, errorMessage: null, items: action.items};
        case MYCART_CHECKOUT_SUCCESS:
            return {...state, errorMessage: null};
        case MYCART_CHECKOUT_ERROR:
            return {...state, errorMessage: action.error};
        case MYCART_CLEARALL_ITEM:
            return {...state, items: [], errorMessage: null};
        case FETCH_PURCHASE_HISTORY_SUCCESS:
            return {...state, errorMessage: null, items: action.items};
        case FETCH_PURCHASE_HISTORY_ERROR:
            return {...state, errorMessage: action.error};
    }
};

export default reducerFactory(initialState, MycartDomain, cases)