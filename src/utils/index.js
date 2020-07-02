import {MAX_COUNT_CITIES} from "../const";
import {SortType} from '../const';

const MAX_COUNT_CLOSEST_OFFERS = 3;

export const findClosestOffers = (activeOffer, offers) => {
  const closestOffers = offers.sort((leftOffer, rightOffer) => {
    const coordXleft = leftOffer.coordinates[0] - activeOffer.coordinates[0];
    const coordYleft = leftOffer.coordinates[1] - activeOffer.coordinates[1];
    const lengthLeft = Math.sqrt((coordXleft * coordXleft) + (coordYleft * coordYleft));

    const coordXright = rightOffer.coordinates[0] - activeOffer.coordinates[0];
    const coordYright = rightOffer.coordinates[1] - activeOffer.coordinates[1];
    const lengthRight = Math.sqrt((coordXright * coordXright) + (coordYright * coordYright));

    return lengthLeft - lengthRight;
  }).filter((offer) => offer !== activeOffer).splice(0, MAX_COUNT_CLOSEST_OFFERS);

  return closestOffers;
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getCitiesList = (offers) => {
  const cities = offers.reduce((acc, offer, index) => {
    acc[index] = offer.city;
    return acc;
  }, []);
  const uniqueCities = [...new Set(cities)];
  if (uniqueCities.length > MAX_COUNT_CITIES) {
    return uniqueCities.slice(MAX_COUNT_CITIES);
  }
  return uniqueCities;
};

export const getOffersByCity = (city, offers) => {
  return offers.filter((offer) => offer.city.name === city);
};

export const getOffersBySort = (sortType, offers) => {
  switch (sortType) {
    case SortType.POPULAR:
      const sortedOffersPopular = offers.slice().sort((offerLeft, offerRight) => {
        return offerLeft.id - offerRight.id;
      });
      return sortedOffersPopular;

    case SortType.LOW_HIGHT:
      const sortedOffersLowHight = offers.slice().sort((offerLeft, offerRight) => {
        return offerLeft.price - offerRight.price;
      });
      return sortedOffersLowHight;

    case SortType.HIGHT_LOW:
      const sortedOffersHightLow = offers.slice().sort((offerLeft, offerRight) => {
        return offerRight.price - offerLeft.price;
      });
      return sortedOffersHightLow;

    case SortType.TOP:
      const sortedOffersTop = offers.slice().sort((offerLeft, offerRight) => {
        return offerRight.rate - offerLeft.rate;
      });
      return sortedOffersTop;

    default:
      return offers;
  }
};
