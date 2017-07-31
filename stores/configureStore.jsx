import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducers from 'reducers';
import authMiddleware from 'middleware/Auth.middleware';
import uploadMiddleware from 'middleware/Upload.middleware';

const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true,
    diff: true,
    colors: {
        title: (action) => action.type && action.type.indexOf("_ERROR") > -1 ? `#ff6578` : `#0036ff`,
        prevState: () => `#9E9E9E`,
        action: () => `#03A9F4`,
        nextState: () => `#4CAF50`,
        error: () => `#F20404`,
    },
    predicate: (getState, action) => {
        return !(action.type && action.type.indexOf('redux-form') >= 0);
    }
});

export default function configureStore(state, browserHistory) {
    const reduxRouterMiddleWare = routerMiddleware(browserHistory);
    return createStore(
        reducers,
        state || {},
        compose(
            applyMiddleware(
                reduxRouterMiddleWare,
                loggerMiddleware,
                thunkMiddleware,
                authMiddleware,
                uploadMiddleware
            ),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
}
