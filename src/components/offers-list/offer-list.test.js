import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';

import {offers} from '../../test-data';
import {store} from '../../test-data/store';

import OffersList from './offers-list.jsx';
import {Pages} from '../../const';

describe(`OffersList`, () => {
  it(`OffersList component should render correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <Provider store={store}>
            <OffersList
              offers={offers}
              page={Pages.MAIN}
            />
          </Provider>
        </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
