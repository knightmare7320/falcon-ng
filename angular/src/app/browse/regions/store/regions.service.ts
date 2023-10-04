import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { RegionPerf } from './regions.model';

const API_URL = environment.apiUrl + '/regions';

@Injectable({ providedIn: 'root' })
export class RegionsService {
   constructor(
      private httpClient: HttpClient
   ) {}

   getRegionPerf(pageNumber = 1, pageSize= 10, orderBy = 'name', orderDir = 'asc', filterString='') {
      const params = {
         page_number: pageNumber,
         page_size: pageSize,
         order_by: orderBy,
         order_dir: orderDir,
         filter_string: filterString,
      }
      return this.httpClient
         .get<{total_rows: number, rows: RegionPerf[]}>(
            `${API_URL}/perf`, 
            { params },
         );
   }
}