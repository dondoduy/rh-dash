import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

export default (initialState) => {
    let store;
    let middleware = [
        thunk,
    ];

    store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            (window && window.devToolsExtension) ? window.devToolsExtension() : (f) => f
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}