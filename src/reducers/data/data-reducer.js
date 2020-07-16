import produce from 'immer';
import {extend} from "../../utils";
import {ActionCreator} from '../../actions/data-actions';
import {ActionCreator as OffersActionCreator} from '../../actions/offers-actions';
import {ActionType} from '../../actions/types';
import getAdaptedOffers, {adaptData as getAdaptedOffer} from '../../adapter/offers';
import getAdaptedReviews from '../../adapter/reviews';
import NameSpace from "../name-space";

const initialState = {
  favorites: [],
  isBusy: false,
  isError: {
    message: ``,
    status: false
  },
  offers: []
};

export const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const adaptedData = getAdaptedOffers(response.data);
        dispatch(ActionCreator.loadOffers(adaptedData));
      });
  },

  loadReviews: () => (dispatch, getState, api) => {
    const id = getState()[NameSpace.OFFERS].activeOffer.id;
    return api.get(`/comments/${id}`)
      .then((response) => {
        const adaptedData = getAdaptedReviews(response.data);
        dispatch(ActionCreator.loadReviews(adaptedData));
      });
  },

  postReview: ({comment, rating}) => (dispatch, getState, api) => {
    const id = getState()[NameSpace.OFFERS].activeOffer.id;
    return api.post(`/comments/${id}`,
        {
          "comment": comment,
          "rating": Number(rating)
        }
    )
      .then((response) => {
        dispatch(ActionCreator.setRequestStatusBusy(true));
        const adaptedData = getAdaptedReviews(response.data);
        dispatch(ActionCreator.loadReviews(adaptedData));
      })
      .then(()=> {
        dispatch(ActionCreator.setRequestStatusBusy(false));
      });
  },

  loadOffersNearby: () => (dispatch, getState, api) => {
    const id = getState()[NameSpace.OFFERS].activeOffer.id;
    return api.get(`/hotels/${id}/nearby`)
      .then((response) => {
        const adapatedData = getAdaptedOffers(response.data);
        dispatch(ActionCreator.loadOffersNearby(adapatedData));
      });
  },

  loadFavorites: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        const adaptedData = getAdaptedOffers(response.data);
        dispatch(ActionCreator.loadFavorites(adaptedData));
      });
  },

  postFavorite: (id, isFavorite, isOfferPage = false) => (dispatch, getState, api) => {
    const status = isFavorite ? 0 : 1;
    return api.post(`/favorite/${id}/${status}`)
      .then((response) => {
        const adaptedOffer = getAdaptedOffer(response.data);
        dispatch(ActionCreator.postFavorite(adaptedOffer));
        dispatch(Operation.loadFavorites());
        if (isOfferPage) {
          dispatch(Operation.loadOffersNearby());
        }
      });
  },

  postFavoriteActiveOffer: (id, isFavorite) => (dispatch, getState, api) => {
    const status = isFavorite ? 0 : 1;
    return api.post(`/favorite/${id}/${status}`)
      .then((response) => {
        const adaptedOffer = getAdaptedOffer(response.data);
        dispatch(ActionCreator.postFavorite(adaptedOffer));
        dispatch(Operation.loadFavorites());
        dispatch(OffersActionCreator.changeActiveOffer(adaptedOffer));
      });
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offers: action.payload,
      });
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });
    case ActionType.LOAD_FAVORITES:
      return extend(state, {
        favorites: action.payload
      });

    case ActionType.POST_FAVORITE:
      return produce(state, (draft) => {
        const newOffer = action.payload;
        const index = state.offers.findIndex((_offer) => _offer.id === newOffer.id);
        draft.offers[index].isFavorite = newOffer.isFavorite;
      });

    case ActionType.POST_REVIEW:
      return extend(state, {
        reviews: action.payload,
      });
    case ActionType.LOAD_OFFERS_NEARBY:
      return extend(state, {
        offersNearby: action.payload,
      });
    case ActionType.CATCH_ERROR:
      return extend(state, {
        isError: action.payload,
      });
    case ActionType.SET_REQUEST_STATUS:
      return extend(state, {
        isBusy: action.payload
      });
  }

  return state;
};
