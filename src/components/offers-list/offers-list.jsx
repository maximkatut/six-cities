import React from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../offer-card/offer-card.jsx';

import {offerPropType} from '../../types';
import {Pages} from '../../const.js';

const OffersList = (props) => {
  const {offers, page} = props;
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

OffersList.propTypes = {
  offers: PropTypes.arrayOf(offerPropType).isRequired,
  page: PropTypes.string.isRequired
};

export default OffersList;
