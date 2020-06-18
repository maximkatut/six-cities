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
    const {offers, onMainCardTitleClick} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) => {
          return (
            <OfferCard
              key={offer.title + offer.id}
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
  onMainCardTitleClick: PropTypes.func.isRequired
};

export default OffersList;
