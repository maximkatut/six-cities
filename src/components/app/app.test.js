import App from './app.jsx';
import React from 'react';
import {offers} from '../../test-data';
import renderer from 'react-test-renderer';

describe(`App`, () => {
  it(`App should render correctly`, () => {
    const tree = renderer.create(
        <App
          offers = {offers}
        />,
        {createNodeMock: () => {
          return document.createElement(`div`);
        }})
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
