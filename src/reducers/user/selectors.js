import NameSpace from "../name-space.js";

export const getUserEmail = (state) => {
  return state[NameSpace.USER].user.email;
};

export const getUserStatus = (state) => {
  return state[NameSpace.USER].authorizationStatus;
};

