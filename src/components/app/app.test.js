import App from './app.jsx';
import React from 'react';
import {offerCards} from '../../utils/test-data.js';
import renderer from 'react-test-renderer';

describe(`App`, () => {
  it(`App should render correctly`, () => {
    const tree = renderer.create(
        <App
          offerCards = {offerCards}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
