import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {withReview} from './with-review.js';

Enzyme.configure({
  adapter: new Adapter()
});

describe(`HOC withSortType`, () => {

  let wrapper;
  const postNewReview = jest.fn();

  beforeEach(() => {
    const Component = () => {
      return <div>hello</div>;
    };

    const ComponentWrapped = withReview(Component);

    wrapper = shallow(
        <ComponentWrapped
          postNewReview={postNewReview}
          isBusy={false}
          offerId={1}
        />
    );
  });

  it(`Should change props and state`, () => {
    expect(wrapper).not.toBe(null);
    expect(wrapper.prop(`isBusy`)).toBeFalsy();
    expect(wrapper.state(`isDisabled`)).toBeTruthy();

    wrapper.setState({
      isDisabled: false,
    });

    wrapper.setProps({
      isBusy: true,
    });

    expect(wrapper.state(`isDisabled`)).toBeFalsy();
    expect(wrapper.prop(`isBusy`)).toBeTruthy();
  });

  it(`If review have been changed and equal 48 symbols should not update state`, () => {
    expect(wrapper.state(`isDisabled`)).toBeTruthy();

    wrapper.setState({
      review: `Lorem ipsum dolor sit amet, pro solum dolore dene`,
      rating: 0
    });
    wrapper.update();

    expect(wrapper.state(`isDisabled`)).toBeTruthy();

  });

  it(`If review and rating have been changed and equal 48 symbols should not update state`, () => {
    expect(wrapper.state(`isDisabled`)).toBeTruthy();

    wrapper.setState({
      review: `Lorem ipsum dolor sit amet, pro solum dolore dene`,
      rating: 1
    });
    wrapper.update();

    expect(wrapper.state(`isDisabled`)).toBeTruthy();

  });

  it(`If review and rating have been changed and equal 50 symbols should update state`, () => {
    expect(wrapper.state(`isDisabled`)).toBeTruthy();

    wrapper.setState({
      review: `Lorem ipsum dolor sit amet, pro solum dolore deneff`,
      rating: 1
    });
    wrapper.update();

    expect(wrapper.state(`isDisabled`)).toBeFalsy();

  });

  it(`If review have been changed and equal 50 symbols should not update state`, () => {
    expect(wrapper.state(`isDisabled`)).toBeTruthy();

    wrapper.setState({
      review: `Lorem ipsum dolor sit amet, pro solum dolore deneff`,
      rating: 0
    });
    wrapper.update();

    expect(wrapper.state(`isDisabled`)).toBeTruthy();

  });

  it(`should post new review and put state = initialState`, () => {

    wrapper.setState({
      review: `Lorem ipsum dolor sit amet, pro solum dolore deneff`,
      rating: 5
    });

    expect(wrapper.state(`review`)).toEqual(`Lorem ipsum dolor sit amet, pro solum dolore deneff`);
    expect(wrapper.state(`rating`)).toEqual(5);

    wrapper.instance()._handleFormSubmit({preventDefault: ()=>{}});
    wrapper.update();

    expect(wrapper.state(`review`)).toEqual(``);
    expect(wrapper.state(`rating`)).toEqual(0);

    expect(postNewReview).toHaveBeenCalled();
    expect(postNewReview).toHaveBeenCalledWith({
      comment: `Lorem ipsum dolor sit amet, pro solum dolore deneff`,
      rating: 5,
      id: 1
    });
  });
});
