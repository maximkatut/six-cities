import OfferCard from './offer-card.jsx';
import React from 'react';
import {offers} from '../../test-data';
import renderer from 'react-test-renderer';

describe(`OfferCard`, () => {
  it(`OfferCard component should render right`, () => {
    const tree = renderer.create(
        <OfferCard
          offer={offers[0]}
          onOfferCardHover={() => { }}
          onMainCardTitleClick={() => { }}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
