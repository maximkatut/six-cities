import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {ActionCreator as MapActionCreator} from '../../actions/map-actions';
import {Operation} from '../../reducers/data/data-reducer';
import {offerPropType} from '../../types';
import {Pages, PlaceCardClasses, ImageWrapperClasses, PlaceCardInfoClasses, ImageSizes, AppRoute} from '../../const';
import {getUserStatus} from '../../reducers/user/selectors';
import {AuthorizationStatus} from '../../reducers/user/user-reducer';
import history from '../../history';

const OfferCard = ({offer, onOfferCardHover, onFavotireButtonClick, page, userStatus}) => {
  const {title, offerType, mainImage, premium, price, rate, isFavorite} = offer;

  return (
    <article className={`${PlaceCardClasses[page]}card place-card`}
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

      <div className={`${ImageWrapperClasses[page]}__image-wrapper place-card__image-wrapper`}>
        <Link
          to={`${AppRoute.OFFER}/${offer.id}`}
        >
          <img className="place-card__image" src={mainImage} width={ImageSizes[page][0]} height={ImageSizes[page][1]} alt="Place image" />
        </Link>
      </div>
      <div className={`${PlaceCardInfoClasses[page]} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isFavorite ? `place-card__bookmark-button--active` : ``} button`}
            type="button"
            onClick={() => {
              if (userStatus === AuthorizationStatus.AUTH) {
                onFavotireButtonClick(offer.id, isFavorite, page === Pages.OFFER);
              } else {
                history.push(AppRoute.LOGIN);
              }
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
          <Link
            to={`${AppRoute.OFFER}/${offer.id}`}
          >
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{offerType}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  offer: offerPropType,
  onOfferCardHover: PropTypes.func.isRequired,
  onFavotireButtonClick: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
  userStatus: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  userStatus: getUserStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  onOfferCardHover(activeCard) {
    dispatch(MapActionCreator.changeCardIdOnHover(activeCard));
  },
  onFavotireButtonClick(id, isFavorite, isOfferPage) {
    dispatch(Operation.postFavorite(id, isFavorite, isOfferPage));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OfferCard);
