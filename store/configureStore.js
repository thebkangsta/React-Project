import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/index';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))
  return store
}

// const store = createStore(rootReducer, compose(applyMiddleware(thunk),  window.devToolsExtension ? window.devToolsExtension() : f => f))


// if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('../reducers', () => {
//     	const nextReducer = require('../reducers/index').default
//     	store.replaceReducer(nextReducer)
//     })
// }

// export default store
