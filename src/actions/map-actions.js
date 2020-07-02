import {ActionType} from './types';

export const ActionCreator = {
  changecardIdOnHover: (cardIdOnHover) => {
    return {
      type: ActionType.CHANGE_CARD_ON_HOVER,
      payload: cardIdOnHover
    };
  }
};
