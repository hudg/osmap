import {Feature, Map, Overlay, View} from 'ol/index.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Point} from 'ol/geom.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {useGeographic} from 'ol/proj.js';

useGeographic();


const place = [-46.681917, -23.491316, '000'];
const place1 = [-46.6827299, -23.4915739, '111'];
const place2 = [-46.683073, -23.490890, '222'];
const place3 = [-46.6846311, -23.4910142, '333'];

const point1 = new Point(place1);
const point2 = new Point(place2);
const point3 = new Point(place3);

const map = new Map({
  target: 'map',
  view: new View({
    center: place,
    zoom: 18,
  }),
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    new VectorLayer({
      source: new VectorSource({
        features: [new Feature(point1), new Feature(point2), new Feature(point3)],
      }),
      style: {
        'circle-radius': 9,
        'circle-fill-color': 'red',
      },
    }),
  ],
});

source.on('addfeature', function(evt){
  var feature = evt.feature;
  var coords = feature.getGeometry().getCoordinates();
});

const element = document.getElementById('popup');

const popup = new Overlay({
  element: element,
  stopEvent: false,
});
map.addOverlay(popup);

function formatCoordinate(coordinate) {
  return `
    <table>
      <tbody>
        <tr><th>lon</th><td>${coordinate[0].toFixed(2)}</td></tr>
        <tr><th>lat</th><td>${coordinate[1].toFixed(2)}</td></tr>
        <tr><th>Car</th><td>${coordinate[2]}</td></tr>
      </tbody>
    </table>`;
}

const info = document.getElementById('info');
map.on('moveend', function () {

  const view = map.getView();
  const center = view.getCenter();
  info.innerHTML = formatCoordinate(center);
});

let popover;
map.on('click', function (event) {

  if (popover) {
    popover.dispose();
    popover = undefined;
  }
  const feature = map.getFeaturesAtPixel(event.pixel)[0];

  if (!feature) {
    return;
  }
  const coordinate = feature.getGeometry().getCoordinates();
  popup.setPosition([
    coordinate[0] + Math.round(event.coordinate[0] / 360) * 360,
    coordinate[1],
  ]);


  popover = new bootstrap.Popover(element, {
    container: element.parentElement,
    content: formatCoordinate(coordinate),
    html: true,
    offset: [0, 20],
    placement: 'top',
    sanitize: false,
  });
  popover.show();
});

map.on('pointermove', function (event) {
  const type = map.hasFeatureAtPixel(event.pixel) ? 'pointer' : 'inherit';
  map.getViewport().style.cursor = type;
});
