import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {GeolocateControl, Map} from 'mapbox-gl'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: Map
  lat = 38
  lng = -122
  @Input() isSelectable: boolean = false

  constructor() {
  }

  ngOnInit(): void {

    this.map = new Map({
      accessToken: environment.mapboxToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 13,
      center: [this.lng, this.lat]
    })
    if(this.isSelectable){
     this.map.addControl(new GeolocateControl({
       positionOptions:{enableHighAccuracy:true},
     }))
    }
  }

}
