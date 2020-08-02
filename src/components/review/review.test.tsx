import React from 'react';
import renderer from 'react-test-renderer';

import {reviews} from '../../test-data';

import Review from './review';

describe(`Review`, () => {
  it(`Review should render correctly`, () => {
    const tree = renderer.create(
        <Review
          review = {reviews[0]}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
