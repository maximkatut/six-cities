import React from 'react';
import Main from './main.jsx';
import renderer from 'react-test-renderer';
import {offerCards} from '../../utils/test-data.js';

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
