import {
    createStore,
    applyMiddleware,
} from 'redux';
//import createLogger from 'redux-logger';
import reducers from './reducers.js';
import reduxThunk from 'redux-thunk';

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(reduxThunk)
);
if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers.js', () => {
        const nextRootReducer = require('./reducers.js');
        store.replaceReducer(nextRootReducer);
    });
}

export default store;