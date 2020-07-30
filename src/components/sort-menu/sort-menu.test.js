import React from 'react';
import renderer from 'react-test-renderer';

import SortMenu from './sort-menu';

import {SortType} from '../../const.js';

describe(`SortMenu`, () => {

  it(`SortMenu component should render correctly`, () => {
    const listRef = React.createRef();
    const component = renderer.create(
        <SortMenu
          listRef={listRef}
          isMenuHide={true}
          sortType={SortType.POPULAR}
          handleDropdownClick={()=>{}}
          onSortClick={()=>{}}
        />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
