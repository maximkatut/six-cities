import React from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card.jsx';

class OffersList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeOfferCard: null
    };
  }

  render() {
    const {offerCards, onMainCardTitleClick} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offerCards.map((offerCard) => {
          return (
            <OfferCard
              key={offerCard.title + offerCard.id}
              offerCard={offerCard}
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
  offerCards: PropTypes.array.isRequired,
  onMainCardTitleClick: PropTypes.func.isRequired
};

export default OffersList;
