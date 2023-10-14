import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl + '/geo';

export interface GeoSite {
   cascade_code: string,
   latitude: number,
   longitude: number,
}

export interface GeoSector{
   cascade_code: string,
   latitude: number,
   longitude: number,
   sector_number: number,
   azimuth: number,
   horizontal_bw: number,
}

@Injectable({ providedIn: 'root' })
export class GeoService {
   constructor(
      private httpClient: HttpClient
   ) {}

   getSites(X: number, Y: number, Z: number) {
      return this.httpClient.get<{X: number, Y: number, Z: number, rows?: GeoSite[]}>(
         `${API_URL}/sites/${Z}/${X}/${Y}`
      );
   }

   getSectors(X: number, Y: number, Z: number) {
      return this.httpClient.get<{X: number, Y: number, Z: number, rows?: GeoSector[]}>(
         `${API_URL}/sectors/${Z}/${X}/${Y}`
      );
   }
}