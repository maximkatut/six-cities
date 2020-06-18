export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomArrayItem = (array) => {
  const index = getRandomNumber(0, array.length - 1);
  return array[index];
};

export const getRandomArrayItems = (array) => {
  const newArray = array.slice(0, getRandomNumber(1, array.length));
  return newArray;
};

export const getRandomBoolean = () => {
  return Math.random() > 0.5;
};
