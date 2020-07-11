import {createStore} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import {applyMiddleware} from 'redux';
import {ActionCreator as UserActionCreator} from './actions/user-actions.js';
import {ActionCreator as DataActionCreator} from './actions/data-actions.js';
import {createAPI} from './api';
import AuthorizationStatus from './reducers/user/user-reducer';
import {Operation} from './reducers/data/data-reducer';
import {composeWithDevTools} from "redux-devtools-extension";

const onUnauthorized = () => {
  store.dispatch(UserActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const onBadRequest = (err) => {
  store.dispatch(DataActionCreator.catchError(true, err));
};

const api = createAPI(onUnauthorized, onBadRequest);

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(Operation.loadOffers());
