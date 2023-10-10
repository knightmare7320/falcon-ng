import { createAction, props } from "@ngrx/store";
import { Site, Bts, Sector, Carrier } from "./site.model";


export const fetchSite = createAction(
   "[site] Fetch Site",
   props<{ cascade_code: string }>(),
);
export const setSite = createAction(
   "[site] Set Site",
   props<{site: Site}>(),
);

export const fetchBts = createAction(
   "[site] Fetch Bts",
   props<{ cascade_code: string }>(),
);
export const setBts = createAction(
   "[site] Set Bts",
   props<{bts: Bts[]}>(),
);

export const fetchSectors = createAction(
   "[site] Fetch Sectors",
   props<{ cascade_code: string }>(),
);
export const setSectors = createAction(
   "[site] Set Sectors",
   props<{sectors: Sector[]}>(),
);

export const fetchCarriers = createAction(
   "[site] Fetch Carriers",
   props<{ cascade_code: string }>(),
);
export const setCarriers = createAction(
   "[site] Set Carriers",
   props<{carriers: Carrier[]}>(),
);
