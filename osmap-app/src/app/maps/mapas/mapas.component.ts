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

/*
import {Feature, Map, Overlay, View} from 'ol/index.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Point} from 'ol/geom.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {useGeographic} from 'ol/proj.js'; */

@Component({
  selector: 'app-mapas',
  standalone: true,
  imports: [],
  templateUrl: 'mapas.component.html',
  styleUrl: './mapas.component.css',
})
export class MapasComponent implements OnInit {
  public map!: Map;
  ngOnInit(): void {
    useGeographic();

    const place = [-46.681917, -23.491316];
    const place1 = [-46.6827299, -23.4915739, 1];
    const place2 = [-46.683073, -23.49089, 2];
    const place3 = [-46.6846311, -23.4910142, 2];

    const point1 = new Point(place1);
    const point2 = new Point(place2);
    const point3 = new Point(place3);

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [
              new Feature(point1),
              new Feature(point2),
              new Feature(point3),
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
        center: place,
        zoom: 18,
        maxZoom: 18,
      }),
    });
  }
}
