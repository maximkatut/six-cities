import NameSpace from "../name-space.js";

export const getUser = (state) => {
  return state[NameSpace.USER].user;
};

export const getUserStatus = (state) => {
  return state[NameSpace.USER].authorizationStatus;
};

