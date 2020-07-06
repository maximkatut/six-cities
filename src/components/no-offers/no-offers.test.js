import NoOffers from './no-offers.jsx';
import React from 'react';
import renderer from 'react-test-renderer';

describe(`NoOffers`, () => {
  it(`NoOffers component should render correctly`, () => {
    const tree = renderer.create(
        <NoOffers/>
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
