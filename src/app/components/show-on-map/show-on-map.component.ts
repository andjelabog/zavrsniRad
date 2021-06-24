import { Component, OnInit } from '@angular/core';
import { GovernmentService } from 'src/app/services/government.service';

import * as mapInfo from '../../../assets/coordinates.json';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-show-on-map',
  templateUrl: './show-on-map.component.html',
  styleUrls: ['./show-on-map.component.css']
})
export class ShowOnMapComponent implements OnInit {
  regions: any[] = [];
  citiesInSelectedRegion: any[] = [];
  map: mapboxgl.Map;
  style = 'mapbox://styles/legendaigre/ckokag0zs1o4417o2sx7ogkpy';
  lat = 21.0059;
  lng = 44.2260;

  selectedStatistics: number = 0;
  statistics: any[] = [
    { value: 0, viewValue: ' Заражено у дану' },
    { value: 1, viewValue: ' Заражено укупно' },
  ];


  constructor(private governmentService: GovernmentService) { }

  ngOnInit(): void {
    this.setUpMap();
    this.governmentService.getStatisticsForADate("2020-03-25").subscribe(res => console.log(res))
    this.parseData();
    this.drawPolygons(this.regions);
  }

  setUpMap() {
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);
    // mapboxgl.accessToken = environment.mapbox.accessToken; -- accessToken is readOnly
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 6.2,
      center: [this.lat, this.lng],
      interactive: false
    });
  }

  parseData() {
    let array = mapInfo['default'];
    array.forEach(element => {
      if (element['group']['id'] == 4)
        this.regions.push(element)
    });
  }

  drawPolygons(array): void {
    this.map.on('load', () => {
      array.forEach(element => {
        this.map.addSource(element.name, {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [element.area.coordinates[0]]
            },
            'properties': null
          }
        });
        this.map.addLayer({
          'id': element.name,
          'type': 'fill',
          'source': element.name,
          'layout': {},
          'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.2,
            'fill-outline-color': '#1660eb'
          }
        });
        this.map.on('click', element.name, (e) => {
          this.viewClickedRegion(element);
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(element.name)
            .addTo(this.map);
        });
      });
    });
  }

  viewClickedRegion(element) {
    this.citiesInSelectedRegion = [];
    let array = mapInfo['default'];
    array.forEach(elem => {
      if (elem.tag == element.code && elem.group.id == 5) {
        this.citiesInSelectedRegion.push(elem)
      }
    });
  }
}
