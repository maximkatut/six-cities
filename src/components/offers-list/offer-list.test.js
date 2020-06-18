import OffersList from './offers-list.jsx';
import React from 'react';
import {offerCards} from '../../utils/test-data.js';
import renderer from 'react-test-renderer';

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
