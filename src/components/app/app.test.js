import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import App from './app.jsx';
import {store} from '../../test-data/store';

describe(`App`, () => {
  it(`App should render with given state from Redux store`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <App/>
        </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
