import { createAction, props } from "@ngrx/store";
import { RegionPerf } from "./regions.model";


export const fetchRegionPerf = createAction(
   "[national page] Fetch Region Perf",
);

export const setRegionPerf = createAction(
   "[national page] Set Region Perf",
   props<{ totalRows: number, rows: RegionPerf[] }> (),
);

export const setPageNumber = createAction(
   '[orch] Set Hosts Page Number',
   props<{ pageNumber: number }>(),
);
