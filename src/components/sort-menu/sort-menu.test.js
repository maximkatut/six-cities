import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import SortMenu from './sort-menu.jsx';
import {store} from '../../test-data/store';
import {offers} from '../../test-data';
import {ActionCreator} from '../../actions/offers-actions';
import {SortType} from '../../const.js';

describe(`SortMenu`, () => {
  let component;

  store.dispatch = jest.fn();

  beforeEach(() => {
    component = renderer.create(
        <Provider store={store}>
          <SortMenu/>
        </Provider>);
  });

  it(`SortMenu component should render correctly`, () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it(`SortMenu should dispatch an action on sort-menu dropdown click`, () => {
    renderer.act(() => {
      component.root.findAllByType(`li`)[0].props.onClick();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
        ActionCreator.changeSortType(SortType.POPULAR, offers)
    );
  });
});
