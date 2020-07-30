import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';

import {offers} from '../../test-data';
import {store} from '../../test-data/store';

import OfferCard from './offer-card.jsx';
import {Pages} from '../../const';

describe(`OfferCard`, () => {
  it(`OfferCard component should render right`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <Provider store={store}>
            <OfferCard
              offer={offers[0]}
              page={Pages.MAIN}
            />
          </Provider>
        </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
