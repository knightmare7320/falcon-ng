import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import type { TypedStartListening } from '@reduxjs/toolkit'

import {RootState, AppDispatch} from ".";
import { browseActions } from "./browseSlice";
import { fetchBrowsePerfData } from "../util/browse.service";
import { uiActions } from "./uiSlice";

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
    listenerApi.cancelActiveListeners();

    const state = listenerApi.getState().browse;
    if (state.status === 'loading') return;

    const originalState = listenerApi.getOriginalState().browse;

    if (state.status === 'init' || 
        state.type !== originalState.type ||
        (state.id && originalState.id || state.id != originalState.id) || 
        state.page_number !== originalState.page_number || 
        state.page_size !== originalState.page_size || 
        state.order_by !== originalState.order_by || 
        state.order_dir !== originalState.order_dir
    ) {
      listenerApi.dispatch(browseActions.setLoading());
      let response;
      try {
        response = await fetchBrowsePerfData({ 
          type: state.type,
          id: state.id,
          page_number: state.page_number, 
          page_size: state.page_size, 
          order_by: state.order_by, 
          order_dir: state.order_dir, 
          filter_string: state.filter_string,
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