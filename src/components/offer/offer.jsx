import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {getOffersNearby, getReviews} from '../../reducers/data/selectors';
import {offerFullPropType, reviewPropTypes} from '../../types';

import Header from '../header/header.jsx';
import Map from '../map/map.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import ReviewForm from '../review-form/review-form.jsx';
import withReview from '../../hocs/with-review/with-review';

import {getUserStatus} from '../../reducers/user/selectors';

const ReviewFormWrapped = withReview(ReviewForm);

const Offer = ({offer, reviews, offersNearby, userStatus}) => {
  const {
    appliences,
    bedrooms,
    description,
    guests,
    host,
    imagesGallery,
    offerType,
    premium,
    price,
    rate,
    title
  } = offer;

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {imagesGallery.slice(0, 6).map((image, index) => {
                return (
                  <div key={image + index} className="property__image-wrapper">
                    <img className="property__image" src={image} alt="Photo studio" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {
                premium ?
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                  :
                  ``
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${rate * 20}%`}} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rate}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offerType}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {guests} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {appliences.map((applince, index) => {
                    return (
                      <li key={applince + index} className="property__inside-item">
                        {appliences[index]}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${host.super ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={host.avatar} width={74} height={74} alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews · <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList
                  reviews={reviews}
                />
                {userStatus ?
                  <ReviewFormWrapped/> : ``
                }

              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              activeOffer={offer}
              offersClosest={offersNearby}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList
              offersClosest = {offersNearby}
              isNearPlaces
            />
          </section>
        </div>
      </main>
    </div>
  );
};

Offer.propTypes = {
  offer: offerFullPropType.isRequired,
  reviews: PropTypes.arrayOf(reviewPropTypes).isRequired,
  offersNearby: PropTypes.arrayOf(offerFullPropType.isRequired),
  userStatus: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  reviews: getReviews(state) || [],
  offersNearby: getOffersNearby(state) || [],
  userStatus: getUserStatus(state)
});

export default connect(mapStateToProps, null)(Offer);
