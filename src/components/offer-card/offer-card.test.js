import OfferCard from './offer-card.jsx';
import React from 'react';
import {offers} from '../../test-data';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../../test-data/store';

describe(`OfferCard`, () => {
  it(`OfferCard component should render right`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <OfferCard
            offer={offers[0]}
            onOfferCardHover={() => { }}
            onMainCardTitleClick={() => { }}
          />
        </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
