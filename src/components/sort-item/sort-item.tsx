import React from 'react';

interface Props {
  onSortClick: (sortType: string) => void;
  sortType?: string;
}

const SortItem: React.FC<Props> = ({onSortClick, sortType}: Props) => {
  return (
    <li
      className="places__option"
      tabIndex={0}
      onClick={() => {
        onSortClick(sortType);
      }}
    >
      {sortType}
    </li>
  );
};

export default SortItem;
