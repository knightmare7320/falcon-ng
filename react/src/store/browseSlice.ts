import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { kpiRowType, kpiTableType } from "../util/browse.model";

export type BrowseType = {
  status: string,
  type: string,
  id: string | number,
  name: string,
  row_count: number,
  rows: Array<kpiRowType>,
  page_number: number,
  page_count: number,
  page_size: number,
  order_by: string,
  order_dir: string,
  page_sizes: Array<number>,
  filter_string: string,
}

const INITIAL_STATE: BrowseType = {
  status: 'init',
  type: 'national',
  id: '',
  name: '',
  row_count: 0,
  rows: [],
  page_number: 1,
  page_count: 0,
  page_size: 7,
  order_by: 'name',
  order_dir: 'ASC',
  page_sizes: [7, 15, 30],
  filter_string: '',
}


const browseSlice = createSlice({
  name: 'browse',
  initialState: INITIAL_STATE,
  reducers: {
    setLoading(state:BrowseType) {
      state.status = 'loading';
    },
    setError(state:BrowseType) {
      state.status = 'error';
    },
    setPageType(state:BrowseType, action:PayloadAction<{type: string, id: string | number}>) {
      if (state.type !== action.payload.type) {
        state.page_number = 1;
      }
      state.type = action.payload.type;
      state.id = action.payload.id;
    },
    setPageNumber(state:BrowseType, action:PayloadAction<number>) {
      state.page_number = action.payload;
    },
    setPageSize(state:BrowseType, action:PayloadAction<number>) {
      state.page_size = action.payload;
    },
    setOrderBy(state:BrowseType, action:PayloadAction<{order_by: string, order_dir: string}>) {
      state.order_by = action.payload.order_by;
      state.order_dir = action.payload.order_dir;
    },
    setFilterString(state:BrowseType, action:PayloadAction<string>) {
      state.filter_string = action.payload;
    },
    setData(state:BrowseType, action:PayloadAction<kpiTableType>) {
      state.status = 'ok';
      state.row_count = action.payload.row_count;
      state.rows = action.payload.rows;
      state.id = action.payload.id || '';
      state.name = action.payload.name || '';
      state.page_count = Math.ceil(action.payload.row_count / state.page_size) | 1;
    },
  }
});

export const browseActions = browseSlice.actions;
export default browseSlice.reducer;