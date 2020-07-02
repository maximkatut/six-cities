const leaflet = jest.genMockFromModule(`leaflet`);

leaflet.icon = () => {};

leaflet.map = () => {
  return {
    setView: () => {},
    remove: () => {},
    once: () => {}
  };
};

leaflet.marker = () => {
  return {
    addTo: () => {},
  };
};

leaflet.tileLayer = () => {
  return {
    addTo: () => {},
  };
};

module.exports = leaflet;
