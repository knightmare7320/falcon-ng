import { Component, AfterViewInit, Input } from "@angular/core";
import * as L from 'leaflet';

@Component({
   selector: 'app-map',
   templateUrl: './map.component.html',
   styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
   @Input() latitude: number = 42.005450;
   @Input() longitude: number = -87.809870;
   private map!: L.Map;
   
   ngAfterViewInit(): void {
      this.initializeMap();      
   }

   private initializeMap() {
      const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      this.map = L.map('map_page', {dragging: false, zoomControl: false, scrollWheelZoom: false});
      L.tileLayer(baseMapURl).addTo(this.map);
      // this.sitesLayer.setMap(this.map, baseLayer, 8, 10);
   }
}