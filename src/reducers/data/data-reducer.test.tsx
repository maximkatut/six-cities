import MockAdapter from "axios-mock-adapter";
import {ActionType} from '../../actions/types';
import offersAdapter, {adaptData as offerAdapter} from '../../adapter/offers';
import reviewsAdapter from '../../adapter/reviews';
import {createAPI} from "../../api";
import {offers, offersFromRequest, reviews, reviewsFromRequest} from '../../test-data';
import {Operation} from './data-reducer';
import reducer from './data-reducer';

describe(`Reducer works correctly`, () => {

  it(`Reducer has to return initial state if new state is undefined`, () => {
    expect(reducer(undefined, {}))
    .toEqual(
        {
          favorites: [],
          offers: [],
          isError: {
            status: false, message: ``
          },
          isBusy: false
        }
    );
  });

  it(`Reducer should return new state with new offers`, () => {
    expect(reducer({
      offers: [],
    }, {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    })).toEqual({
      offers,
    });
  });
  it(`Reducer should return new state with new reviews`, () => {
    expect(reducer({
      reviews: [],
    }, {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    })).toEqual({
      reviews,
    });
  });
  it(`Reducer should return new state with new offersNearby`, () => {
    expect(reducer({
      offersNearby: [],
    }, {
      type: ActionType.LOAD_OFFERS_NEARBY,
      payload: offers,
    })).toEqual({
      offersNearby: offers,
    });
  });

  it(`Reducer should return new state with new isError`, () => {
    expect(reducer({
      isError: {
        status: false,
        message: ``
      },
    }, {
      type: ActionType.CATCH_ERROR,
      payload: {
        status: true,
        message: `error`
      },
    })).toEqual({
      isError: {
        status: true,
        message: `error`
      },
    });
  });
});

describe(`Operations work correctly`, () => {
  const onUnauthorized = jest.fn();
  const onBadRequest = jest.fn();
  const api = createAPI(onUnauthorized, onBadRequest);

  const getState = jest.fn();
  it(`Should make a correct API call to hotels`, function () {
    const hotelsLoader = Operation.loadOffers();
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onGet(`/hotels`)
      .reply(200, offersFromRequest);

    hotelsLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_REQUEST_STATUS,
          payload: true,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_OFFERS,
          payload: offersAdapter(offersFromRequest),
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_REQUEST_STATUS,
          payload: false,
        });
      });
  });

  it(`Should make a correct API call to comments/id`, function () {
    const id = 21;
    const reviewsLoader = Operation.loadReviews(id);
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onGet(`/comments/21`)
      .reply(200, reviewsFromRequest);

    return reviewsLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: reviewsAdapter(reviewsFromRequest),
        });
      });
  });

  it(`Should make a correct API call hotels/id/nearby`, function () {
    const id = 21;
    const hotelsNearbyLoader = Operation.loadOffersNearby(id);
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onGet(`/hotels/21/nearby`)
      .reply(200, offersFromRequest);

    return hotelsNearbyLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS_NEARBY,
          payload: offersAdapter(offersFromRequest),
        });
      });
  });

  it(`Should make a correct API call POST to comments/id`, function () {
    const review = {"comment": `Hello`, "rating": 4, "id": 21};
    const postReviewLoader = Operation.postReview(review);
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onPost(`/comments/21`)
      .reply(200, reviewsFromRequest);

    return postReviewLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_REQUEST_STATUS,
          payload: true,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_REVIEWS,
          payload: reviewsAdapter(reviewsFromRequest),
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_REQUEST_STATUS,
          payload: false,
        });
      });
  });


  it(`Should make a correct API call to /favorite`, function () {
    const loadFavoritesLoader = Operation.loadFavorites();
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onGet(`/favorite`)
      .reply(200, offersFromRequest);

    return loadFavoritesLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITES,
          payload: offersAdapter(offersFromRequest),
        });
      });
  });

  it(`Should make a correct API call POST to favorite/id/0`, function () {
    const id = 21;
    const isFavorite = true;
    const isOfferPage = false;
    const postFavoriteLoader = Operation.postFavorite(id, isFavorite, isOfferPage);
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onPost(`/favorite/21/0`)
      .reply(200, offersFromRequest[0]);

    return postFavoriteLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.POST_FAVORITE,
          payload: offerAdapter(offersFromRequest[0]),
        });
      });
  });

  it(`Should make a correct API call POST to favorite-id-0`, function () {
    const isFavorite = true;
    const id = 21;
    const postFavoriteActiveOfferLoader = Operation.postFavoriteActiveOffer(id, isFavorite);
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onPost(`/favorite/21/0`)
      .reply(200, offersFromRequest[0]);

    return postFavoriteActiveOfferLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.POST_FAVORITE,
          payload: offerAdapter(offersFromRequest[0]),
        });
      });
  });
});
