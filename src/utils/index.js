import {SortType} from '../const';

export const extend = (a, b, c = {}, d = {}) => {
  return Object.assign({}, a, b, c, d);
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
