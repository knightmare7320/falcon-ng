import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchResultsType } from "../util/search.model";
import { Site } from "../util/site.model";

export type SearchState = {
  status: string,
  searchString: string,
  totalRowCount: number,
  rows: Site[],
  pageSize: number,
  pageNumber: number,
  pageCount: number,
  pageSizes: Array<number>,
}

const INITIAL_STATE = {
  status: 'ok',
  searchString: '',
  totalRowCount: 0,
  rows: [] as Site[],
  pageSize: 7,
  pageNumber: 1,
  pageCount: 0,
  pageSizes: [7, 15, 30],
}


const searchSlice = createSlice({
  name: 'browse',
  initialState: INITIAL_STATE,
  reducers: {
    clearSearch(state:SearchState) {
      state.status = 'ok';
      state.searchString = '';
      state.totalRowCount = 0;
      state.rows = [];
      state.pageCount = 0;
      state.pageNumber = 1;
    },
    setSearchString(state:SearchState, action:PayloadAction<string>) {
      state.status = 'loading';
      state.searchString = action.payload;
      state.totalRowCount = 0;
      state.rows = [];
      state.pageCount = 0;
      state.pageNumber = 1;
    },
    setPageNumber(state:SearchState, action:PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
    setPageSize(state:SearchState, action:PayloadAction<number>) {
      const pageSize = action.payload;
      const pageCount = Math.ceil(state.totalRowCount / pageSize)

      state.pageSize = pageSize;
      state.pageCount = pageCount;
      if (state.pageNumber > pageCount) {
        state.pageNumber = pageCount;
      }
    },
    setSearchResults(state:SearchState, action:PayloadAction<SearchResultsType>) {
      state.status = 'ok';
      state.totalRowCount = action.payload.totalRowCount;
      state.rows = action.payload.rows;
      state.pageCount = Math.ceil(action.payload.totalRowCount / state.pageSize);
    },
  }
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;