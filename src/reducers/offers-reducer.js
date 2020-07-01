import {offers} from '../mocks/offers';
import {extend} from '../utils';
import {ActionType} from '../actions/types';

const initialState = {
  activeCity: `Amsterdam`,
  offers
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        activeCity: action.city
      });
    case ActionType.GET_OFFERS:
      return extend(state, {
        offers: action.offers
      });
    default:
      return state;
  }
};
