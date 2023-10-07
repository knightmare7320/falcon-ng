import { createAction, props } from "@ngrx/store";
import { OrgClusterPerf } from "./org-cluster.model";


export const fetchPerf = createAction(
   "[org clusters] Fetch Perf",
   props<{ l5_market_id: string }>(),
);

export const setPerf = createAction(
   "[org clusters] Set Perf",
   props<{ parent_id: string, parent_name: string, group_id: string, group_name: string, total_row_count: number, rows: OrgClusterPerf[] }>(),
);

export const setPageNumber = createAction(
   '[org clusters] Set Page Number',
   props<{ page_number: number }>(),
);
