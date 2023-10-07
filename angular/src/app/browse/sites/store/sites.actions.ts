import { createAction, props } from "@ngrx/store";
import { SitePerf } from "./site.model";


export const fetchPerf = createAction(
   "[sites] Fetch Perf",
   props<{ group_type: string, group_id: string }>(),
);

export const setPerf = createAction(
   "[sites] Set Perf",
   props<{ group_type: string, group_name: string, group_id: string, parent_id: string, parent_name: string, total_row_count: number, rows: SitePerf[] }>(),
);

export const setPageNumber = createAction(
   '[sites] Set Page Number',
   props<{ page_number: number }>(),
);
