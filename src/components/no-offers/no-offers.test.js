import React from 'react';
import renderer from 'react-test-renderer';

import NoOffers from './no-offers.jsx';
describe(`NoOffers`, () => {
  it(`NoOffers component should render correctly`, () => {
    const tree = renderer.create(
        <NoOffers
          activeCityName={`Paris`}
        />
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
