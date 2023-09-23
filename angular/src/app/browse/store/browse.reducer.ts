import * as fromApp from '../../store/app.reducer';
// import * as fromServers from '../servers/store/servers.reducer';

export interface State {
   // servers: fromServers.State;
   // oss: fromOss.State;
   // hosts: fromHosts.State;
}

export interface FeatureState extends fromApp.AppState {
   browse: State;
}

export const reducer = {
   // servers: fromServers.reducer,
   // oss: fromOss.reducer,
   // hosts: fromHosts.reducer,
}