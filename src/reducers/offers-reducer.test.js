import reducer from './offers-reducer';
import {initialState} from './offers-reducer';
import {cities, offers} from '../test-data';
import {ActionType} from '../actions/types';

describe(`Reducer works correctly`, () => {
  it(`Reducer has to return initial state if new state is undefined`, () => {
    expect(reducer(undefined, {}))
    .toEqual(initialState);
  });

  it(`Reducer should return new state with new city`, () => {
    expect(reducer({
      activeCityName: `Amsterdam`,
      offers,
      cities
    }, {
      type: ActionType.CHANGE_CITY,
      payload: cities[0].name
    })).toEqual({
      activeCityName: `Gomel`,
      offers,
      cities
    });
  });

  it(`Reducer should return new state with new offers`, () => {
    expect(reducer({
      activeCityName: `Amsterdam`,
      offers: [],
      cities
    }, {
      type: ActionType.GET_OFFERS,
      payload: offers
    })).toEqual({
      activeCityName: `Amsterdam`,
      offers,
      cities
    });
  });
});
