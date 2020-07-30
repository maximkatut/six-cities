import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';

import FavoritesList from './favorites-list.jsx';

import {store} from '../../test-data/store';
import {BrowserRouter} from 'react-router-dom';

describe(`FavoritesList`, () => {
  it(`FavoritesList component should render correctly`, () => {

    const component = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <FavoritesList/>
          </BrowserRouter>
        </Provider>);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
