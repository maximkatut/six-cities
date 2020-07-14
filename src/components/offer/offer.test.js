import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';

import {offers} from '../../test-data';
import {store} from '../../test-data/store';

import Offer from './offer.jsx';

describe(`Offer`, () => {
  it(`Offer should render correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <Provider store={store}>
            <Offer
              offer = {offers[0]}
            />
          </Provider>
        </BrowserRouter>
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
