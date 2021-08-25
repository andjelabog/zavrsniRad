import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster'
import { AmbulancesService } from '../services/ambulances.service';

@Component({
  selector: 'app-ambulances',
  templateUrl: './ambulances.component.html',
  styleUrls: ['./ambulances.component.css']
})
export class AmbulancesComponent implements OnInit, AfterViewInit {
  ambulances: any[] = [];
  map;
  lat = 21.0059;
  lng = 44.2260;

  constructor(private ambulanceServices: AmbulancesService) { }


  ngOnInit(): void {
    this.ambulances = [];
    this.ambulanceServices.getData().subscribe(data => {
      this.ambulances = data;
      this.drawMarkers();
    })
  }

  ngAfterViewInit(): void {
    this.initMap();
    
  }

  initMap() {
    // Initialize the map on the "map" div with a given center and zoom
    this.map = L.map('map', {
      center: [this.lng, this.lat],
      // zoomSnap: 0.4,
      zoom: 7.4,
      zoomControl: false,
      dragging: true
    });
    // Draw a layer [ tileLayer ]
    let tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
      // maxZoom: 18,
      minZoom: 7,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">Zavrsni rad</a>'
    });
    tiles.addTo(this.map);
  }

  drawMarkers() {
    let markers = L.markerClusterGroup();
    let customIcon = L.icon({
      iconUrl: './assets/ambulance_icon_small.png',
      iconSize: [50, 44],
    });
    this.ambulances.forEach(ambulance => {
      let popup = "";
      popup += '<b>' + ambulance.name + '</b><br>';
      popup += ambulance.street + ', ' + ambulance.city + '<br>';
      popup += 'телефон: ' + '<b>' + ambulance.phone + '</b>' + '<br>';
      popup += ambulance.memo;

      markers.addLayer(L.marker([ambulance.lat, ambulance.lng], { icon: customIcon }).bindPopup(popup));
    })
    this.map.addLayer(markers);
    this.map.setMaxBounds(markers.getBounds());
  }


}
