import NameSpace from "../name-space";

export const getActiveCity = (state) => {
  return state[NameSpace.OFFERS].activeCityName;
};

export const getSortType = (state) => {
  return state[NameSpace.OFFERS].sortType;
};
