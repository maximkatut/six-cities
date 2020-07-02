import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import {offers} from '../../test-data';
import Map from './map.jsx';
import {store} from '../../test-data/store';

describe(`Map`, () => {

  it(`Map component should render correctly`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <Map
            activeOffer={offers[0]}
          />
        </Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

