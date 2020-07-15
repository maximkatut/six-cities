import React from 'react';
import {func, bool, string, number} from 'prop-types';

const COUNT_OF_STARS = 5;

const ReviewForm = (props) => {
  const {isBusy, isDisabled, review, rating, onFormSubmit, onRadioChange, onInputChange} = props;
  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={onFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {new Array(COUNT_OF_STARS).fill(``).map((_, id) => {
          id = id + 1;
          return (
            <React.Fragment key={id}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                defaultValue={id}
                id={`${id}-stars`}
                type="radio"
                onChange={onRadioChange}
                disabled={isBusy}
                checked={rating === id}
              />
              <label htmlFor={`${id}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </React.Fragment>
          );
        }).sort((a, b) => {
          return b.key - a.key;
        })}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={onInputChange}
        disabled={isBusy}
        minLength="50"
        maxLength="300"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least
          <b className="reviews__text-amount"> 50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isBusy || isDisabled}>
          Submit
        </button>
      </div>
    </form>
  );
};


ReviewForm.propTypes = {
  isBusy: bool.isRequired,
  isDisabled: bool.isRequired,
  review: string.isRequired,
  rating: number.isRequired,
  onFormSubmit: func.isRequired,
  onRadioChange: func.isRequired,
  onInputChange: func.isRequired
};

export default ReviewForm;
