import OffersList from './offers-list.jsx';
import React from 'react';
import {offers} from '../../test-data';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../../test-data/store';
import {BrowserRouter} from 'react-router-dom';

describe(`OffersList`, () => {
  it(`OffersList component should render correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <Provider store={store}>
            <OffersList
              offers={offers}
              onMainCardTitleClick={() => { }}
            />
          </Provider>
        </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
