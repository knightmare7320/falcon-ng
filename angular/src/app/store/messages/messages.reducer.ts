import { createReducer, on } from '@ngrx/store';

import * as MessagesActions from './messages.actions';
import { Message } from './message.model';

const initialState: Message[] = [];

export const reducer = createReducer(
   initialState,
   on(
      MessagesActions.addMessage,
      (state: Message[], { messageString }) => {
         // remove any existing messages with the same text
         const newAddMessages = state.filter(
            value => value.message !== messageString
         );

         // add this new message to the front with a new timestamp
         const newMessage: Message = {
            message: messageString,
            timestamp: new Date(),
         };
         newAddMessages.unshift(newMessage);

         // this will have the affect of no duplicated messages but the most current timestamp being used
         return newAddMessages.slice(-10);
      }
   ),
   on(
      MessagesActions.removeMessage,
      (state: Message[], { messageId }) => {
         const newDeleteMessages = [...state];
         newDeleteMessages.splice(messageId, 1);
         return newDeleteMessages;
      }
   ),
   on(
      MessagesActions.clearMessages,
      () => [],
   ),
);