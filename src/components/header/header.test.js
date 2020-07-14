import React from 'react';
import renderer from 'react-test-renderer';
import Header from './header.jsx';
import {Provider} from 'react-redux';
import {store} from '../../test-data/store';
import {BrowserRouter} from 'react-router-dom';

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
