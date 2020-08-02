import React from 'react';

interface Props {
  isBusy: boolean;
  isDisabled: boolean;
  review: string;
  rating: number;
  onFormSubmit: () => void;
  onRadioChange: () => void;
  onInputChange: () => void;
}

const COUNT_OF_STARS = 5;
const MAX_LENGTH = 300;
const MIN_LENGTH = 50;

const ReviewForm: React.FC<Props> = ({isBusy, isDisabled, review, rating, onFormSubmit, onRadioChange, onInputChange}: Props) => {
  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={onFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {new Array(COUNT_OF_STARS).fill(``).map((_, index, array) => {
          const id = array.length - index;
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
        minLength={MIN_LENGTH}
        maxLength={MAX_LENGTH}
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

export default ReviewForm;
