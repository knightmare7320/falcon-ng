import { createAction, props } from "@ngrx/store";
import { L5MarketPerf } from "./l5-markets.model";


export const fetchPerf = createAction(
   "[l5 markets] Fetch Perf",
   props<{ l4_market_id: string }>(),
);

export const setPerf = createAction(
   "[l5 markets] Set Perf",
   props<{ region_id: string, l4_market_name: string, total_row_count: number, rows: L5MarketPerf[] }>(),
);

export const setPageNumber = createAction(
   '[l5 markets] Set Page Number',
   props<{ page_number: number }>(),
);
