import { createAction, props } from "@ngrx/store";
import { L4MarketPerf } from "./l4-market.model";


export const fetchPerf = createAction(
   "[l4 markets] Fetch Perf",
   props<{ region_id: string }>(),
);

export const setPerf = createAction(
   "[l4 markets] Set Perf",
   props<{ group_id: string, group_name: string, total_row_count: number, rows: L4MarketPerf[] }>(),
);

export const setPageNumber = createAction(
   '[l4 markets] Set Page Number',
   props<{ page_number: number }>(),
);
