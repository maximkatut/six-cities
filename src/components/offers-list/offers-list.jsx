import React from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../offer-card/offer-card.jsx';

import {offerPropType} from '../../types';

const OffersList = (props) => {
  const {offers, isNearPlaces} = props;
  const placeCardClass = isNearPlaces ? `near-places__` : `cities__places-`;
  const tabsContentClass = isNearPlaces ? `` : `tabs__content`;

  return (
    <div className={`${placeCardClass}list places__list ${tabsContentClass}`}>
      {offers.map((offer) => {
        return (
          <OfferCard
            isNearPlaces={isNearPlaces}
            key={offer.id}
            offer={offer}
          />
        );
      })}
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(offerPropType).isRequired,
  isNearPlaces: PropTypes.bool
};

export default OffersList;
