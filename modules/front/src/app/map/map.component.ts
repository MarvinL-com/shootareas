import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {environment} from "../../environments/environment";
import {GeolocateControl, LngLatLike, Map, Marker} from 'mapbox-gl'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: Map
  marker: Marker
  @Input() location: { latitude: number, longitude: number } = {latitude: 38, longitude: -122}
  @Input() isSelectable: boolean = false
  @Output() handleLocationChange = new EventEmitter<LngLatLike>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const newLoc = changes.location
    const position: LngLatLike = [newLoc.currentValue.longitude, newLoc.currentValue.latitude]
    // Moves map's center on Location change
    if (newLoc.previousValue !== undefined) {
      this.map.flyTo({
        center: position,
      })
      this.marker.setLngLat(position)
    }
  }

  ngOnInit(): void {
    this.map = new Map({
      accessToken: environment.mapboxToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 8,
      center: [this.location.longitude, this.location.latitude]
    })
    this.marker = new Marker({draggable: true}).setLngLat([0, 0]).on('dragend', e => this.updateLocation(e))
    this.marker.addTo(this.map)

    this.map.addControl(new GeolocateControl({
      positionOptions: {enableHighAccuracy: true},
    }))
  }

  updateLocation(event) {
    if (event) {
      const {target} = event as { target: Marker }
      this.handleLocationChange.emit(target.getLngLat())
    }
  }
}
