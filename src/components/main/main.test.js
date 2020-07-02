import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import Main from './main.jsx';
import {store} from '../../test-data/store';

describe(`Main`, () => {

  it(`Main component should render correctly`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <Main
            onMainCardTitleClick={() => { }}
          />
        </Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
