import OfferCard from '../offer-card/offer-card.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import {offerPropType} from '../../types';

class OffersList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeOffer: null
    };
  }

  render() {
    const {offers, onMainCardTitleClick, isNearPlaces} = this.props;
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
              onMainCardTitleClick={onMainCardTitleClick}
              onOfferCardHover={(activeCard) => {
                this.setState({
                  activeOfferCard: activeCard
                });
              }}
            />
          );
        })}
      </div>
    );
  }
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(offerPropType).isRequired,
  onMainCardTitleClick: PropTypes.func.isRequired,
  isNearPlaces: PropTypes.bool
};

export default OffersList;
