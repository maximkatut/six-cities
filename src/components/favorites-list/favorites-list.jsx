import React from 'react';
import {array} from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Header from '../header/header.jsx';
import OfferCard from '../offer-card/offer-card.jsx';

import {getFavoritesCity, getFavorites} from '../../reducers/data/selectors';
import {uncapitalize} from '../../utils/index.js';
import {AppRoute} from '../../const.js';

const FavoritesList = ({cities, favorites}) => {

  const isEmpty = favorites.length === 0;
  return (
    <div className="page">
      <Header />
      <main className={`page__main page__main--favorites ${isEmpty && `page__main--favorites-empty`}`}>
        <div className="page__favorites-container container">
          <section className={`favorites ${isEmpty && `favorites--empty`}`}>
            <h1 className={`favorites__title ${isEmpty && `visually-hidden`}`}>{isEmpty ? `Favorites (empty)` : `Saved listing`}</h1>
            {isEmpty ? (
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
              </div>
            ) : (
              <ul className="favorites__list">
                {cities.map((city, i) => {
                  return (
                    <li key={city + i} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link className="locations__item-link" to={`/${uncapitalize(city)}`}>
                            <span>{city}</span>
                          </Link>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {favorites.map((offer) => {
                          if (offer.city.name === city) {
                            return (
                              <OfferCard
                                page={`FAVORITES_PAGE`}
                                key={offer.id}
                                offer={offer}
                              />
                            );
                          }
                          return ``;
                        })}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.ROOT}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </Link>
      </footer>
    </div>
  );
};

FavoritesList.propTypes = {
  cities: array.isRequired,
  favorites: array.isRequired
};

const mapStateToProps = (state) => ({
  cities: getFavoritesCity(state),
  favorites: getFavorites(state)
});

export default connect(mapStateToProps)(FavoritesList);
