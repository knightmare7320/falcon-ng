import { createAction, props } from "@ngrx/store";

export const setPageSize = createAction(
   '[global] Set Page Size',
   props<{ page_size: number }>(),
);

export const setFilterString = createAction(
   '[global] Set Filter String',
   props<{ filter_string: string }>(),
);

export const setSort = createAction(
   '[global] Set Sort',
   props<{ order_by: string, order_dir: string }>(),
);