import OfferCard from '../offer-card/offer-card.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import {offerPropType} from '../../types';
import {connect} from 'react-redux';
import {getOffersBySortType} from '../../reducers/data/selectors.js';

const OffersList = (props) => {
  const {offers, isNearPlaces, offersClosest} = props;
  const placeCardClass = isNearPlaces ? `near-places__` : `cities__places-`;
  const tabsContentClass = isNearPlaces ? `` : `tabs__content`;

  return (
    <div className={`${placeCardClass}list places__list ${tabsContentClass}`}>
      {((offersClosest) ? offersClosest : offers).map((offer) => {
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
  offersClosest: PropTypes.arrayOf(offerPropType),
  isNearPlaces: PropTypes.bool
};

const mapStateToProps = (state) => ({
  offers: getOffersBySortType(state),
});

export default connect(mapStateToProps, null)(OffersList);
