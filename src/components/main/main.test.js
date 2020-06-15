import React from 'react';
import Main from './main.jsx';
import renderer from 'react-test-renderer';

describe(`Main`, () => {
  it(`Main component should render correctly`, () => {
    const tree = renderer.create(
        <Main
          rentCount = {5}
          rentNames = {[
            `Beautiful & luxurious apartment at great location`,
            `Wood and stone place`,
            `Nice, cozy, warm big bed apartment`,
            `Canal View Prinsengracht`,
            `Huge house with fireplace`
          ]}
          onMainCardTitleClick = {() => {}}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
