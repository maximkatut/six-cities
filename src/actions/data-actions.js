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
  loadFavorites: (favorites) => {
    return {
      type: ActionType.LOAD_FAVORITES,
      payload: favorites,
    };
  },
  postFavorite: (favorite) => {
    return {
      type: ActionType.POST_FAVORITE,
      payload: favorite,
    };
  },
  postReview: (reviews) => {
    return {
      type: ActionType.POST_REVIEW,
      payload: reviews,
    };
  },
  loadOffersNearby: (offersNearby) => {
    return {
      type: ActionType.LOAD_OFFERS_NEARBY,
      payload: offersNearby,
    };
  },
  setRequestStatusBusy: (isBusy) => {
    return {
      type: ActionType.SET_REQUEST_STATUS,
      payload: isBusy,
    };
  },
  catchError: (status, err) => {
    const isError = {
      status,
      message: err.message
    };
    return {
      type: ActionType.CATCH_ERROR,
      payload: isError
    };
  },
};
