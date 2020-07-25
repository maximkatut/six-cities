import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {uncapitalize} from '../../utils';
import {Cities} from '../../const';

const CitiesList = (props) => {
  const {activeCityName} = props;
  return (
    <ul className="locations__list tabs__list ">
      {Cities.map((city, index) => {
        const activeClass = (activeCityName === city) ? `tabs__item--active` : ``;
        return (
          <li key={city + index} className="locations__item">
            <Link
              className={`locations__item-link tabs__item ` + activeClass}
              to={`/${uncapitalize(city)}`}
            >
              <span>{city}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};


CitiesList.propTypes = {
  activeCityName: PropTypes.string.isRequired
};

export default CitiesList;
