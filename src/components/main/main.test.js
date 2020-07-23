import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import {Router, Route} from 'react-router-dom';

import Main from './main.jsx';

import {store} from '../../test-data/store';
import history from '../../history.js';

describe(`Main`, () => {

  it(`Main component should render correctly`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <Route component={Main}/>
          </Provider>
        </Router>,
        {createNodeMock: () => document.createElement(`div`)}
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
