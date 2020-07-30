import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {withSortMenu} from './with-sort-type.js';

import {SortType} from '../../const.js';

Enzyme.configure({
  adapter: new Adapter()
});

describe(`HOC withSortType`, () => {

  let wrapper;
  const onSortClick = jest.fn();

  beforeEach(() => {
    const Component = () => {
      return <div>hello</div>;
    };

    const ComponentWrapped = withSortMenu(Component);

    wrapper = shallow(
        <ComponentWrapped
          onSortClick={onSortClick}
        />
    );
  });

  it(`Should change props isMenuHide`, () => {
    expect(wrapper).not.toBe(null);
    expect(wrapper.prop(`isMenuHide`)).toBeTruthy();

    wrapper.setState({
      isMenuHide: false,
    });

    expect(wrapper.prop(`isMenuHide`)).toBeFalsy();
  });

  it(`Click on menu arrow should change state isMenuHide`, () => {
    expect(wrapper.prop(`isMenuHide`)).toBeTruthy();

    wrapper.instance()._handleDropdownClick();

    expect(wrapper.prop(`isMenuHide`)).toBeFalsy();
  });

  it(`Click on menu should change SortType and isMenuHide`, () => {
    wrapper.setState({
      isMenuHide: false,
    });

    wrapper.instance()._handleSortClick(SortType.TOP);

    expect(wrapper.prop(`isMenuHide`)).toBeTruthy();
    expect(onSortClick).toHaveBeenCalled();
    expect(onSortClick).toHaveBeenCalledWith(SortType.TOP);
    expect(wrapper.state(`sortType`)).toEqual(SortType.TOP);
  });
});
