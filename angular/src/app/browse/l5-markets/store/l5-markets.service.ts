import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { L5MarketPerf } from './l5-markets.model';

const API_URL = environment.apiUrl + '/l5_markets';

@Injectable({ providedIn: 'root' })
export class L5MarketsService {
   constructor(
      private httpClient: HttpClient
   ) {}

   getPerf(l4_market_id: string, page_number = 1, page_size= 10, order_by = 'name', order_dir = 'asc', filter_string='') {
      const params = {
         page_number,
         page_size,
         order_by,
         order_dir,
         filter_string,
      }
      return this.httpClient
         .get<{region_id: string, l4_market_name: string, total_rows: number, rows: L5MarketPerf[]}>(
            `${API_URL}/perf/${l4_market_id}`, 
            { params },
         );
   }
}