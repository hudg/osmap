import { Component, OnInit } from '@angular/core';

import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import Polyline from 'ol/format/Polyline';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { getVectorContext } from 'ol/render';

@Component({
  selector: 'app-maptiler',
  standalone: true,
  imports: [],
  templateUrl: './maptiler.component.html',
  styleUrl: './maptiler.component.css',
})
export class MaptilerComponent implements OnInit {
  public map!: Map;
  ngOnInit(): void {
    const key = 'v3js72UeV1G94Ff1APaf';
    const attributions =
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
      '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

    const center = [-5639523.95, -3501274.52];
    const map = new Map({
      target: 'map',
      view: new View({
        center: center,
        zoom: 10,
        minZoom: 2,
        maxZoom: 19,
      }),
      layers: [
        new TileLayer({
          source: new XYZ({
            attributions: attributions,
            url:
              'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=' + key,
            tileSize: 512,
          }),
        }),
      ],
    });
  }
}
