import {createStore, compose} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import {applyMiddleware} from 'redux';
import {ActionCreator} from './actions/user-actions.js';
import {createAPI} from './api';
import AuthorizationStatus from './reducers/user/user-reducer';
import {Operation} from './reducers/data/data-reducer';

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(Operation.loadOffers());
