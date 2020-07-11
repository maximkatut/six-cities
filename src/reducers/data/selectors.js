import {createSelector} from "reselect";
import {getOffersByCity, getOffersBySort} from '../../utils';
import NameSpace from "../name-space.js";
import {getActiveCity, getSortType} from '../offers/selectors';

export const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
};

export const getReviews = (state) => {
  return state[NameSpace.DATA].reviews;
};

export const getOffersNearby = (state) => {
  return state[NameSpace.DATA].offersNearby;
};

export const getOffersByActiveCity = createSelector(
    getOffers,
    getActiveCity,
    (offers, activeCityName) => {
      return getOffersByCity(activeCityName, offers);
    }
);

export const getOffersBySortType = createSelector(
    getOffersByActiveCity,
    getSortType,
    (offers, sortType) => {
      return getOffersBySort(sortType, offers);
    }
);
