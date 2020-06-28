import {reducer, ActionType} from './reducer';
import {offers} from './mocks/offers';
import {cities, offers as mockOffers} from './test-data';

describe(`Reducer works correctly`, () => {
  it(`Reducer has to return initial state if new state is undefined`, () => {
    expect(reducer(undefined, {}))
    .toEqual({
      activeCity: `Amsterdam`,
      activeOffers: offers
    });
  });

  it(`Reducer should return new state with new city`, () => {
    expect(reducer({
      activeCity: `Amsterdam`,
      activeOffers: offers
    }, {
      type: ActionType.CHANGE_CITY,
      city: cities[0].name
    })).toEqual({
      activeCity: `Gomel`,
      activeOffers: offers
    });
  });

  it(`Reducer should return new state with new offers`, () => {
    expect(reducer({
      activeCity: `Amsterdam`,
      activeOffers: offers
    }, {
      type: ActionType.GET_OFFERS,
      offers: mockOffers
    })).toEqual({
      activeCity: `Amsterdam`,
      activeOffers: mockOffers
    });
  });
});
