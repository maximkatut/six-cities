import React from 'react';
import Main from './main.jsx';
import Adapter from "enzyme-adapter-react-16";
import Enzyme from 'enzyme';

Enzyme.configure({
  adapter: new Adapter()
});

describe(`Main e2e`, () => {
  it(`Card title should be clicked`, () => {
    const onMainCardTitleClick = jest.fn();

    const main = Enzyme.shallow(
        <Main
          rentCount = {5}
          rentNames = {[
            `Beautiful & luxurious apartment at great location`,
            `Wood and stone place`,
            `Nice, cozy, warm big bed apartment`,
            `Canal View Prinsengracht`,
            `Huge house with fireplace`
          ]}
          onMainCardTitleClick = {onMainCardTitleClick}
        />
    );

    const titles = main.find(`.place-card__name a`);
    titles.forEach((title) => {
      title.simulate(`click`);
    });

    expect(onMainCardTitleClick.mock.calls.length).toBe(5);
  });
});
