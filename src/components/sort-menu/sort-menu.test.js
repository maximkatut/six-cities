import React from 'react';
import renderer from 'react-test-renderer';
import SortMenu from './sort-menu.jsx';
import {SortType} from '../../const.js';

describe(`SortMenu`, () => {

  it(`SortMenu component should render correctly`, () => {

    const component = renderer.create(
        <SortMenu
          isMenuHide={true}
          sortType={SortType.POPULAR}
          handleDropdownClick={()=>{}}
          onSortClick={()=>{}}
        />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
