import React from 'react';
import renderer from 'react-test-renderer';

import Spinner from './spinner';

describe(`Spinner`, () => {

  it(`Spinner component should render correctly`, () => {

    const component = renderer.create(
        <Spinner/>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
