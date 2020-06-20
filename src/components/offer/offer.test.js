import Offer from './offer.jsx';
import React from 'react';
import {offers} from '../../test-data';
import renderer from 'react-test-renderer';

describe(`Offer`, () => {
  it(`Offer should render correctly`, () => {
    const tree = renderer.create(
        <Offer
          offer = {offers[0]}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
