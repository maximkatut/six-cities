import React from 'react';
import {Provider} from 'react-redux';
import Enzyme, {mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {BrowserRouter} from 'react-router-dom';

import SignIn from './sign-in.jsx';

import {store} from '../../test-data/store';

Enzyme.configure({
  adapter: new Adapter()
});

describe(`Sign In`, () => {
  it(`Sign In should dispatch an action on button click`, () => {
    const mockEvent = {
      preventDefault() {}
    };

    store.dispatch = jest.fn();

    const signIn = mount(
        <BrowserRouter>
          <Provider store={store}>
            <SignIn />
          </Provider>
        </BrowserRouter>
    );

    signIn.find(`form`).at(0).simulate(`submit`, mockEvent);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
