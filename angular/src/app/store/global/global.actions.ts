import { createAction, props } from "@ngrx/store";


export const setPageSize = createAction(
   '[global] Set Page Size',
   props<{ pageSize: number }>(),
);

export const setFilterString = createAction(
   '[global] Set Filter String',
   props<{ filterString: string }>(),
);

export const setSort = createAction(
   '[orch] Set Hosts Sort',
   props<{ orderBy: string, orderDir: string }>(),
);