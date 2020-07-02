import reducer, {initialState} from './map-reducer';
import {ActionType} from '../actions/types';

describe(`Reducer works correctly`, () => {
  it(`Reducer has to return initial state if new state is undefined`, () => {
    expect(reducer(undefined, {}))
    .toEqual(initialState);
  });

  it(`Reducer should return new state with new card id`, () => {
    expect(reducer({
      cardIdOnHover: -1,
    }, {
      type: ActionType.CHANGE_CARD_ON_HOVER,
      payload: 0
    })).toEqual({
      cardIdOnHover: 0
    });
  });
});
