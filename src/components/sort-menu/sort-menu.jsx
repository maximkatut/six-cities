import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../actions/offers-actions';
import SortItem from '../sort-item/sort-item.jsx';
import {SortType} from '../../const';
import {extend} from '../../utils';

class SortMenu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isMenuHide: true,
      sortType: SortType.POPULAR
    };
    this._hideDropdown = this._hideDropdown.bind(this);
    this._handleDropdownClick = this._handleDropdownClick.bind(this);
  }

  _handleDropdownClick() {
    this.setState((prevState) => {
      return {
        isMenuHide: !prevState.isMenuHide
      };
    });
  }

  _hideDropdown() {
    this.setState({
      isMenuHide: true
    });
  }

  render() {
    const {onSortClick} = this.props;
    const {isMenuHide, sortType} = this.state;
    const isMenuHideClass = isMenuHide ? `` : `places__options--opened`;
    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by </span>
        <span
          className="places__sorting-type"
          tabIndex={0}
          onClick={this._handleDropdownClick}
        >
          {sortType}
          <svg className="places__sorting-arrow" width={7} height={4}>
            <use xlinkHref="#icon-arrow-select" />
          </svg>
        </span>
        <ul className={`places__options places__options--custom ${isMenuHideClass}`}>
          {Object.values(SortType).map((sort, index) => {
            return (
              <SortItem
                key={sort + index}
                sortType={sort}
                onSortClick={(_sortType) => {
                  this._hideDropdown();
                  onSortClick(_sortType);
                  this.setState({
                    sortType: _sortType
                  });
                }}
              />
            );
          })}
        </ul>
      </form>
    );
  }
}

SortMenu.propTypes = {
  onSortClick: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onSortClick(sortType, offersByCity) {
    dispatch(ActionCreator.changeSortType(sortType, offersByCity));
  }
});

const mapStateToProps = (state) => ({
  offers: state.offers.offers
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return extend({
    ownProps,
    stateProps,
    dispatchProps,
    onSortClick(sortType, offersByCity = stateProps.offers) {
      dispatchProps.onSortClick(sortType, offersByCity);
    }
  });
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SortMenu);
