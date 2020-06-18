import Main from './main.jsx';
import React from 'react';
import {offers} from '../../test-data';
import renderer from 'react-test-renderer';

describe(`Main`, () => {
  it(`Main component should render correctly`, () => {
    const tree = renderer.create(
        <Main
          offers={offers}
          onMainCardTitleClick={() => { }}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
