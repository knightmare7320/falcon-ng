import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as Leaflet from 'leaflet';
import { LatLng } from 'leaflet';

import { GeoService, GeoSector } from 'src/app/store/geo.service';

@Injectable()
export class MapLayerSectorsService {
   map!: Leaflet.Map;
   baseLayer!: Leaflet.Layer;
   paneName = 'sectorsPane';

   maxZoom = 18;
   minZoom = 11;
   tileDataList: {x: number, y: number, z: number, objects: any[]}[] = [];

   constructor(
      private geoService: GeoService,
      private router: Router,
   ) { }

   setMap(map: Leaflet.Map, baseLayer: Leaflet.Layer, minZoom?: number, maxZoom?: number): void {
      this.map = map;
      this.baseLayer = baseLayer;
      if (minZoom) this.minZoom = minZoom;
      if (maxZoom) this.maxZoom = maxZoom;

      this.map.createPane(this.paneName).style.zIndex = '609';

      baseLayer.on(
         'tileload',
         obj => {
            const x = obj.coords.x;
            const y = obj.coords.y;
            const z = obj.coords.z;

            if (z >= this.minZoom && z <= this.maxZoom) {
               this.geoService.getSectors(x, y, z).subscribe(result => {
                  if(result.rows && result.rows.length > 0 && result.Z === z) {
                     this.createTile(x, y, z);
                     this.processTileJson(x, y, z, result.rows);
                  }
               });
            }
         }
      );

      baseLayer.on(
         'tileunload',
         obj => {
         const x = obj.coords.x;
         const y = obj.coords.y;
         const z = obj.coords.z;

         this.clearTile(x, y, z);
         }
      );
   }

   unsetMap(): void {
      this.tileDataList.forEach(tile => {
         this.clearTile(tile.x, tile.y, tile.z);
      });
   }


   createTile(x: number, y: number, z: number): void {
      if (this.findTileIndex(x, y, z) < 0) {
         this.tileDataList.push({x, y, z, objects: []});
      }
   }

   processTileJson(x: number, y: number, z: number, json: any) {
      const tileIndex = this.findTileIndex(x, y, z);

      if (tileIndex >= 0) {
         const objects: any[] = [];
         json.map((sector: GeoSector) => {
            const poly = this.getPoly(z, sector.latitude, sector.longitude, sector.azimuth, sector.horizontal_bw);
            const object = Leaflet.polygon(
               poly,
               { pane: this.paneName,
                  color: '#666666',
                  weight: 1,
                  opacity: 0.8,
                  fillOpacity: 0.5,
                  fillColor: '#ffffff',
                  interactive: false,
               }
            );
            object.addTo(this.map);
            objects.push(object);
         });
            this.tileDataList[tileIndex].objects = objects;
      }
   }

   findTileIndex(x: number, y: number, z: number): number {
      return this.tileDataList.findIndex(item => x === item.x && y === item.y && z === item.z);
   }

   clearTile(x: number, y: number, z: number): void {
      const tileIndex = this.findTileIndex(x, y, z);

      if (tileIndex >= 0) {
         for (const object of this.tileDataList[tileIndex].objects) {
            object.remove();
         }
         this.tileDataList[tileIndex].objects.length = 0;
         this.tileDataList.splice(tileIndex, 1);
      }
   }

   /*--------------*/

   getPoly(z: number, latitude: number, longitude: number, azimuth: number, beamwidth: number): LatLng[] {
      const numberOfDegrees = 10;
      const points = [];
      points.push(Leaflet.latLng(latitude, longitude));
      for (let i = 0; i * numberOfDegrees <= beamwidth; i++) {
         points.push(
         this.plotPoint(
            latitude,
            longitude,
            azimuth - beamwidth / 2 + i * numberOfDegrees,
            this.getSize(z)),
         );
      }
      points.push(Leaflet.latLng(latitude, longitude));
      return points;
   }

   /* CALCULATE A POINT AT A GIVEN BEARING AND DISTANCE */
   plotPoint(latitude: number, longitude: number, azimuth: number, distance: number): LatLng {
      const DEGREES_TO_RADIANS = Math.PI / 180.0;
      const EARTH_RADIUS = 6367447;
      const E = Math.E;
      const pi = Math.PI;

      const vLat  = latitude * DEGREES_TO_RADIANS;
      const vLong = longitude * DEGREES_TO_RADIANS;

      const R = EARTH_RADIUS / 1000 * (1 - E * E) / ((1 - E * E * (Math.sin(vLat) ^ 2)) ^ 1.5);

      const psi = distance / R;
      const phi = pi / 2 - vLat;

      const vBearing = azimuth * DEGREES_TO_RADIANS;

      const arccos = Math.cos(psi) * Math.cos(phi) + Math.sin(psi) * Math.sin(phi) * Math.cos(vBearing);
      const outLat = (pi / 2 - Math.acos(arccos)) / DEGREES_TO_RADIANS;

      const arcsin = Math.sin(vBearing) * Math.sin(psi) / Math.sin(phi);
      const outLong = (vLong + Math.asin(arcsin)) / DEGREES_TO_RADIANS;

      return Leaflet.latLng(outLat, outLong);
   }

   getSize(z: number): number {
      // there might be some fancy way to calculate these numbers but I'm going by "feel"
      switch (z) {
         case 10: return 0.5;
         case 11: return 0.4;
         case 12: return 0.3;
         case 13: return 0.2;
         case 14: return 0.125;
         case 15: return 0.06;
         case 16: return 0.03;
         case 17: return 0.018;
         case 18: return 0.012;
         case 19: return 0.008;
         case 20: return 0.004;
         case 21: return 0.002;
      }
      return 0.002;
   }
}