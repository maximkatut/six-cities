import React from 'react';
import App from './app.jsx';
import renderer from 'react-test-renderer';

describe(`App`, () => {
  it(`App should render correctly`, () => {
    const tree = renderer.create(
        <App
          rentCount = {5}
          rentNames = {[
            `Beautiful & luxurious apartment at great location`,
            `Wood and stone place`,
            `Nice, cozy, warm big bed apartment`,
            `Canal View Prinsengracht`,
            `Huge house with fireplace`
          ]}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
