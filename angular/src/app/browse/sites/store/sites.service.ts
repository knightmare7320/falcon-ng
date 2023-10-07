import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { SitePerf } from './site.model';

const API_URL = environment.apiUrl + '/sites';

@Injectable({ providedIn: 'root' })
export class SitesService {
   constructor(
      private httpClient: HttpClient
   ) {}

   getPerf(group_type: string, group_id: string, page_number = 1, page_size= 10, order_by = 'name', order_dir = 'asc', filter_string='') {
      const params = {
         group_type,
         group_id,
         page_number,
         page_size,
         order_by,
         order_dir,
         filter_string,
      }
      return this.httpClient
         .get<{group_type: string, group_id: string, group_name: string, parent_id: string, parent_name: string, total_row_count: number, rows: SitePerf[]}>(
            `${API_URL}/perf`, 
            { params },
         );
   }
}