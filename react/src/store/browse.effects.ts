import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import type { TypedStartListening } from '@reduxjs/toolkit'

import { RootState, AppDispatch } from ".";
import { browseActions } from "./browse.slice";
import { fetchBrowsePerfData } from "../util/browse.service";
import { uiActions } from "./ui.slice";

const browseListener = createListenerMiddleware();

type typeListener = TypedStartListening<RootState, AppDispatch>;
const browseStartListening = browseListener.startListening as typeListener;

browseStartListening({
  // actionCreator: browseActions.setPageType,
  matcher: isAnyOf(
    browseActions.setPageType,
    browseActions.setPageNumber,
    browseActions.setPageSize,
    browseActions.setOrderBy,
  ),
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState().browse;
    if (state.status === 'loading') return;

    const originalState = listenerApi.getOriginalState().browse;

    if (state.status === 'init' || 
        state.type !== originalState.type ||
        (state.id && originalState.id || state.id != originalState.id) || 
        state.pageNumber !== originalState.pageNumber || 
        state.pageSize !== originalState.pageSize || 
        state.orderBy !== originalState.orderBy || 
        state.orderDir !== originalState.orderDir
    ) {
      listenerApi.dispatch(browseActions.setLoading());
      let response;
      try {
        response = await fetchBrowsePerfData({ 
          type: state.type,
          id: state.id,
          pageNumber: state.pageNumber, 
          pageSize: state.pageSize, 
          orderBy: state.orderBy, 
          orderDir: state.orderDir, 
          filterString: state.filterString,
        });
      } catch(error) {
        let message = 'Unknown Error';
        if (error instanceof Error) message = error.message;
        listenerApi.dispatch(uiActions.showMessage({type: 'error', message}));
        listenerApi.dispatch(browseActions.setError());
      }
      if (response) {
        listenerApi.dispatch(browseActions.setData(response));
      }
    }
  },
});

export default browseListener;