import * as fromApp from '../../store/app.reducer';
import * as fromRegions from '../regions/store/regions.reducer';

export interface State {
   regions: fromRegions.State;
   // oss: fromOss.State;
   // hosts: fromHosts.State;
}

export interface FeatureState extends fromApp.AppState {
   browse: State;
}

export const reducer = {
   regions: fromRegions.reducer,
   // oss: fromOss.reducer,
   // hosts: fromHosts.reducer,
}