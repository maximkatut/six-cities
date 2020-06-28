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
