import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat, useGeographic} from 'ol/proj.js';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  map!: Map;

  centerCoordinates = [0,0];
  point = new Point(this.centerCoordinates);

  constructor() {
    this.getCurrentPosition().then(coords => {
      this.centerCoordinates = [coords.longitude, coords.latitude];
      this.point = new Point(this.centerCoordinates);
      this.initializeMap();
    });
  }

  ngOnInit() {}

  initializeMap() {
    this.map = new Map({
      target: this.mapElement.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat(this.centerCoordinates),
        zoom: 12,
      }),
    });
  }

  async getCurrentPosition() {
    const position = await Geolocation.getCurrentPosition();
    return position.coords;
  }
}