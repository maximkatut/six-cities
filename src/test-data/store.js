import {cities, offers} from '.';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

export const store = mockStore({
  offers: {
    activeCityName: cities[0].name,
    offers,
    cities
  },
  map: {
    cardIdOnHover: offers[0].id
  }
});
