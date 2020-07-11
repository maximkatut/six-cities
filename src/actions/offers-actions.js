import {ActionType} from './types';

export const ActionCreator = {
  changeCity: (cityName) => {
    return {
      type: ActionType.CHANGE_CITY,
      payload: cityName
    };
  },
  changeSortType: (sortType) => {
    return {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: sortType
    };
  },
  changeActiveOffer: (activeOffer) => {
    return {
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: activeOffer
    };
  }
};
