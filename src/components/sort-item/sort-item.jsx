import React from 'react';
import PropTypes from 'prop-types';

class SortItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    };
  }
  render() {
    const {onSortClick, sortType} = this.props;
    const {isActive} = this.state;
    const activeClass = isActive ? `places__option--active` : ``;
    return (
      <li
        className={`places__option ${activeClass}`}
        tabIndex={0}
        onClick={() => {
          onSortClick(sortType);
        }}
        onMouseEnter={() => {
          this.setState({
            isActive: true
          });
        }}
        onMouseLeave={() => {
          this.setState({
            isActive: false
          });
        }}
      >
        {sortType}
      </li>
    );
  }
}

SortItem.propTypes = {
  onSortClick: PropTypes.func.isRequired,
  sortType: PropTypes.string
};

export default SortItem;
