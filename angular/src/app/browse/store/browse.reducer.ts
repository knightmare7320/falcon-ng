import * as fromApp from '../../store/app.reducer';
import * as fromRegions from '../regions/store/regions.reducer';
import * as fromL4Markets from '../l4-markets/store/l4-markets.reducer';
import * as fromL5Markets from '../l5-markets/store/l5-markets.reducer';

export interface State {
   regions: fromRegions.State;
   l4Markets: fromL4Markets.State;
   l5Markets: fromL5Markets.State;
   engineeringClusters: null,
}

export interface FeatureState extends fromApp.AppState {
   browse: State;
}

export const reducer = {
   regions: fromRegions.reducer,
   l4Markets: fromL4Markets.reducer,
   l5Markets: fromL5Markets.reducer,
}