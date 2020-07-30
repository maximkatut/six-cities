import {extend} from '../../utils';
import {ActionType} from '../../actions/types';
import {SortType, Cities} from '../../const';

export const initialState = {
  activeCityName: Cities[0],
  sortType: SortType.POPULAR
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        activeCityName: action.payload
      });
    case ActionType.CHANGE_SORT_TYPE:
      return extend(state, {
        sortType: action.payload
      });
    default:
      return state;
  }
};
