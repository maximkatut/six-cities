import React from 'react';
import renderer from 'react-test-renderer';

import SortItem from './sort-item.jsx';

import {SortType} from '../../const.js';

describe(`SortItem`, () => {

  let component;
  const onSortClick = jest.fn();

  beforeEach(() => {

    component = renderer.create(
        <SortItem
          sortType={SortType.POPULAR}
          onSortClick={onSortClick}
        />
    );
  });

  it(`SortItem component should render correctly`, () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it(`SortItem should dispatch an action on sort-menu dropdown click`, () => {
    renderer.act(() => {
      component.root.findByType(`li`).props.onClick();
    });

    expect(onSortClick).toHaveBeenCalledTimes(1);
  });
});
