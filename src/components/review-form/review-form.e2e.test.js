import React from 'react';

import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ReviewForm from './review-form';

configure({
  adapter: new Adapter()
});

describe(`ReviewForm`, () => {
  let wrapper;
  const review = `Hello`;
  const rating = 0;

  const onFormSubmit = jest.fn();
  const onRadioChange = jest.fn();
  const onInputChange = jest.fn();

  beforeEach(() => {
    wrapper = mount(
        <ReviewForm
          isBusy={false}
          isDisabled={true}
          review={review}
          rating={rating}
          onFormSubmit={onFormSubmit}
          onRadioChange={onRadioChange}
          onInputChange={onInputChange}
        />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it(`ReviewForm should disable inputs`, () => {
    const form = wrapper.find(`form`);
    const input = wrapper.find(`textarea`);
    const inputStar = wrapper.find(`input[name="rating"]`).at(0);

    expect(form.hasClass(`reviews__form`)).toEqual(true);
    expect(wrapper.props().isBusy).toBe(false);

    expect(inputStar.props().disabled).toEqual(false);
    expect(input.props().disabled).toEqual(false);

    wrapper.setProps({isBusy: true});

    expect(wrapper.props().isBusy).toBe(true);

    const changedInput = wrapper.find(`textarea`);
    const changedinputStar = wrapper.find(`input[name="rating"]`).at(0);
    expect(changedInput.props().disabled).toEqual(true);
    expect(changedinputStar.props().disabled).toEqual(true);
  });

  it(`ReviewForm should disable button`, () => {
    let button = wrapper.find(`button`);

    expect(button.props().disabled).toEqual(true);

    wrapper.setProps({isBusy: true});

    button = wrapper.find(`button`);
    expect(button.props().disabled).toEqual(true);

    wrapper.setProps({isBusy: false, isDisabled: false});

    button = wrapper.find(`button`);
    expect(button.props().disabled).toEqual(false);
  });

  it(`ReviewForm should post on submit`, () => {
    const form = wrapper.find(`form`);

    form.simulate(`submit`, {preventDefault: ()=>{}});

    expect(onFormSubmit).toHaveBeenCalledTimes(1);
  });

  it(`ReviewForm textarea should call function on change`, () => {
    const input = wrapper.find(`textarea`);

    input.simulate(`change`, {preventDefault: ()=>{}});

    expect(onInputChange).toHaveBeenCalledTimes(1);
  });

  it(`ReviewForm radio input should call function on change`, () => {
    const inputStar1 = wrapper.find(`input[name="rating"]`).at(0);
    const inputStar2 = wrapper.find(`input[name="rating"]`).at(1);

    inputStar1.simulate(`change`, {preventDefault: ()=>{}});
    inputStar2.simulate(`change`, {preventDefault: ()=>{}});

    expect(onRadioChange).toHaveBeenCalledTimes(2);
  });

  it(`ReviewForm should recieve comment`, () => {
    let input = wrapper.find(`textarea`);
    expect(input.props().value).toBe(`Hello`);

    wrapper.setProps({review: `Hi`});

    input = wrapper.find(`textarea`);
    expect(input.props().value).toBe(`Hi`);
  });
});
