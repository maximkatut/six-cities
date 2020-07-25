import React from 'react';
import {Provider} from 'react-redux';
import Enzyme, {mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {BrowserRouter, Router} from 'react-router-dom';

import {createMemoryHistory} from "history";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from 'react-dom/test-utils';

import SignIn from './sign-in.jsx';

import {store} from '../../test-data/store';

Enzyme.configure({
  adapter: new Adapter()
});

describe(`Sign In e2e`, () => {

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

  it(`should go to main page with city route`, () => {
    const root = document.createElement(`div`);
    document.body.appendChild(root);

    const history = createMemoryHistory();
    render(
        <Router history={history}>
          <Provider store={store}>
            <SignIn/>
          </Provider>
        </Router>,
        root
    );

    act(() => {
      const goAmsterdam = document.querySelector(`.locations__item-link`);
      goAmsterdam.dispatchEvent(new MouseEvent(`click`, {bubbles: true}));
    });

    expect(history.location.pathname).toBe(`/amsterdam`);
    unmountComponentAtNode(root);
  });

  it(`SignIn redirect to main page if user have been auth`, () => {
    const root = document.createElement(`div`);
    document.body.appendChild(root);

    const history = createMemoryHistory();
    render(
        <Router history={history}>
          <Provider store={store}>
            <SignIn/>
          </Provider>
        </Router>,
        root
    );

    act(() => {
      const goAmsterdam = document.querySelector(`.locations__item-link`);
      goAmsterdam.dispatchEvent(new MouseEvent(`click`, {bubbles: true}));
    });

    expect(history.location.pathname).toBe(`/amsterdam`);
    unmountComponentAtNode(root);
  });
});
