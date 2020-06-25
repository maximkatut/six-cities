import {getRandomArrayItem, getRandomArrayItems, getRandomBoolean, getRandomNumber} from '../utils/random.js';

import {OfferTypes} from '../const.js';
import {nanoid} from 'nanoid';

const OfferNames = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Nice, cozy, warm big bed apartment`,
  `Canal View Prinsengracht`
];

const Images = [
  `img/apartment-01.jpg`,
  `img/apartment-02.jpg`,
  `img/apartment-03.jpg`,
  `img/room.jpg`
];

const Appliences = [
  `Fridge`,
  `Microwave`,
  `Wi-Fi`,
  `Washing machine`,
  `Towels`,
  `Heating`,
  `Coffee machine`,
  `Baby seat`,
  `Kitchen`,
  `Dishwasher`,
  `Cabel TV`,
];

const Coordinates = [
  [52.3909553943508, 4.85309666406198],
  [52.369553943508, 4.85309666406198],
  [52.3909553943508, 4.929309666406198],
  [52.3809553943508, 4.939309666406198]
];

const Host = {
  NAMES: [`Angelina`, `Max`],
  AVATARS: [`img/avatar-angelina.jpg`, `img/avatar-max.jpg`],
};

const getRandomOffer = (coordinate) => {
  return {
    appliences: getRandomArrayItems(Appliences),
    bedrooms: getRandomNumber(1, 3),
    coordinates: coordinate,
    description: [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`, `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`],
    guests: getRandomNumber(1, 8),
    host: {
      avatar: getRandomArrayItem(Host.AVATARS),
      name: getRandomArrayItem(Host.NAMES),
      super: getRandomBoolean()
    },
    id: nanoid(),
    imagesGallery: getRandomArrayItems(Images),
    mainImage: getRandomArrayItem(Images),
    offerType: getRandomArrayItem(OfferTypes),
    premium: getRandomBoolean(),
    price: getRandomNumber(50, 1000),
    rate: getRandomNumber(1, 5),
    title: getRandomArrayItem(OfferNames)
  };
};

export const offers = Coordinates.map((coordinate) => {
  return getRandomOffer(coordinate);
});
