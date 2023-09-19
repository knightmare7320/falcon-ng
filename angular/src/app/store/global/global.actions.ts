import { createAction, props } from "@ngrx/store";

export const setPageSize = createAction(
   '[global] Set Page Size',
   props<{ pageSize: number }>(),
)