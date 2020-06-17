import React from 'react';
import OffersList from './offers-list.jsx';
import renderer from 'react-test-renderer';
import {offerCards} from '../../utils/test-data.js';

describe(`OffersList`, () => {
  it(`OffersList component should render correctly`, () => {
    const tree = renderer.create(
        <OffersList
          offerCards = {offerCards}
          onMainCardTitleClick = {()=>{}}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
