import { createAction, props } from "@ngrx/store";
import { RegionPerf } from "./regions.model";


export const fetchPerf = createAction(
   "[regions] Fetch Perf",
);

export const setPerf = createAction(
   "[regions] Set Perf",
   props<{ total_row_count: number, rows: RegionPerf[] }> (),
);

export const setPageNumber = createAction(
   '[regions] Set Page Number',
   props<{ page_number: number }>(),
);
