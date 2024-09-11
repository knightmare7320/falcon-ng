import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import type { PayloadAction, TypedStartListening } from '@reduxjs/toolkit';

import {RootState, AppDispatch} from ".";
import { uiActions } from "./ui.slice";
import { searchActions } from "./search.slice";
import { fetchSearchData } from "../util/search.service";

type typeListener = TypedStartListening<RootState, AppDispatch>;

const searchListener = createListenerMiddleware();
const searchStartListening = searchListener.startListening as typeListener;


searchStartListening({
  // actionCreator: searchActions.setSearchString,
  matcher: isAnyOf(
    searchActions.setSearchString,
    searchActions.setPageNumber,
    searchActions.setPageSize,
  ),
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState().search;

    let response;
    try {
      response = await fetchSearchData({
        searchString: state.searchString,
        pageNumber: state.pageNumber, 
        pageSize: state.pageSize, 
      });
    } catch(error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      listenerApi.dispatch(uiActions.showMessage({type: 'error', message}));
      // listenerApi.dispatch(siteActions.setError());
      return;
    }

    listenerApi.dispatch(searchActions.setSearchResults(response));
  },
});


export default searchListener;