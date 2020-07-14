import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import Main from './main.jsx';

import {store} from '../../test-data/store';

describe(`Main`, () => {

  it(`Main component should render correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <Provider store={store}>
            <Main
              onMainCardTitleClick={() => { }}
            />
          </Provider>
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
