import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';
import Enzyme, {mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

import {store} from '../../test-data/store';
import withReview from './with-review';

Enzyme.configure({
  adapter: new Adapter()
});

const MockComponent = (props) => {
  const {onFormSubmit, onRadioChange, onInputChange, review} = props;

  return (
    <form onSubmit={onFormSubmit}>
      <input onChange={onRadioChange}></input>
      <textarea onChange={onInputChange} value={review}/>
    </form>
  );
};

MockComponent.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onRadioChange: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  review: PropTypes.string.isRequired
};

const MockComponentWrapped = withReview(MockComponent);

describe(`withReview`, () => {
  it(`withReview is rendered correctly`, () => {
    const postNewReview = jest.fn();
    const component = renderer.create((
      <Provider store={store}>
        <MockComponentWrapped
          offerId={1}
          postNewReview={postNewReview}
          isBusy={false}
        />
      </Provider>
    ), {
      createNodeMock() {
        return {};
      }
    });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`withReview should dispatch an operation after form submit`, () => {
    const postNewReview = jest.fn();

    const mockEvent = {
      preventDefault() {
        return undefined;
      }
    };

    const wrapper = mount(
        <Provider store={store}>
          <MockComponentWrapped offerId={1} postNewReview={postNewReview} isBusy={false}/>
        </Provider>
    );

    wrapper.find(`form`).at(0).simulate(`submit`, mockEvent);

    expect(postNewReview).toHaveBeenCalledTimes(1);
  });
});
