import { createAction, props } from "@ngrx/store";
import { RegionPerf } from "./regions.model";


export const fetchPerf = createAction(
   "[regions] Fetch Perf",
);

export const setPerf = createAction(
   "[regions] Set Perf",
   props<{ totalRows: number, rows: RegionPerf[] }> (),
);

export const setPageNumber = createAction(
   '[regions] Set Page Number',
   props<{ pageNumber: number }>(),
);
