import {createStore} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import {applyMiddleware} from 'redux';
import {ActionCreator} from './actions/user-actions.js';
import {createAPI} from './api';
import AuthorizationStatus from './reducers/user/user-reducer';
import {Operation} from './reducers/data/data-reducer';
import {composeWithDevTools} from "redux-devtools-extension";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(Operation.loadOffers());
