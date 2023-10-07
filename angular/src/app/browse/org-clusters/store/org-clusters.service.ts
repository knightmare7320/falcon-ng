import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { OrgClusterPerf } from './org-cluster.model';

const API_URL = environment.apiUrl + '/org_clusters';

@Injectable({ providedIn: 'root' })
export class OrgClustersService {
   constructor(
      private httpClient: HttpClient
   ) {}

   getPerf(l5_market_id: string, page_number = 1, page_size= 10, order_by = 'name', order_dir = 'asc', filter_string='') {
      const params = {
         page_number,
         page_size,
         order_by,
         order_dir,
         filter_string,
      }
      return this.httpClient
         .get<{parent_id: string, parent_name: string, group_id: string, group_name: string, total_row_count: number, rows: OrgClusterPerf[]}>(
            `${API_URL}/perf/${l5_market_id}`, 
            { params },
         );
   }
}