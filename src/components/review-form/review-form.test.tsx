import React from 'react';
import renderer from 'react-test-renderer';

import ReviewForm from './review-form';

describe(`ReviewForm`, () => {
  it(`ReviewForm should render correctly`, () => {
    const onFormSubmit = jest.fn();
    const onRadioChange = jest.fn();
    const onInputChange = jest.fn();

    const tree = renderer.create(
        <ReviewForm
          isBusy={false}
          isDisabled={true}
          review={`hello`}
          rating={0}
          onFormSubmit={onFormSubmit}
          onRadioChange={onRadioChange}
          onInputChange={onInputChange}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
