import MockAdapter from "axios-mock-adapter";
import reducer, {AuthorizationStatus} from "./user-reducer";
import {ActionCreator} from '../../actions/user-actions';
import {ActionType} from '../../actions/types';
import {Operation} from '../../reducers/user/user-reducer';
import {createAPI} from "../../api.js";


it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    user: {}
  });
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    });
  });
});

describe(`Operation works correctly`, () => {
  const api = createAPI(() => {}, () => {});

  it(`Should make a correct API call to -login POST request`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loginLoader = Operation.login({login: `max@max.ru`, password: 123});
    const user = {email: `max@amx.max`, avatar: `avatar`};

    apiMock
      .onPost(`/login`)
      .reply(200, {
        email: `max@amx.max`,
        // eslint-disable-next-line camelcase
        avatar_url: `avatar`
      }
      );

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.GET_USER,
          payload: user,
        });
      });
  });

  it(`Should make a correct API call to -login GET request`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = Operation.checkAuth();
    const user = {};

    apiMock
      .onGet(`/login`)
      .reply(200, user);

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.GET_USER,
          payload: user,
        });
      });
  });
});
