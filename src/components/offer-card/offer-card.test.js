import OfferCard from './offer-card.jsx';
import React from 'react';
import {offers} from '../../test-data';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../../test-data/store';
import {BrowserRouter} from 'react-router-dom';

describe(`OfferCard`, () => {
  it(`OfferCard component should render right`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <Provider store={store}>
            <OfferCard
              offer={offers[0]}
              onOfferCardHover={() => { }}
              onMainCardTitleClick={() => { }}
            />
          </Provider>
        </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
