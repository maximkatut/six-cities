import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {offerPropType} from '../../types';
import CitiesList from '../cities-list/cities-list.jsx';
import Map from '../map/map.jsx';
import OfferList from '../offers-list/offers-list.jsx';
import SortMenu from '../sort-menu/sort-menu.jsx';

const Main = (props) => {
  const {offers, onMainCardTitleClick, activeCityName} = props;

  return <div className="page page--gray page--main">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList/>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {activeCityName}</b>
            <SortMenu/>
            <OfferList
              offers = {offers}
              onMainCardTitleClick = {onMainCardTitleClick}
            />
          </section>
          <div className="cities__right-section">
            <section className="cities__map map">
              <Map/>
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>;
};

Main.propTypes = {
  offers: PropTypes.arrayOf(offerPropType).isRequired,
  onMainCardTitleClick: PropTypes.func.isRequired,
  activeCityName: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  offers: state.offers.offers,
  activeCityName: state.offers.activeCityName
});

export default connect(mapStateToProps, null)(Main);
