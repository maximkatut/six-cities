import {extend} from '../../utils';
import {ActionType} from '../../actions/types';

export const initialState = {
  cardIdOnHover: -1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CARD_ON_HOVER:
      return extend(state, {
        cardIdOnHover: action.payload
      });
    default:
      return state;
  }
};
