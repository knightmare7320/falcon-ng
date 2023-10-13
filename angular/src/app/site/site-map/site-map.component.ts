import { Component, OnChanges, AfterViewInit, Input, SimpleChanges } from "@angular/core";
import * as Leaflet from 'leaflet';

import { MapLayerSitesService } from '../../map/map-sites.service';
import { MapLayerSectorsService } from "src/app/map/map-sectors.sectice";

Leaflet.Icon.Default.imagePath = 'assets/';
@Component({
   selector: 'app-site-map',
   templateUrl: './site-map.component.html',
   styleUrls: ['./site-map.component.scss'],
})
export class SiteMapComponent implements OnChanges, AfterViewInit {
   @Input() latitude!: number;
   @Input() longitude!: number;
   private map!: Leaflet.Map;

   constructor(
      private sitesLayer: MapLayerSitesService,
      private sectorsLayer: MapLayerSectorsService,
   ) {}

   ngOnChanges(changes: SimpleChanges): void {
      if(this.map && this.latitude && this.longitude) {
         this.map.setView({lat: this.latitude, lng: this.longitude}, 17);
      }
   }

   ngAfterViewInit() {
      this.initializeMap();
   }

   private initializeMap() {
      const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      this.map = Leaflet.map('map-site', {layers: [
         Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
           attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
         })
       ],dragging: false, zoomControl: false, scrollWheelZoom: false});
       const baseLayer = Leaflet.tileLayer(baseMapURl).addTo(this.map);
      this.sitesLayer.setMap(this.map, baseLayer, 8, 19);
      this.sectorsLayer.setMap(this.map, baseLayer, 8, 19);
   }
}