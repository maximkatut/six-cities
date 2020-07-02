import OffersList from './offers-list.jsx';
import React from 'react';
import {offers} from '../../test-data';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../../test-data/store';

describe(`OffersList`, () => {
  it(`OffersList component should render correctly`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <OffersList
            offers={offers}
            onMainCardTitleClick={() => { }}
          />
        </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
