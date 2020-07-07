import {combineReducers} from 'redux';
import offers from './offers/offers-reducer';
import map from './map/map-reducer';
import user from './user/user-reducer';

export default combineReducers({
  offers,
  map,
  user
});
