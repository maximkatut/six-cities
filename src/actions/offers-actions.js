import {ActionType} from './types';
import {offers} from '../mocks/offers';
import {getOffersByCity} from '../utils';

export const ActionCreator = {
  changeCity: (cityName) => {
    return {
      type: ActionType.CHANGE_CITY,
      payload: cityName
    };
  },
  getOffers: (cityName) => {
    const filteredOffers = getOffersByCity(cityName, offers);
    return {
      type: ActionType.GET_OFFERS,
      payload: filteredOffers
    };
  }
};
