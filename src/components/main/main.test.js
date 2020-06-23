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
        />,
        {createNodeMock: () => {
          return document.createElement(`div`);
        }})
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
