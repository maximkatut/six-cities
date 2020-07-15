import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import SignIn from './sign-in.jsx';

import {store} from '../../test-data/store';

describe(`Sign In`, () => {
  it(`Sign In component should render correctly`, () => {

    store.dispatch = jest.fn();

    const component = renderer.create(
        <BrowserRouter>
          <Provider store={store}>
            <SignIn />
          </Provider>
        </BrowserRouter>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
