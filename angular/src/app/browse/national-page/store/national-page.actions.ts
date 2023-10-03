import { createAction, props } from "@ngrx/store";
import { RegionPerf } from "./national-page.model";

export const fetchRegionPerf = createAction(
   "[national page] Fetch Region Perf",
);
export const setRegionPerf = createAction(
   "[national page] Set Region Perf",
   props<{ totalRows: number, rows: RegionPerf[] }> (),
);

export const setFilterString = createAction(
   '[orch] Set Filter String',
   props<{ filterString: string }>(),
)
export const setPageNumber = createAction(
   '[orch] Set Hosts Page Number',
   props<{ pageNumber: number }>(),
);
export const setSort = createAction(
   '[orch] Set Hosts Sort',
   props<{ orderBy: string, orderDir: string }>(),
);
