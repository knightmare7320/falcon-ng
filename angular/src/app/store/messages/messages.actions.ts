import { createAction, props } from '@ngrx/store';

export const addMessage = createAction(
   '[messages] ADD_MESSAGE',
   props<{ messageString: string }>(),
);

export const removeMessage = createAction(
   '[messages] REMOVE_MESSAGE',
   props<{ messageId: number }>(),
);

export const clearMessages = createAction(
   '[messages] CLEAR_ALL',
);