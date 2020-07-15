import React from 'react';
import renderer from 'react-test-renderer';

import ReviewForm from './review-form.jsx';

describe(`ReviewForm`, () => {
  it(`ReviewForm should render correctly`, () => {
    const tree = renderer.create(
        <ReviewForm
          isBusy={false}
          isDisabled={true}
          review={`hello`}
          rating={0}
          onFormSubmit={()=>{}}
          onRadioChange={()=>{}}
          onInputChange={()=>{}}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
