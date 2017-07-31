import {combineReducers}  from 'redux';
import {routerReducer}  from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import {reducer as uiReducer} from 'redux-ui';
import {reducer as notifications} from 'react-notification-system-redux';
import {intlReducer} from 'react-intl-redux';

import auth from 'app/auth/Login.reducer';
import fbauth from 'app/auth/FacebookLogin.reducer';
import user from 'app/users/User.reducer';
import request from 'app/home/request/Request.reducer';
import media from 'app/home/recent-image/RecentImage.reducer';
import uploadmedia from 'app/users/private/uploads/UploadImage.reducer';
import search from 'app/home/search/SearchPage.reducer';
import mycart from 'app/users/private/my-cart/MyCart.reducer';
import adm from 'app/admin/Admin.reducer';
import AgrModal from 'shared/components/base/AgrModal.component';
import payment from 'app/users/private/payment/Payment.reducer';
import followers from 'app/users/profile/Followers.reducer';

let modals = AgrModal.reducer;
export default combineReducers({
    auth,
    fbauth,
    user,
    request,
    media,
    uploadmedia,
    search,
    mycart,
    adm,
    intl: intlReducer,
    routing: routerReducer,
    form: formReducer,
    ui: uiReducer,
    notifications,
    modals,
    payment,
    followers
});
