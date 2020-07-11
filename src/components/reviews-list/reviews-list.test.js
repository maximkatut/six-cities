import ReviewsList from './reviews-list.jsx';
import React from 'react';
import {reviews} from '../../test-data';
import renderer from 'react-test-renderer';

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
