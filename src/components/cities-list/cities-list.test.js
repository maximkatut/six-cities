import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list.jsx';
import {Provider} from 'react-redux';
import {ActionCreator} from '../../actions/offers-actions';
import {store} from '../../test-data/store';

describe(`CitiesList`, () => {
  let component;

  beforeEach(() => {

    store.dispatch = jest.fn();

    component = renderer.create(
        <Provider store={store}>
          <CitiesList/>
        </Provider>);
  });

  it(`CitiesList component should render correctly`, () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it(`CitiesList should dispatch an action on button click`, () => {
    renderer.act(() => {
      component.root.findAllByType(`a`)[3].props.onClick();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(
        ActionCreator.changeCity(`Amsterdam`)
    );
    expect(store.dispatch).toHaveBeenCalledWith(
        ActionCreator.getOffers(`Amsterdam`)
    );
  });
});
