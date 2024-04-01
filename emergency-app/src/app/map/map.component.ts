import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Feature } from 'ol';
import Map from 'ol/Map';
import View from 'ol/View';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import {fromLonLat, useGeographic} from 'ol/proj.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  map!: Map;

  

  
  centerCoordinates = [24.1515184,45.792528];
  point = new Point(this.centerCoordinates);
  constructor() {}

  ngOnInit() {
    this.initializeMap();
  }
  

  initializeMap() {
    this.map = new Map({
      target: this.mapElement.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat(this.centerCoordinates), // Convert to EPSG:3857
        zoom: 12,
      }),
    });
}

}
