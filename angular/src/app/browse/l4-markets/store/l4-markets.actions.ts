import { createAction, props } from "@ngrx/store";
import { L4MarketPerf } from "./l4-markets.model";


export const fetchPerf = createAction(
   "[l4 markets] Fetch Perf",
   props<{ regionId: string }>(),
);

export const setPerf = createAction(
   "[l4 markets] Set Perf",
   props<{ regionName: string, totalRows: number, rows: L4MarketPerf[] }>(),
);

export const setPageNumber = createAction(
   '[l4 markets] Set Page Number',
   props<{ pageNumber: number }>(),
);
