import PropTypes from 'prop-types';
import React from 'react';

import {SortType} from '../../const';

import SortItem from '../sort-item/sort-item.jsx';

const SortMenu = ({onSortClick, isMenuHide, sortType, handleDropdownClick, listRef}) => {
  const isMenuHideClass = isMenuHide ? `` : `places__options--opened`;
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleDropdownClick}
      >
        {sortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isMenuHideClass}`}
        ref={listRef}
      >
        {Object.values(SortType).map((sort, index) => {
          return (
            <SortItem
              key={sort + index}
              sortType={sort}
              onSortClick={onSortClick}
            />
          );
        })}
      </ul>
    </form>
  );
};

SortMenu.propTypes = {
  onSortClick: PropTypes.func.isRequired,
  isMenuHide: PropTypes.bool.isRequired,
  sortType: PropTypes.string.isRequired,
  handleDropdownClick: PropTypes.func.isRequired,
  listRef: PropTypes.object.isRequired
};

export default SortMenu;
