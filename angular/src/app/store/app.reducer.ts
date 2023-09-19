import * as fromAuth from "../auth/store/auth.reducer";
import * as fromMessages from "./messages/messages.reducer";
import * as fromGlobal from "./global/global.reducer";
import { Message } from './messages/message.model';

export interface AppState {
   auth: fromAuth.State;
   messages: Message[];
   global: fromGlobal.State;
}

export const reducers = {
   auth: fromAuth.reducer,
   messages: fromMessages.reducer,
   global: fromGlobal.reducer,
};