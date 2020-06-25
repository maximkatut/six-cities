import Offer from './offer.jsx';
import React from 'react';
import {offers, cities} from '../../test-data';
import renderer from 'react-test-renderer';

describe(`Offer`, () => {
  it(`Offer should render correctly`, () => {
    const tree = renderer.create(
        <Offer
          offer = {offers[0]}
          offers={offers}
          cities={cities}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
