import {ActionType} from './types';

export const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },
  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    };
  },
  loadOffersNearby: (offersNearby) => {
    return {
      type: ActionType.LOAD_OFFERS_NEARBY,
      payload: offersNearby,
    };
  },
};
