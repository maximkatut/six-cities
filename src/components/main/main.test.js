import React from 'react';
import Main from './main.jsx';
import renderer from 'react-test-renderer';
import {rentNames} from '../../utils/testdata.js';

describe(`Main`, () => {
  it(`Main component should render correctly`, () => {
    const tree = renderer.create(
        <Main
          rentCount = {5}
          rentNames = {rentNames}
          onMainCardTitleClick = {() => {}}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
