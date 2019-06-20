import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import { reducer as viewReducer } from './store/view';

const reducer = combineReducers({
  view: viewReducer,
});

/* eslint-disable no-underscore-dangle */
const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;
/* eslint-enable */

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

// 不能是单例的store，要用函数，每个用户独享一个store
/* eslint-disable no-underscore-dangle */
const getStore = () => createStore(reducer, enhancer);
/* eslint-enable */
export default getStore;
