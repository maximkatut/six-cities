import React from 'react';
import App from './app.jsx';
import renderer from 'react-test-renderer';
import {rentNames} from '../../testdata.js';

describe(`App`, () => {
  it(`App should render correctly`, () => {
    const tree = renderer.create(
        <App
          rentCount = {5}
          rentNames = {rentNames}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
