import * as fromAuth from "../auth/store/auth.reducer";
import * as fromMessages from "./messages/messages.reducer";
import * as fromGlobal from "./global/global.reducer";
import { Message } from './messages/message.model';

export interface AppState {
   global: fromGlobal.State;
   auth: fromAuth.State;
   messages: Message[];
}

export const reducers = {
   global: fromGlobal.reducer,
   auth: fromAuth.reducer,
   messages: fromMessages.reducer,
};