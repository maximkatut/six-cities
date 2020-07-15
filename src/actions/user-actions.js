import {ActionType} from './types';

export const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status
    };
  },
  getUser: (user) => {
    return {
      type: ActionType.GET_USER,
      payload: user
    };
  }
};
