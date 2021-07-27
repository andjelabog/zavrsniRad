import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { AmbulancesService } from '../services/ambulances.service';

@Component({
  selector: 'app-ambulances',
  templateUrl: './ambulances.component.html',
  styleUrls: ['./ambulances.component.css']
})
export class AmbulancesComponent implements OnInit {
  ambulances: any[] = [];
  ambulanceGeoJSON: any[] = []; // Created as geoJSON in ngOnInit
  map: mapboxgl.Map;
  style = "mapbox://styles/mapbox/light-v10";
  lat = 21.0059;
  lng = 44.2260;

  constructor(private ambulanceServices: AmbulancesService) { }

  ngOnInit(): void {
    this.setUpMap();
    this.ambulances = [], this.ambulanceGeoJSON = [];
    this.ambulanceServices.getData().subscribe(data => {
      this.ambulances = data;
      let i = 0;
      data.forEach(element => {
        this.ambulanceGeoJSON.push({
          "type": "Feature",
          "properties": {
            "clusterId": i++,
            "cluster": false
          },
          "geometry": {
            "type": "Point",
            "coordinates": [element.lng, element.lat]
          }
        });
      });
      this.createClusters();
    })
  }



  setUpMap() {
    // mapboxgl.accessToken = environment.mapbox.accessToken; -- accessToken is readOnly
    // workaround 
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 6.5,
      center: [this.lat, this.lng],
      minZoom: 6.5
      // interactive: false
    });
  }

  createClusters() {
    this.map.on('load', () => {
      /**this.ambulances.forEach(element => {
        new mapboxgl.Marker()
          .setLngLat([element.lng, element.lat])
          .addTo(this.map);
      })*/
      this.map.addSource('points', {
        type: 'geojson',
        data: {
          "type": "FeatureCollection",
          "features": this.ambulanceGeoJSON
        },
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });
      this.map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'points',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1'
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40
          ]
        }
      });

      this.map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'points',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      });

      this.map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'points',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        }
      });

      // inspect a cluster on click
      this.map.on('click', 'clusters', function (e) {
        var features = this.map.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        });
        var clusterId = features[0].properties.cluster_id;
        this.map.getSource('points').getClusterExpansionZoom(
          clusterId,
          function (err, zoom) {
            if (err) return;

            this.map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom
            });
          }
        );
      });

      // When a click event occurs on a feature in
      // the unclustered-point layer, open a popup at
      // the location of the feature, with
      // description HTML from its properties.
      // this.map.on('click', 'unclustered-point', (e) => {
      //   var coordinates = e.features[0].geometry.coordinates.slice();
      //   var mag = e.features[0].properties.mag;
      //   var tsunami;

      //   if (e.features[0].properties.tsunami === 1) {
      //     tsunami = 'yes';
      //   } else {
      //     tsunami = 'no';
      //   }

      //   // Ensure that if the map is zoomed out such that
      //   // multiple copies of the feature are visible, the
      //   // popup appears over the copy being pointed to.
      //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      //   }

      //   new mapboxgl.Popup()
      //     .setLngLat(coordinates)
      //     .setHTML(
      //       'magnitude: ' + mag + '<br>Was there a tsunami?: ' + tsunami
      //     )
      //     .addTo(this.map);
      // });

      this.map.on('mouseenter', 'clusters', function () {
        this.map.getCanvas().style.cursor = 'pointer';
      });
      this.map.on('mouseleave', 'clusters', function () {
        this.map.getCanvas().style.cursor = '';
      });


    });
  }
}
