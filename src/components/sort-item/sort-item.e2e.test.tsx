import React from 'react';

import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {SortType} from '../../const';

import SortItem from './sort-item';

configure({
  adapter: new Adapter()
});

describe(`SortItem e2e`, () => {
  let wrapper;

  const sortType = SortType.POPULAR;
  let onSortClick;

  beforeEach(() => {
    onSortClick = jest.fn();

    wrapper = mount(
        <SortItem
          sortType={sortType}
          onSortClick={onSortClick}
        />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it(`SortItem should called with cb`, () => {
    const item = wrapper.find(`li`).at(0);
    expect(item.hasClass(`places__option`)).toBe(true);

    item.simulate(`click`);

    expect(onSortClick).toHaveBeenCalledTimes(1);
    expect(onSortClick).toHaveBeenCalledWith(SortType.POPULAR);
  });

  it(`SortItem should called cb with different props`, () => {
    const item = wrapper.find(`li`).at(0);
    wrapper.setProps({sortType: SortType.TOP});
    item.simulate(`click`);

    expect(onSortClick).toHaveBeenCalledTimes(1);
    expect(onSortClick).toHaveBeenCalledWith(SortType.TOP);
  });
});
