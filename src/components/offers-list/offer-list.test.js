import OffersList from './offers-list.jsx';
import React from 'react';
import {offers} from '../../test-data';
import renderer from 'react-test-renderer';

describe(`OffersList`, () => {
  it(`OffersList component should render correctly`, () => {
    const tree = renderer.create(
        <OffersList
          offers={offers}
          onMainCardTitleClick={() => { }}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
