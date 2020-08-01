import React from 'react';

import OfferCard from '../offer-card/offer-card';

import {offerTypes} from '../../types';
import {Pages} from '../../const.js';

interface Props {
  offers: offerTypes[];
  page: typeof Pages;
}

const OffersList: React.FC<Props> = ({offers, page}: Props) => {
  const placeCardClass = (page === Pages.OFFER) ? `near-places__` : `cities__places-`;
  const tabsContentClass = (page === Pages.OFFER) ? `` : `tabs__content`;

  return (
    <div className={`${placeCardClass}list places__list ${tabsContentClass}`}>
      {offers.map((offer) => {
        return (
          <OfferCard
            key={offer.id}
            offer={offer}
            page={page}
          />
        );
      })}
    </div>
  );
};

export default OffersList;
