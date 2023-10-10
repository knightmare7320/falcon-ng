import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Site, Bts, Sector, Carrier } from './site.model';

const API_URL = environment.apiUrl + '/site';

@Injectable({ providedIn: 'root' })
export class SiteService {
   constructor(
      private httpClient: HttpClient
   ) {}

   getSite(cascade_code: string) {
      return this.httpClient.get<Site>(
         `${API_URL}/${cascade_code}`
      );
   }

   getBts(cascade_code: string) {
      return this.httpClient.get<Bts[]>(
         `${API_URL}/${cascade_code}/bts`
      );
   }

   getSectors(cascade_code: string) {
      return this.httpClient.get<Sector[]>(
         `${API_URL}/${cascade_code}/sectors`
      );
   }
   
   getCarriers(cascade_code: string) {
      return this.httpClient.get<Carrier[]>(
         `${API_URL}/${cascade_code}/carriers`
      );
   }
}