import {ActionType} from './types';

export const ActionCreator = {
  changeCity: (cityName) => {
    return {
      type: ActionType.CHANGE_CITY,
      city: cityName
    };
  },
  getOffers: (_offers) => {
    return {
      type: ActionType.GET_OFFERS,
      offers: _offers
    };
  }
};
