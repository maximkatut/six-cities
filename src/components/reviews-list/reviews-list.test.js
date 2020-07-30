import renderer from 'react-test-renderer';
import React from 'react';

import {reviews} from '../../test-data';

import ReviewsList from './reviews-list.jsx';

describe(`ReviewsList`, () => {
  it(`ReviewsList should render correctly`, () => {
    const tree = renderer.create(
        <ReviewsList
          reviews = {reviews}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
