import React from 'react';
import {Link} from 'react-router-dom';

import {uncapitalize} from '../../utils';
import {Cities} from '../../const';

interface Props {
  activeCityName: string;
}

const CitiesList: React.FC<Props> = ({activeCityName}: Props) => {
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

export default CitiesList;
