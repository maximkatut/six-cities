import {ActionType} from './types';
import {offers} from '../mocks/offers';
import {getOffersByCity, getOffersBySort} from '../utils';

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
  },
  changeSortType: (sortType, offersByCity) => {
    const sortedOffers = getOffersBySort(sortType, offersByCity);
    return {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: sortedOffers
    };
  },
  changeActiveOffer: (activeOffer) => {
    return {
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: activeOffer
    };
  }
};
