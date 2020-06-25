import Review from './review.jsx';
import React from 'react';
import {offers} from '../../test-data';
import renderer from 'react-test-renderer';

describe(`Review`, () => {
  it(`Review should render correctly`, () => {
    const tree = renderer.create(
        <Review
          review = {offers[0].reviews[0]}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
