import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {ActionCreator as MapActionCreator} from '../../actions/map-actions';
import {ActionCreator as OffersActionCreator} from '../../actions/offers-actions';
import {Operation} from '../../reducers/data/data-reducer';
import {offerPropType} from '../../types';

const OfferCard = (props) => {
  const {offer, onMainCardTitleClick, onOfferCardHover, onFavotireButtonClick, isNearPlaces} = props;
  const {title, offerType, mainImage, premium, price, rate, isFavorite} = offer;

  const placeCardClass = isNearPlaces ? `near-places__` : `cities__place-`;
  const imageWrapperClass = isNearPlaces ? `near-places` : `cities`;

  const favoriteButtonActiveClass = isFavorite ? `place-card__bookmark-button--active` : ``;

  return (
    <article className={`${placeCardClass}card place-card`}
      onMouseEnter={() => {
        onOfferCardHover(offer.id);
      }}
      onMouseLeave={() => {
        onOfferCardHover(-1);
      }}
    >
      {premium ? <div className="place-card__mark">
        <span>Premium</span>
      </div> : ``}
      <div className={`${imageWrapperClass}__image-wrapper place-card__image-wrapper`}>
        <a
          to={`/`}
          onClick={() => {
            onMainCardTitleClick(offer, isFavorite);
          }}
        >
          <img className="place-card__image" src={mainImage} width={260} height={200} alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${favoriteButtonActiveClass} button`}
            type="button"
            onClick={() => {
              onFavotireButtonClick(offer.id, isFavorite, isNearPlaces);
            }}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.floor(rate) * 20}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a
            onClick={() => {
              onMainCardTitleClick(offer, isFavorite);
            }}
            to={`/`}
          >
            {title}
          </a>
        </h2>
        <p className="place-card__type">{offerType}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  onMainCardTitleClick: PropTypes.func.isRequired,
  offer: offerPropType,
  onOfferCardHover: PropTypes.func.isRequired,
  onFavotireButtonClick: PropTypes.func.isRequired,
  isNearPlaces: PropTypes.bool
};

const mapDispatchToProps = (dispatch) => ({
  onOfferCardHover(activeCard) {
    dispatch(MapActionCreator.changeCardIdOnHover(activeCard));
  },
  onMainCardTitleClick(activeOffer) {
    dispatch(OffersActionCreator.changeActiveOffer(activeOffer));
    dispatch(Operation.loadReviews());
    dispatch(Operation.loadOffersNearby());
  },
  onFavotireButtonClick(id, isFavorite, isOfferPage) {
    dispatch(Operation.postFavorite(id, isFavorite, isOfferPage));
  }
});

export default connect(null, mapDispatchToProps)(OfferCard);
