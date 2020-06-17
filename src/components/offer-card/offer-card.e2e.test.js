import React from 'react';
import OfferCard from './offer-card.jsx';
import Adapter from "enzyme-adapter-react-16";
import Enzyme from 'enzyme';
import {offerCards} from '../../utils/test-data.js';

Enzyme.configure({
  adapter: new Adapter()
});

describe(`OfferCard e2e`, () => {
  const onMainCardTitleClick = jest.fn();
  const onOfferCardHover = jest.fn();

  const card = Enzyme.shallow(
      <OfferCard
        offerCard = {offerCards[0]}
        onOfferCardHover = {onOfferCardHover}
        onMainCardTitleClick = {onMainCardTitleClick}
      />
  );

  it(`Card title should be clicked`, () => {
    const title = card.find(`.place-card__name a`);
    title.simulate(`click`);

    expect(onMainCardTitleClick.mock.calls.length).toBe(1);
  });

  it(`MouseOver event on article should be passed to handler`, () => {
    const article = card.find(`article`);
    article.simulate(`mouseOver`);

    expect(onOfferCardHover.mock.calls.length).toBe(1);
  });
});
