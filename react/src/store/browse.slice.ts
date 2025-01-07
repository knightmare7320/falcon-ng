import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { kpiRowType, kpiTableType } from "../util/browse.model";

export type BrowseState = {
  status: string,
  type: string,
  id?: number,
  name: string,
  totalRowCount: number,
  rows: Array<kpiRowType>,
  pageSize: number,
  pageNumber: number,
  pageCount: number,
  orderBy: string,
  orderDir: string,
  pageSizes: Array<number>,
  filterString: string,
}

const INITIAL_STATE: BrowseState = {
  status: 'init',
  type: 'national',
  name: '',
  totalRowCount: 0,
  rows: [] as kpiRowType[],
  pageSize: 7,
  pageNumber: 1,
  pageCount: 0,
  orderBy: 'name',
  orderDir: 'ASC',
  pageSizes: [7, 15, 30],
  filterString: '',
}


const browseSlice = createSlice({
  name: 'browse',
  initialState: INITIAL_STATE,
  reducers: {
    setLoading(state:BrowseState) {
      state.status = 'loading';
    },
    setError(state:BrowseState) {
      state.status = 'error';
    },
    setPageType(state:BrowseState, action:PayloadAction<{type: string, id?: number}>) {
      if (state.type !== action.payload.type) {
        state.pageNumber = 1;
      }
      state.type = action.payload.type;
      state.id = action.payload.id;
    },
    setPageNumber(state:BrowseState, action:PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
    setPageSize(state:BrowseState, action:PayloadAction<number>) {
      const pageSize = action.payload;
      const pageCount = Math.ceil(state.totalRowCount / pageSize)

      state.pageSize = pageSize;
      state.pageCount = pageCount;
      // TODO: this just makes sure we have a valid page, 
      //       would rather recalculate to stay near the current data
      //       calculated using previous and current page size
      if (state.pageNumber > pageCount) {
        state.pageNumber = pageCount;
      }
    },
    setOrderBy(state:BrowseState, action:PayloadAction<{orderBy: string, orderDir: string}>) {
      state.orderBy = action.payload.orderBy;
      state.orderDir = action.payload.orderDir;
    },
    setFilterString(state:BrowseState, action:PayloadAction<string>) {
      state.filterString = action.payload;
    },
    setData(state:BrowseState, action:PayloadAction<kpiTableType>) {
      state.status = 'ok';
      state.totalRowCount = action.payload.totalRowCount;
      state.rows = action.payload.rows;
      state.id = action.payload.id || undefined;
      state.name = action.payload.name || '';
      state.pageCount = Math.ceil(action.payload.totalRowCount / state.pageSize);
    },
  }
});

export const browseActions = browseSlice.actions;
export default browseSlice.reducer;