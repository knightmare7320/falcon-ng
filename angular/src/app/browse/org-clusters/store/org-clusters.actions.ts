import { createAction, props } from "@ngrx/store";
import { OrgClusterPerf } from "./org-cluster.model";


export const fetchPerf = createAction(
   "[org clusters] Fetch Perf",
   props<{ l5_market_id: string }>(),
);

export const setPerf = createAction(
   "[org clusters] Set Perf",
   props<{ l4_market_id: string, l5_market_name: string, total_row_count: number, rows: OrgClusterPerf[] }>(),
);

export const setPageNumber = createAction(
   '[org clusters] Set Page Number',
   props<{ page_number: number }>(),
);
