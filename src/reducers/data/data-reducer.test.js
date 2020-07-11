import reducer from './data-reducer';
import {ActionType} from '../../actions/types';
import {offers, reviews, offersFromRequest, reviewsFromRequest} from '../../test-data';
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {Operation} from '../data/data-reducer';
import offersAdapter from '../../adapter/offers';
import reviewsAdapter from '../../adapter/reviews';

const api = createAPI(() => {});

describe(`Reducer works correctly`, () => {
  it(`Reducer has to return initial state if new state is undefined`, () => {
    expect(reducer(undefined, {}))
    .toEqual({offers: []});
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
});
