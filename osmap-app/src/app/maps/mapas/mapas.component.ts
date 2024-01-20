import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { useGeographic } from 'ol/proj';
import { Geometry, Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature, Overlay } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { FeatureLike } from 'ol/Feature';

@Component({
  selector: 'app-mapas',
  standalone: true,
  imports: [],
  templateUrl: 'mapas.component.html',
  styleUrl: './mapas.component.css',
})
export class MapasComponent implements OnInit {
  public map!: Map;
  public innerHTML!: string;

  public _element: any;
  public _popup: any;

  public place = [-46.681917, -23.491316];
  public place1 = [-46.6827299, -23.4915739, 10];
  public place2 = [-46.683073, -23.49089, 20];
  public place3 = [-46.6846311, -23.4910142, 30];

  public point1 = new Point(this.place1);
  public point2 = new Point(this.place2);
  public point3 = new Point(this.place3);

  ngOnInit(): void {
    useGeographic();

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [
              new Feature(this.point1),
              new Feature(this.point2),
              new Feature(this.point3),
            ],
          }),
          style: {
            'circle-radius': 9,
            'circle-fill-color': 'red',
          },
        }),
      ],
      target: 'map',
      view: new View({
        center: this.place,
        zoom: 18,
        minZoom: 2,
        maxZoom: 19,
      }),
    });

    this.popup();
    this.info();
    this.popover();
  }

  public popup() {
    this._element = document.getElementById('popup') as HTMLElement;

    this._popup = new Overlay({
      element: this._element,
      stopEvent: false,
    });
    this.map.addOverlay(this._popup);
  }

  public info() {
    var _info = document.getElementById('info') as HTMLElement;
    this.map.on('moveend', () => {
      const view = this.map.getView();
      const coordinate = view.getCenter();
      _info.innerHTML = `
      <table>
        <tbody>
          <tr><th>lon</th><td>${
            coordinate == null ? '' : coordinate[0].toFixed(2)
          }</td></tr>
          <tr><th>lat</th><td>${
            coordinate == null ? '' : coordinate[1].toFixed(2)
          }</td></tr>
          <tr><th>Car</th><td>${
            coordinate == null ? '' : coordinate[2]
          }</td></tr>
        </tbody>
      </table>`;
    });
  }

  public popover() {

    this.map.on('click',  (event) => {
      const feature = this.map.getFeaturesAtPixel(event.pixel)[0];
      const view = this.map.getView();
      const center = view.getCenter() as Coordinate | undefined;


      let coords = feature.getGeometry() as Point;

      var flatCoordinates = coords.getCoordinates();


      alert(flatCoordinates[2]);
    });
  }

  public pointermove() {
    this.map.on('pointermove', (event) => {
      const type = this.map.hasFeatureAtPixel(event.pixel)
        ? 'pointer'
        : 'inherit';
      this.map.getViewport().style.cursor = type;
    });
  }

  public formatCoordinate(coordinate: Coordinate | undefined) {
    return `
      <table>
        <tbody>
          <tr><th>lon</th><td>${
            coordinate == null ? '' : coordinate[0].toFixed(2)
          }</td></tr>
          <tr><th>lat</th><td>${
            coordinate == null ? '' : coordinate[1].toFixed(2)
          }</td></tr>
          <tr><th>Car</th><td>${
            coordinate == null ? '' : coordinate[2]
          }</td></tr>
        </tbody>
      </table>`;
  }
}
