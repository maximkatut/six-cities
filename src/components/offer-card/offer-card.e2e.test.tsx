import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';

import {ActionCreator as MapActionCreator} from '../../actions/map-actions';
import {offers} from '../../test-data';
import {store} from '../../test-data/store';

import OfferCard from './offer-card';
import {Pages} from '../../const';

describe(`OfferCard e2e`, () => {
  let component;

  beforeEach(() => {
    store.dispatch = jest.fn();

    component = renderer.create(
        <BrowserRouter>
          <Provider store={store}>
            <OfferCard
              offer={offers[0]}
              page={Pages.MAIN}
            />
          </Provider>
        </BrowserRouter>);
  });

  it(`MouseOver should dispatch an action with card id`, () => {
    renderer.act(() => {
      component.root.findByType(`article`).props.onMouseEnter();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
        MapActionCreator.changeCardIdOnHover(1)
    );
  });

  it(`MouseLeave should dispatch an action with "-1"`, () => {
    renderer.act(() => {
      component.root.findByType(`article`).props.onMouseLeave();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
        MapActionCreator.changeCardIdOnHover(-1)
    );
  });

});
