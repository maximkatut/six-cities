import configureStore from 'redux-mock-store';
import {cities, offers, reviews} from '.';
import NameSpace from '../reducers/name-space';
import {SortType} from '../const';

const mockStore = configureStore([]);

export const store = mockStore({
  [NameSpace.OFFERS]: {
    activeCityName: cities[0].name,
    sortType: SortType.POPULAR
  },
  [NameSpace.MAP]: {
    cardIdOnHover: offers[0].id
  },
  [NameSpace.USER]: {
    authorizationStatus: `NO_AUTH`,
    user: {
      email: `max@max.ru`
    }
  },
  [NameSpace.DATA]: {
    favorites: [],
    offers,
    reviews,
    offersNearby: [offers[1]],
    isError: {
      status: false,
      message: `hello`
    },
    isBusy: false
  }
});
