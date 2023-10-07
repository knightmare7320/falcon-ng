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

   getPerf(page_number = 1, page_size= 10, order_by = 'name', order_dir = 'asc', filter_string='') {
      const params = {
         page_number,
         page_size,
         order_by,
         order_dir,
         filter_string,
      }
      return this.httpClient
         .get<{parent_id: string, parent_name: string, group_id: string, group_name: string, total_row_count: number, rows: RegionPerf[]}>(
            `${API_URL}/perf`, 
            { params },
         );
   }
}