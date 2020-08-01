import React from 'react';

import {SortType} from '../../const';

import SortItem from '../sort-item/sort-item';

interface Props {
  onSortClick: () => {};
  isMenuHide: boolean;
  sortType: string;
  handleDropdownClick: () => {};
  listRef: React.LegacyRef<HTMLUListElement>;
}

const SortMenu: React.FC<Props> = ({onSortClick, isMenuHide, sortType, handleDropdownClick, listRef}: Props) => {
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
        {Object.values(SortType).map((sort: string, index) => {
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

export default SortMenu;
