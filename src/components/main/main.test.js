import Main from './main.jsx';
import React from 'react';
import {offerCards} from '../../utils/test-data.js';
import renderer from 'react-test-renderer';

describe(`Main`, () => {
  it(`Main component should render correctly`, () => {
    const tree = renderer.create(
        <Main
          offerCards = {offerCards}
          onMainCardTitleClick = {() => {}}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
