import React from 'react';
import Main from './main.jsx';
import Adapter from "enzyme-adapter-react-16";
import Enzyme from 'enzyme';
import {rentNames} from '../../testdata.js';

Enzyme.configure({
  adapter: new Adapter()
});

describe(`Main e2e`, () => {
  it(`Card title should be clicked`, () => {
    const onMainCardTitleClick = jest.fn();

    const main = Enzyme.shallow(
        <Main
          rentCount = {5}
          rentNames = {rentNames}
          onMainCardTitleClick = {onMainCardTitleClick}
        />
    );

    const titles = main.find(`.place-card__name a`);
    titles.forEach((title) => {
      title.simulate(`click`);
    });

    expect(onMainCardTitleClick.mock.calls.length).toBe(rentNames.length);
  });
});
