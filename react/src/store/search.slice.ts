import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchResultsType } from "../util/search.model";
import { Site } from "../util/site.model";

export type SearchState = {
  status: string,
  search_string: string,
  row_count: number,
  rows: Site[],
  page_size: number,
  page_number: number,
  page_count: number,
  page_sizes: Array<number>,
}

const INITIAL_STATE = {
  status: 'ok',
  search_string: '',
  row_count: 0,
  rows: [] as Site[],
  page_size: 7,
  page_number: 1,
  page_count: 0,
  page_sizes: [7, 15, 30],
}


const searchSlice = createSlice({
  name: 'browse',
  initialState: INITIAL_STATE,
  reducers: {
    clearSearch(state:SearchState) {
      state.status = 'ok';
      state.search_string = '';
      state.row_count = 0;
      state.rows = [];
      state.page_count = 0;
      state.page_number = 1;
    },
    setSearchString(state:SearchState, action:PayloadAction<string>) {
      state.status = 'loading';
      state.search_string = action.payload;
    },
    setPageNumber(state:SearchState, action:PayloadAction<number>) {
      state.page_number = action.payload;
    },
    setPageSize(state:SearchState, action:PayloadAction<number>) {
      const page_size = action.payload;
      const page_count = Math.ceil(state.row_count / page_size)

      state.page_size = page_size;
      state.page_count = page_count;
      if (state.page_number > page_count) {
        state.page_number = page_count;
      }
    },
    setSearchResults(state:SearchState, action:PayloadAction<SearchResultsType>) {
      state.status = 'ok';
      state.row_count = action.payload.row_count;
      state.rows = action.payload.rows;
      state.page_count = Math.ceil(action.payload.row_count / state.page_size);
    },
  }
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;