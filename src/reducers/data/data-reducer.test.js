import MockAdapter from "axios-mock-adapter";
import {ActionType} from '../../actions/types';
import offersAdapter from '../../adapter/offers';
import reviewsAdapter from '../../adapter/reviews';
import {createAPI} from "../../api.js";
import {offers, offersFromRequest, reviews, reviewsFromRequest} from '../../test-data';
import {Operation} from '../data/data-reducer';
import reducer from './data-reducer';

const api = createAPI(() => {});

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

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to hotels`, function () {
    const hotelsLoader = Operation.loadOffers();
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onGet(`/hotels`)
      .reply(200, offersFromRequest);

    hotelsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: offersAdapter(offersFromRequest),
        });
      });
  });

  it(`Should make a correct API call to comments/id`, function () {
    const reviewsLoader = Operation.loadReviews();
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const getState = () => {
      return {
        OFFERS: {
          activeOffer: {
            id: 21
          }
        }
      };
    };

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

  it(`Should make a correct API call to hotels/id/nearby`, function () {
    const hotelsNearbyLoader = Operation.loadOffersNearby();
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const getState = () => {
      return {
        OFFERS: {
          activeOffer: {
            id: 21
          }
        }
      };
    };

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
    const review = {"comment": `Hello`, "rating": 4};
    const postReviewLoader = Operation.postReview(review);
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const getState = () => {
      return {
        OFFERS: {
          activeOffer: {
            id: 21
          }
        }
      };
    };

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
});
