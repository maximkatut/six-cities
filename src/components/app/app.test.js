import App from './app.jsx';
import React from 'react';
import {offers, cities} from '../../test-data';
import renderer from 'react-test-renderer';

describe(`App`, () => {
  it(`App should render correctly`, () => {
    const tree = renderer.create(
        <App
          offers = {offers}
          cities = {cities}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
