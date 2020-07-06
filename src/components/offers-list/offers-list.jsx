import OfferCard from '../offer-card/offer-card.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import {offerPropType} from '../../types';
import SortMenu from '../sort-menu/sort-menu.jsx';
import withSortType from '../../hocs/with-sort-type/with-sort-type';
import {connect} from 'react-redux';

const SortMenuWrapped = withSortType(SortMenu);

const OffersList = (props) => {
  const {offers, isNearPlaces, activeCityName} = props;
  const placeCardClass = isNearPlaces ? `near-places__` : `cities__places-`;
  const tabsContentClass = isNearPlaces ? `` : `tabs__content`;

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {activeCityName}</b>
      <SortMenuWrapped/>
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
    </section>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(offerPropType).isRequired,
  isNearPlaces: PropTypes.bool,
  activeCityName: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  offers: state.offers.offers,
  activeCityName: state.offers.activeCityName
});

export default connect(mapStateToProps, null)(OffersList);
