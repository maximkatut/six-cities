import React from 'react';
import {reviewPropTypes} from '../../types';
import Review from '../review/review.jsx';
import {arrayOf} from 'prop-types';

const ReviewsList = ({reviews}) => {

  return (
    <ul className="reviews__list">
      {reviews.map((review) => {
        return <Review
          key={review.id}
          review={review}
        />;
      })}
    </ul>
  );
};

ReviewsList.propTypes = {
  reviews: arrayOf(reviewPropTypes)
};

export default ReviewsList;
