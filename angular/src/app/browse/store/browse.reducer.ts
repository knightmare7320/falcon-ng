import * as fromApp from '../../store/app.reducer';
import * as fromNationalPage from '../national-page/store/national-page.reducer';

export interface State {
   nationalPage: fromNationalPage.State;
   // oss: fromOss.State;
   // hosts: fromHosts.State;
}

export interface FeatureState extends fromApp.AppState {
   browse: State;
}

export const reducer = {
   nationalPage: fromNationalPage.reducer,
   // oss: fromOss.reducer,
   // hosts: fromHosts.reducer,
}