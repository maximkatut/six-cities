import React from 'react';
import {arrayOf} from 'prop-types';

import {reviewPropTypes} from '../../types';

import Review from '../review/review';

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
