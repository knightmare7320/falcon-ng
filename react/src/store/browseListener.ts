import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import type { TypedStartListening } from '@reduxjs/toolkit'

import store from ".";
import { browseActions } from "./browseSlice";
import { fetchBrowsePerfData } from "../util/http";

const browseListener = createListenerMiddleware();

type typeListener = TypedStartListening<typeof store.getState, typeof store.dispatch>;
const browseStartListening = browseListener.startListening as typeListener;

browseStartListening({
  // actionCreator: browseActions.setPageType,
  matcher: isAnyOf(
    browseActions.setPageType,
    browseActions.setPageNumber,
    browseActions.setPageSize,
    browseActions.setOrderBy,
  ),
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState().browse;
    if (state.status === 'loading') return;

    const originalState = listenerApi.getOriginalState().browse;

    if (state.status === 'init' || 
        state.type !== originalState.type ||
        (state.id | -1) !== (originalState.id | -1) || 
        state.page_number !== originalState.page_number || 
        state.page_size !== originalState.page_size || 
        state.order_by !== originalState.order_by || 
        state.order_dir !== originalState.order_dir
    ) {
      listenerApi.dispatch(browseActions.setLoading());
      const response = await fetchBrowsePerfData({ 
        type: state.type,
        id: state.id,
        page_number: state.page_number, 
        page_size: state.page_size, 
        order_by: state.order_by, 
        order_dir: state.order_dir, 
        filter_string: state.filter_string,
      });
      listenerApi.dispatch(browseActions.setData(response));
    }
  },
});

export default browseListener;