import {getRandomNumber, getRandomArrayItem, getRandomBoolean} from '../utils/random.js';
import {nanoid} from 'nanoid';

const OfferTypes = [
  `Apartment`, `Room`, `House`, `Hotel`
];

const OfferNames = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Nice, cozy, warm big bed apartment`,
  `Canal View Prinsengracht`
];

const ImageSrc = [
  `img/apartment-01.jpg`,
  `img/apartment-02.jpg`,
  `img/apartment-03.jpg`,
  `img/room.jpg`
];

const getRandomOfferCard = () => {
  return {
    id: nanoid(),
    title: getRandomArrayItem(OfferNames),
    offerType: getRandomArrayItem(OfferTypes),
    imageSrc: getRandomArrayItem(ImageSrc),
    premium: getRandomBoolean(),
    price: getRandomNumber(50, 1000),
    rate: getRandomNumber(1, 5)
  };
};

export const offerCards = new Array(4).fill(``).map(() => {
  return getRandomOfferCard();
});
