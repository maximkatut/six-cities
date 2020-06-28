import {offers} from './mocks/offers';
import {extend} from './utils';

const initialState = {
  activeCity: `Amsterdam`,
  activeOffers: offers
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`
};

const ActionCreator = {
  changeCity: (city) => {
    return {
      type: ActionType.CHANGE_CITY,
      city: city.name
    };
  },
  getOffers: (_offers) => {
    return {
      type: ActionType.GET_OFFERS,
      offers: _offers
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        activeCity: action.city
      });
    case ActionType.GET_OFFERS:
      return extend(state, {
        activeOffers: action.offers
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
