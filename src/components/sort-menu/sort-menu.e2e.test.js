import React from 'react';

import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {SortType} from '../../const';

import SortMenu from './sort-menu';

configure({
  adapter: new Adapter()
});

describe(`SortMenu e2e`, () => {
  let wrapper;

  const isMenuHide = true;
  const sortType = SortType.POPULAR;
  const onSortClick = jest.fn();
  const onDropdownClick = jest.fn();
  const listRef = React.createRef();

  beforeEach(() => {
    wrapper = mount(
        <SortMenu
          listRef={listRef}
          isMenuHide={isMenuHide}
          sortType={sortType}
          handleDropdownClick={onDropdownClick}
          onSortClick={onSortClick}
        />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it(`SortMenu should be hidden and open after props have been changed`, () => {
    let menu = wrapper.find(`.places__options`);
    expect(menu.hasClass(`places__options--opened`)).toBe(false);

    wrapper.setProps({isMenuHide: false});

    menu = wrapper.find(`.places__options`);
    expect(menu.hasClass(`places__options--opened`)).toBe(true);
  });

  it(`SortMenu should called cb on click`, () => {
    let arrow = wrapper.find(`.places__sorting-type`);

    arrow.simulate(`click`);

    expect(onDropdownClick).toHaveBeenCalled();
  });
});
