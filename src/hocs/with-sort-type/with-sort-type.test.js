import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';

import {store} from '../../test-data/store';
import {ActionCreator} from '../../actions/offers-actions';
import {SortType} from '../../const.js';

import withSortMenu from './with-sort-type';

const MockComponent = (props) => {
  const {onSortClick} = props;

  return (
    <div>
      <li onClick={() => {
        onSortClick(SortType.POPULAR);
      }}></li>
    </div>
  );
};

MockComponent.propTypes = {
  onSortClick: PropTypes.func.isRequired
};

const MockComponentWrapped = withSortMenu(MockComponent);

describe(`withSortMenu`, () => {
  let component;

  store.dispatch = jest.fn();

  beforeEach(() => {
    component = renderer.create((
      <Provider store={store}>
        <MockComponentWrapped/>
      </Provider>
    ), {
      createNodeMock() {
        return {};
      }
    });
  });

  it(`withSortMenu is rendered correctly`, () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`withSortMenu should dispatch an action on sort-menu dropdown click`, () => {
    renderer.act(() => {
      component.root.findAllByType(`li`)[0].props.onClick();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
        ActionCreator.changeSortType(SortType.POPULAR)
    );
  });
});
