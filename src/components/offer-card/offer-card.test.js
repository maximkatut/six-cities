import OfferCard from './offer-card.jsx';
import React from 'react';
import {offerCards} from '../../utils/test-data.js';
import renderer from 'react-test-renderer';

describe(`OfferCard`, () => {
  it(`OfferCard component should render right`, () => {
    const tree = renderer.create(
        <OfferCard
          offerCard = {offerCards[0]}
          onOfferCardHover = {()=>{}}
          onMainCardTitleClick = {()=>{}}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
