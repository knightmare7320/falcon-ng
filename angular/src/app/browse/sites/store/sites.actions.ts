import { createAction, props } from "@ngrx/store";
import { SitePerf } from "./site.model";


export const fetchPerf = createAction(
   "[sites] Fetch Perf",
   props<{ group_type: string, group_id: string }>(),
);

export const setPerf = createAction(
   "[sites] Set Perf",
   props<{ total_row_count: number, rows: SitePerf[] }>(),
);

export const setPageNumber = createAction(
   '[sites] Set Page Number',
   props<{ page_number: number }>(),
);
