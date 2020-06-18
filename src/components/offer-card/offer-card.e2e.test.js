import Adapter from "enzyme-adapter-react-16";
import Enzyme from 'enzyme';
import OfferCard from './offer-card.jsx';
import React from 'react';
import {offers} from '../../test-data';

Enzyme.configure({
  adapter: new Adapter()
});

describe(`OfferCard e2e`, () => {
  const onMainCardTitleClick = jest.fn();
  const onOfferCardHover = jest.fn();

  const card = Enzyme.shallow(
      <OfferCard
        offer={offers[0]}
        onOfferCardHover={onOfferCardHover}
        onMainCardTitleClick={onMainCardTitleClick}
      />
  );

  it(`Card title should be clicked`, () => {
    const title = card.find(`.place-card__name a`);
    title.simulate(`click`);

    expect(onMainCardTitleClick).toHaveBeenCalledTimes(1);
  });

  it(`MouseOver event on article should pass object to handler`, () => {
    const article = card.find(`article`);
    article.simulate(`mouseOver`);

    expect(onOfferCardHover).toHaveBeenCalledTimes(1);
    expect(onOfferCardHover.mock.calls[0][0]).toMatchObject(offers[0]);
  });
});
