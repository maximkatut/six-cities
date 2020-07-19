import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import withSortType from '../../hocs/with-sort-type/with-sort-type';

import {getOffersBySortType} from '../../reducers/data/selectors';
import {getActiveCity} from '../../reducers/offers/selectors';
import {offerPropType} from '../../types';

import CitiesList from '../cities-list/cities-list.jsx';
import Map from '../map/map.jsx';
import NoOffers from '../no-offers/no-offers.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import SortMenu from '../sort-menu/sort-menu.jsx';
import Header from '../header/header.jsx';


const SortMenuWrapped = withSortType(SortMenu);

const Main = (props) => {
  const {offers, activeCityName} = props;

  const renderOffersList = () => {
    return (
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {activeCityName}</b>
          <SortMenuWrapped/>
          <OffersList
            offers={offers}
          />
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map/>
          </section>
        </div>
      </div>
    );
  };

  const renderNoOffers = () => {
    return (
      <NoOffers activeCityName={activeCityName}/>
    );
  };

  const isOffers = offers.length > 0;

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className={`page__main page__main--index ${isOffers ? `` : `page__main--index-empty`}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList/>
          </section>
        </div>
        <div className="cities">
          {isOffers ? renderOffersList() : renderNoOffers()}
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  offers: PropTypes.arrayOf(offerPropType).isRequired,
  activeCityName: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  offers: getOffersBySortType(state),
  activeCityName: getActiveCity(state)
});

export default connect(mapStateToProps, null)(Main);
