import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router-dom';
import renderer from 'react-test-renderer';

import {store} from '../../test-data/store';
import history from '../../history';

import Offer from './offer';

describe(`Offer`, () => {
  it(`Offer should render correctly`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <Route component={Offer}/>
          </Provider>
        </Router>
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
