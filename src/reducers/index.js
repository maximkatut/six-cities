import {combineReducers} from 'redux';
import offers from './offers-reducer';
import map from './map-reducer';

export default combineReducers({
  offers,
  map
});
