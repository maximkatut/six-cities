import NameSpace from "../name-space.js";

export const getActiveOffer = (state) => {
  return state[NameSpace.OFFERS].activeOffer;
};

export const getActiveCity = (state) => {
  return state[NameSpace.OFFERS].activeCityName;
};

export const getSortType = (state) => {
  return state[NameSpace.OFFERS].sortType;
};
