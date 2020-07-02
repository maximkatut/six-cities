import Offer from './offer.jsx';
import React from 'react';
import {offers} from '../../test-data';
import renderer from 'react-test-renderer';
import {store} from '../../test-data/store';
import {Provider} from 'react-redux';

describe(`Offer`, () => {
  it(`Offer should render correctly`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <Offer
            offer = {offers[0]}
            onMainCardTitleClick={() => { }}
          />
        </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
