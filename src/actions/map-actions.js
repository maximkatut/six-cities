import {ActionType} from './types';

export const ActionCreator = {
  changeCardIdOnHover: (cardIdOnHover) => {
    return {
      type: ActionType.CHANGE_CARD_ON_HOVER,
      payload: cardIdOnHover
    };
  }
};
