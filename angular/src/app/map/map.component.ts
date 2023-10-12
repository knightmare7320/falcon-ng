import { Component, OnInit, OnDestroy, AfterViewInit, Input } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import * as L from 'leaflet';
// import { MapLayerSitesService } from '../../components/geo/maplayer-sites.service';

@Component({
   selector: 'app-map',
   templateUrl: './map.component.html',
   styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnInit, OnDestroy {
   private routeListener: Subscription | undefined;
   @Input() latitude: number = 42.005450;
   @Input() longitude: number = -87.809870;
   private map!: L.Map;
   
   constructor(
      private route: ActivatedRoute,
      // private sitesLayer: MapLayerSitesService,
   ) {}

   ngOnInit(): void {
      this.routeListener = this.route.queryParams.subscribe(
         (params: Params) => {
            const latitude = params["latitude"];
            const longitude = params["longitude"];
            if (Number(latitude) && Number(longitude)) {
               this.latitude = Number(latitude);
               this.longitude = Number(longitude);
               this.map.panTo({lat: this.latitude, lng: this.longitude});
            }
         }
      );
   }

   ngOnDestroy(): void {
      this.routeListener?.unsubscribe();
   }

   ngAfterViewInit(): void {
      this.initializeMap();      
   }

      // console.log('changes', this.latitude, this.longitude);
      // if(this.map && this.latitude && this.longitude) {
      //    this.map.setView({lat: this.latitude, lng: this.longitude}, 17);
      // }

   private initializeMap() {
      console.log('init', this.latitude, this.longitude);
      const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      this.map = L.map('map-page', {dragging: false, zoomControl: false, scrollWheelZoom: false});
      this.map.setView({lat: this.latitude, lng: this.longitude}, 17);
      L.tileLayer(baseMapURl).addTo(this.map);
      // this.sitesLayer.setMap(this.map, baseLayer, 8, 10);

   }
}