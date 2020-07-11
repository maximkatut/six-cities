const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default (offers) => {
  return offers.map((offer) => {
    return {
      appliences: offer.goods,
      bedrooms: offer.bedrooms,
      coordinates: [offer.location.latitude, offer.location.longitude],
      city: {
        name: offer.city.name,
        coords: [offer.city.location.latitude, offer.city.location.longitude],
        zoom: offer.city.location.zoom
      },
      description: offer.description,
      guests: offer.max_adults,
      host: {
        avatar: offer.host.avatar_url,
        id: offer.host.id,
        name: offer.host.name,
        super: offer.host.is_pro
      },
      id: offer.id,
      isFavorite: offer.is_favorite,
      imagesGallery: offer.images,
      mainImage: offer.preview_image,
      offerType: capitalizeFirstLetter(offer.type),
      premium: offer.is_premium,
      price: offer.price,
      rate: offer.rating,
      title: offer.title,
      zoom: offer.location.zoom
    };
  });
};
