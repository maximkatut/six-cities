import {cities, offers, reviews} from '.';
import configureStore from 'redux-mock-store';
import NameSpace from '../reducers/name-space';
import {SortType} from '../const';

const mockStore = configureStore([]);

export const store = mockStore({
  [NameSpace.OFFERS]: {
    activeCityName: cities[0].name,
    activeOffer: null,
    sortType: SortType.POPULAR
  },
  [NameSpace.MAP]: {
    cardIdOnHover: offers[0].id
  },
  [NameSpace.USER]: {
    authorizationStatus: `NO_AUTH`
  },
  [NameSpace.DATA]: {
    offers,
    reviews,
    offersNearby: [offers[1]]
  }
});
