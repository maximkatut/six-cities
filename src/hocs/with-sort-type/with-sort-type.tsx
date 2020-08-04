import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Subtract} from "utility-types";

import {ActionCreator} from '../../actions/offers-actions';
import {SortType} from '../../const';

interface InjectingProps {
  onSortClick: (sortType: string) => void;
}
interface State {
  isMenuHide: boolean;
  sortType: typeof SortType;
}


const withSortMenu = (Component) => {

  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithSortMenu extends React.PureComponent<T, State> {
    _sortListRef: React.RefObject<HTMLDListElement>;

    constructor(props) {
      super(props);

      this._sortListRef = React.createRef();

      this.state = {
        isMenuHide: true,
        sortType: SortType.POPULAR
      };

      this._hideDropdown = this._hideDropdown.bind(this);
      this._handleDropdownClick = this._handleDropdownClick.bind(this);
      this._handleSortClick = this._handleSortClick.bind(this);
      this._handleClickOutside = this._handleClickOutside.bind(this);
    }

    _handleClickOutside(event) {
      if (this._sortListRef && !this._sortListRef.current.contains(event.target) && !this.state.isMenuHide) {
        this.setState({
          isMenuHide: true
        });
      }
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

    _handleSortClick(_sortType) {
      const {onSortClick} = this.props;
      this._hideDropdown();
      onSortClick(_sortType);
      this.setState({
        sortType: _sortType
      });
    }

    componentDidMount() {
      document.addEventListener(`mousedown`, this._handleClickOutside);
    }

    componentWillUnmount() {
      document.removeEventListener(`mousedown`, this._handleClickOutside);
    }

    render() {
      const {isMenuHide, sortType} = this.state;
      return (
        <Component
          {...this.props}
          listRef={this._sortListRef}
          isMenuHide={isMenuHide}
          sortType={sortType}
          handleDropdownClick={this._handleDropdownClick}
          onSortClick={this._handleSortClick}
        />
      );
    }
  }
  return WithSortMenu;
};

const mapDispatchToProps = (dispatch) => ({
  onSortClick(sortType) {
    dispatch(ActionCreator.changeSortType(sortType));
  }
});

const composedWithSortMenu = compose(
    connect(null, mapDispatchToProps),
    withSortMenu
);

export {withSortMenu};
export default composedWithSortMenu;
