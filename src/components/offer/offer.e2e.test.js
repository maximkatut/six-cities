import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Offer} from './offer';
import Spinner from '../spinner/spinner';

import {offers, reviews} from '../../test-data/index';
import {AuthorizationStatus} from '../../reducers/user/user-reducer.js';

configure({
  adapter: new Adapter()
});

describe(`Offer e2e`, () => {
  let wrapper;
  const match = {
    params: {
      id: `1`
    }
  };

  const onFavotireButtonClick = jest.fn();
  const getOfferData = jest.fn();
  window.scrollTo = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
        <Offer
          offers={offers}
          reviews={reviews}
          offersNearby={[offers[0]]}
          userStatus={AuthorizationStatus.NO_AUTH}
          onFavotireButtonClick={onFavotireButtonClick}
          match={match}
          location={{loc: `location`}}
          getOfferData={getOfferData}
        />
    );
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it(`Offer should update if id city has been changed`, () => {
    const spy = jest.spyOn(wrapper.instance(), `componentDidUpdate`);

    wrapper.setProps({
      offers: [offers[1]]
    });

    expect(spy).toHaveBeenCalled();
    expect(getOfferData).toHaveBeenCalled();
  });

  it(`Offer should update if location has been changed and go to top`, () => {
    const spy = jest.spyOn(wrapper.instance(), `componentDidUpdate`);

    wrapper.setProps({
      location: {loc: `location2`}
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });

  it(`Offer should render Spinner`, () => {
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });

  it(`Offer bookmark button should go to login if user no authorized`, () => {
    wrapper.setProps({
      location: {loc: `location2`}
    });

    const button = wrapper.find(`button`);
    expect(button.hasClass(`property__bookmark-button`)).toBeTruthy();
    button.simulate(`click`);
    expect(location.pathname).toBe(`/login`);
  });

  it(`Offer bookmark button should called cb if user authorized`, () => {
    wrapper.setProps({
      userStatus: AuthorizationStatus.AUTH
    });

    const button = wrapper.find(`button`);
    expect(button.hasClass(`property__bookmark-button`)).toBeTruthy();
    button.simulate(`click`);
    expect(onFavotireButtonClick).toHaveBeenCalledTimes(1);
    expect(onFavotireButtonClick).toHaveBeenCalledWith(1, true);
  });

});
