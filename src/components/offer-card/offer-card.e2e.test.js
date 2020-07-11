import Adapter from "enzyme-adapter-react-16";
import Enzyme from 'enzyme';
import OfferCard from './offer-card.jsx';
import React from 'react';
import {offers} from '../../test-data';
import {Provider} from 'react-redux';
import {store} from '../../test-data/store';
import renderer from 'react-test-renderer';
import {ActionCreator as MapActionCreator} from '../../actions/map-actions';
import {ActionCreator as OffersActionCreator} from '../../actions/offers-actions';

Enzyme.configure({
  adapter: new Adapter()
});

describe(`OfferCard e2e`, () => {
  let component;
  beforeEach(() => {

    store.dispatch = jest.fn();

    component = renderer.create(
        <Provider store={store}>
          <OfferCard
            offer={offers[0]}
          />
        </Provider>);
  });

  it(`Card title should dispatch an action`, () => {
    renderer.act(() => {
      component.root.findAllByType(`a`)[1].props.onClick();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(3);
    expect(store.dispatch).toHaveBeenCalledWith(
        OffersActionCreator.changeActiveOffer(offers[0])
    );
  });

  it(`MouseOver should dispatch an action`, () => {
    renderer.act(() => {
      component.root.findByType(`article`).props.onMouseEnter();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
        MapActionCreator.changeCardIdOnHover(1)
    );
  });
});
