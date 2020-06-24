import React from 'react';
import {reviewPropTypes} from '../../types';

const Review = ({review}) => {

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatar} width={54} height={54} alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {review.user.userName}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${review.rate * 20}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.content}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">{review.date}</time>
      </div>
    </li>
  );
};

Review.propTypes = {
  review: reviewPropTypes
};

export default Review;
