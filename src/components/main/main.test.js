import Main from './main.jsx';
import React from 'react';
import {offers, cities} from '../../test-data';
import renderer from 'react-test-renderer';

describe(`Main`, () => {
  it(`Main component should render correctly`, () => {
    const tree = renderer.create(
        <Main
          offers={offers}
          cities={cities}
          onMainCardTitleClick={() => { }}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
