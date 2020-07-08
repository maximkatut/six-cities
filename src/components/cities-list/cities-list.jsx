import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../actions/offers-actions';
import {Cities} from '../../const';

const CitiesList = (props) => {

  const {onCityClick, activeCityName} = props;

  return (
    <ul className="locations__list tabs__list ">
      {Cities.map((city, index) => {
        const activeClass = activeCityName === city ? `tabs__item--active` : ``;
        return (
          <li key={city + index} className="locations__item">
            <a
              className={`locations__item-link tabs__item ` + activeClass}
              href="#"
              onClick={() => {
                onCityClick(city);
              }}
            >
              <span>{city}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );

};

CitiesList.propTypes = {
  onCityClick: PropTypes.func.isRequired,
  activeCityName: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  activeCityName: state.offers.activeCityName
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(cityName) {
    dispatch(ActionCreator.changeCity(cityName));
    dispatch(ActionCreator.getOffers(cityName));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
