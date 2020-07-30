import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import Header from './header.jsx';

import {store} from '../../test-data/store';

describe(`Header`, () => {
  it(`Header component should render correctly`, () => {
    store.dispatch = jest.fn();

    const component = renderer.create(
        <BrowserRouter>
          <Provider store={store}>
            <Header/>
          </Provider>
        </BrowserRouter>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
