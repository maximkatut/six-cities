import React from 'react';
import renderer from 'react-test-renderer';

import SortMenu from './sort-menu';

import {SortType} from '../../const';

describe(`SortMenu`, () => {

  it(`SortMenu component should render correctly`, () => {
    const listRef: React.RefObject<HTMLUListElement> = React.createRef();
    const component = renderer.create(
        <SortMenu
          listRef={listRef}
          isMenuHide={true}
          sortType={SortType.POPULAR}
          handleDropdownClick={()=>undefined}
          onSortClick={()=>undefined}
        />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
