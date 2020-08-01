import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Subtract} from "utility-types";

import {Operation} from '../../reducers/data/data-reducer';
import {getStatusRequest} from '../../reducers/data/selectors';
import {MESSAGE_LENGTH} from '../../const';

interface InjectingProps {
  postNewReview: ({}) => void;
  isBusy: boolean;
  offerId: number;
}
interface State {
  id: number;
  review: string;
  rating: number;
  isDisabled: boolean;
}

const withReview = (Component) => {

  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithReview extends React.PureComponent<T, State> {
    constructor(props: T) {
      super(props);

      this.state = {
        id: props.offerId,
        review: ``,
        rating: 0,
        isDisabled: true
      };

      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleRadioChange = this._handleRadioChange.bind(this);
      this._handleInputChange = this._handleInputChange.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
      if (props.offerId !== state.id) {
        return {
          id: props.offerId
        };
      }
      return null;
    }

    _handleFormSubmit(evt) {
      const {postNewReview} = this.props;
      const {review, rating, id} = this.state;
      evt.preventDefault();
      postNewReview({comment: review, rating, id});
      this.setState({
        review: ``,
        rating: 0
      });
    }

    _handleRadioChange(evt) {
      this.setState({
        rating: Number(evt.target.value)
      });
    }

    _handleInputChange(evt) {
      this.setState({
        review: evt.target.value
      });
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.review !== this.state.review || prevState.rating !== this.state.rating) {
        this.setState((state) => ({
          isDisabled: (state.review.length > MESSAGE_LENGTH && state.rating > 0) ? false : true
        }));
      }
    }

    render() {
      const {isDisabled, review, rating} = this.state;
      const {isBusy} = this.props;
      return (
        <Component
          {...this.props}
          isDisabled={isDisabled}
          isBusy={isBusy}
          review={review}
          rating={rating}
          onFormSubmit={this._handleFormSubmit}
          onRadioChange={this._handleRadioChange}
          onInputChange={this._handleInputChange}
        />
      );
    }
  }
  return WithReview;
};

const mapDispatchToProps = (dispatch) => ({
  postNewReview(review) {
    dispatch(Operation.postReview(review));
  }
});

const mapStateToProps = (state) => ({
  isBusy: getStatusRequest(state)
});

const composedWithReview = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withReview
);

export {withReview};
export default composedWithReview;
