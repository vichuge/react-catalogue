import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const composeEnhancer = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const setupStore = (preloadedState) => createStore(
  rootReducer,
  preloadedState,
  composeEnhancer(applyMiddleware(thunk)),
);

export default setupStore;
