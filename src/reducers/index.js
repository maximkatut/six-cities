import {combineReducers} from 'redux';
import data from './data/data-reducer';
import map from './map/map-reducer';
import NameSpace from './name-space';
import offers from './offers/offers-reducer';
import user from './user/user-reducer';

export default combineReducers({
  [NameSpace.OFFERS]: offers,
  [NameSpace.MAP]: map,
  [NameSpace.USER]: user,
  [NameSpace.DATA]: data
});
