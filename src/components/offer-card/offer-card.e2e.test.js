import Adapter from "enzyme-adapter-react-16";
import Enzyme from 'enzyme';
import OfferCard from './offer-card.jsx';
import React from 'react';
import {offers} from '../../test-data';
import {Provider} from 'react-redux';
import {store} from '../../test-data/store';
import renderer from 'react-test-renderer';
import {ActionCreator} from '../../actions/map-actions';

Enzyme.configure({
  adapter: new Adapter()
});

describe(`OfferCard e2e`, () => {

  const onMainCardTitleClick = jest.fn();
  const onOfferCardHover = jest.fn();

  it(`Card title should be clicked`, () => {

    const card = Enzyme.mount(
        <Provider store={store}>
          <OfferCard
            offer={offers[0]}
            onOfferCardHover={onOfferCardHover}
            onMainCardTitleClick={onMainCardTitleClick}
          />
        </Provider>
    );

    const title = card.find(`.place-card__name a`);
    title.simulate(`click`);

    expect(onMainCardTitleClick).toHaveBeenCalledTimes(1);
  });

  it(`MouseOver should dispatch an action`, () => {
    store.dispatch = jest.fn();

    const component = renderer.create(
        <Provider store={store}>
          <OfferCard
            offer={offers[0]}
            onOfferCardHover={onOfferCardHover}
            onMainCardTitleClick={onMainCardTitleClick}
          />
        </Provider>
    );

    renderer.act(() => {
      component.root.findByType(`article`).props.onMouseEnter();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
        ActionCreator.changecardIdOnHover(1)
    );
  });
});
