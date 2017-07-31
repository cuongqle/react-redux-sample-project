import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {IntlProvider} from "react-intl";
import {updateIntl} from 'react-intl-redux';
import {loadLocaleData} from "./shared/utils/IntlLoader";
import configureStore from 'stores/configureStore';
import {loadState, saveState} from 'stores/localstorage';
import throttle from 'lodash/throttle';
import routes from 'routes';

require('assets/scss/main.scss');

const persistedState = loadState();
export const history = browserHistory;
export const store = configureStore(persistedState, history);

store.subscribe(throttle(() => {
    let states = store.getState();
    saveState({
        auth: states.auth,
        mycart: states.mycart
    });
}, 1000));

let renderApp = (locale) => {
    ReactDOM.render(
        <Provider store={store}>
            <IntlProvider locale={locale}>
                <Router history={history}>
                    {routes()}
                </Router>
            </IntlProvider>
        </Provider>,
        document.getElementById('root')
    );
}

let defaultlocale = 'en';
require(["./locales/" + defaultlocale], (result) => {
    store.dispatch(updateIntl(result))
});
loadLocaleData(defaultlocale).then(renderApp(defaultlocale));