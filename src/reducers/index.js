import {combineReducers} from 'redux';
import offers from './offers/offers-reducer';
import map from './map/map-reducer';
import user from './user/user-reducer';
import data from './data/data-reducer';
import NameSpace from './name-space';

export default combineReducers({
  [NameSpace.OFFERS]: offers,
  [NameSpace.MAP]: map,
  [NameSpace.USER]: user,
  [NameSpace.DATA]: data
});
