import React from "react";
import {MemoryRouter} from "react-router-dom";

import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {AuthorizationStatus} from "../../reducers/user/user-reducer";

import {PrivateRoute} from './private-route';

configure({
  adapter: new Adapter()
});

const Component = () => {
  return <div></div>;
};

describe(`Private Route`, () => {

  it(`should render component if user has been authenticated`, () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={[`/favorites`]}>
          <PrivateRoute
            render={(props) => {
              return <Component {...props}/>;
            }}
            path={`/favorites`}
            exact
            userStatus={AuthorizationStatus.AUTH}
          />
        </MemoryRouter>
    );

    expect(wrapper.exists(Component)).toBe(true);
  });

  it(`should redirect if user is not authenticated`, () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={[`/favorites`]}>
          <PrivateRoute
            render={(props) => {
              return <Component {...props}/>;
            }}
            path={`/favorites`}
            exact
            userStatus={AuthorizationStatus.NO_AUTH}
          />
        </MemoryRouter>
    );

    expect(wrapper.exists(Component)).toBe(false);
  });
});

