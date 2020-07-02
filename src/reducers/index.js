import {combineReducers} from 'redux';
import offersReducer from './offers-reducer';

export default combineReducers({
  offers: offersReducer
});
