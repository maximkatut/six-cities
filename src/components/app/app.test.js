import React from 'react';
import App from './app.jsx';
import renderer from 'react-test-renderer';
import {offerCards} from '../../utils/test-data.js';

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
