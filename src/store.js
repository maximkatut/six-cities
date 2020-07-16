import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';

import {ActionCreator as DataActionCreator} from './actions/data-actions.js';
import {ActionCreator as UserActionCreator} from './actions/user-actions.js';
import {createAPI} from './api';
import {AppRoute} from './const';
import history from './history';
import rootReducer from './reducers';
import {Operation as DataOperation} from './reducers/data/data-reducer';
import {AuthorizationStatus, Operation as UserOperation} from './reducers/user/user-reducer';

const onUnauthorized = () => {
  store.dispatch(UserActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
  history.push(`${AppRoute.LOGIN}`);
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

store.dispatch(DataOperation.loadOffers());
store.dispatch(UserOperation.checkAuth());
