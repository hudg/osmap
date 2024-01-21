import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { useGeographic } from 'ol/proj';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mapas',
  standalone: true,
  imports: [],
  templateUrl: 'mapas.component.html',
  styleUrl: './mapas.component.css',
})
export class MapasComponent implements OnInit {
  public deviceId!: string;
  public latitude!: string;
  public longitude!: string;

  public map!: Map;

  public placeInit = [0, 0];
  public place1 = [-46.6827299, -23.4915739, 10];
  public place2 = [-46.683073, -23.49089, 20];
  public place3 = [-46.6846311, -23.4910142, 30];

  public point1 = new Point(this.place1);
  public point2 = new Point(this.place2);
  public point3 = new Point(this.place3);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    useGeographic();

    this.route.params.subscribe(
      (params) => (
        (this.deviceId = params['deviceId']),
        (this.latitude = params['latitude']),
        (this.longitude = params['longitude'])
      )
    );

    /*  alert(this.route.snapshot.queryParams['deviceId']);
    alert(this.route.snapshot.queryParams['latitude']);
    alert(this.route.snapshot.queryParams['longitude']); */
    this.placeInit = [
      this.route.snapshot.queryParams['latitude'],
      this.route.snapshot.queryParams['longitude'],
    ];

    this.initMap();
    this.coordinate();
  }

  public initMap() {
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
        center: this.placeInit,
        zoom: 5,
        minZoom: 2,
        maxZoom: 19,
      }),
    });
  }

  public coordinate() {
    this.map.on('click', (event) => {
      const feature = this.map.getFeaturesAtPixel(event.pixel)[0];
      /* const view = this.map.getView();
      const center = view.getCenter() as Coordinate | undefined; */

      let coords = feature.getGeometry() as Point;
      var coordinate = coords.getCoordinates();

      var _info = document.getElementById('info') as HTMLElement;
      _info.innerHTML = `
      <table>
        <tbody>
          <tr><th>lon</th><td>${
            coordinate == null ? '' : coordinate[0]
          }</td></tr>
          <tr><th>lat</th><td>${
            coordinate == null ? '' : coordinate[1]
          }</td></tr>
          <tr><th>Car</th><td>${
            coordinate == null ? '' : coordinate[2]
          }</td></tr>
        </tbody>
      </table>`;
    });
  }
}
