import {offers} from '../mocks/offers';
import {extend, getCitiesList, getOffersByCity} from '../utils';
import {ActionType} from '../actions/types';

const cities = getCitiesList(offers);
const filteredOffers = getOffersByCity(cities[0].name, offers);

export const initialState = {
  activeCityName: `Paris`,
  activeOffer: null,
  cities,
  offers: filteredOffers,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        activeCityName: action.payload
      });
    case ActionType.GET_OFFERS:
      return extend(state, {
        offers: action.payload
      });
    case ActionType.CHANGE_SORT_TYPE:
      return extend(state, {
        offers: action.payload
      });
    case ActionType.CHANGE_ACTIVE_OFFER:
      return extend(state, {
        activeOffer: action.payload
      });
    default:
      return state;
  }
};
