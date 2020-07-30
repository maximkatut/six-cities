import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Map} from './map';

import {offers} from '../../test-data/index';

configure({
  adapter: new Adapter()
});

describe(`Map e2e`, () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
        <Map
          activeOffer={offers[0]}
          activeCityName={`Gomel`}
          offers={offers}
          cardIdOnHover={1}
          offersClosest={[offers[1]]}
        />
    );
  });

  afterAll(() => {
    wrapper.unmount();
  });
  it(`Map should update if card id has been changed`, () => {

    const spy = jest.spyOn(wrapper.instance(), `componentDidUpdate`);

    wrapper.setProps({
      cardIdOnHover: 2
    });

    wrapper.setProps({
      cardIdOnHover: -1
    });

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it(`Map should update if offersClosest has been changed`, () => {

    const spy = jest.spyOn(wrapper.instance(), `componentDidUpdate`);

    wrapper.setProps({
      offersClosest: [offers[0]]
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`Map should update if activeCityName has been changed`, () => {

    const spy = jest.spyOn(wrapper.instance(), `componentDidUpdate`);

    wrapper.setProps({
      activeCityName: `Paris`
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`Map should update if activeOffer has been changed`, () => {

    const spy = jest.spyOn(wrapper.instance(), `componentDidUpdate`);

    wrapper.setProps({
      activeOffer: offers[1]
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
