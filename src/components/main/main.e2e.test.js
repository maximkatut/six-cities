import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Main} from './main.jsx';
import Spinner from '../spinner/spinner.jsx';

import {offers} from '../../test-data/index';

configure({
  adapter: new Adapter()
});

describe(`Main e2e`, () => {
  let wrapper;
  const setActiveCity = jest.fn();
  const match = {
    params: {
      city: `Gomel`
    }
  };

  beforeEach(() => {
    wrapper = shallow(
        <Main
          offers={offers}
          activeCityName={`Cologne`}
          isBusy={false}
          setActiveCity={setActiveCity}
          match={match}
        />
    );
  });

  afterAll(() => {
    wrapper.unmount();
  });
  it(`Main should update city has been changed`, () => {
    const spy = jest.spyOn(wrapper.instance(), `componentDidUpdate`);

    wrapper.setProps({
      match: {
        params: {
          city: `Paris`
        }
      }
    });

    expect(spy).toHaveBeenCalled();
    expect(setActiveCity).toHaveBeenCalled();
  });

  it(`Main should render noOffer component if offers.length = 0`, () => {
    wrapper.setProps({
      offers: [],
      isBusy: true
    });

    const spyOffers = jest.spyOn(wrapper.instance(), `renderOffersList`);
    const spyNoOffers = jest.spyOn(wrapper.instance(), `renderNoOffers`);

    expect(spyOffers).toHaveBeenCalledTimes(0);
    expect(spyNoOffers).toHaveBeenCalledTimes(0);
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });

  it(`Main should render OfferList component if offers.length > 0`, () => {
    const spyOffers = jest.spyOn(wrapper.instance(), `renderOffersList`);

    wrapper.setProps({
      offers: [offers[1]]
    });

    expect(spyOffers).toHaveBeenCalledTimes(1);
    expect(wrapper.find(Spinner)).toHaveLength(0);
  });

});
