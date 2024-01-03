import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { kpiRowType, kpiTableType } from "../util/http";

export interface browseType {
  status: string,
  type: string,
  id: string | number | null,
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

const INITIAL_STATE: browseType = {
  status: 'init',
  type: 'national',
  id: null,
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
    setLoading(state:browseType) {
      state.status = 'loading';
    },
    setError(state:browseType) {
      state.status = 'error';
    },
    setPageType(state:browseType, action:PayloadAction<{type: string, id: string | number | null}>) {
      if (state.type !== action.payload.type) {
        state.page_number = 1;
      }
      state.type = action.payload.type;
      state.id = action.payload.id;
    },
    setPageNumber(state:browseType, action:PayloadAction<number>) {
      state.page_number = action.payload;
    },
    setPageSize(state:browseType, action:PayloadAction<number>) {
      state.page_size = action.payload;
    },
    setOrderBy(state:browseType, action:PayloadAction<{order_by: string, order_dir: string}>) {
      state.order_by = action.payload.order_by;
      state.order_dir = action.payload.order_dir;
    },
    setFilterString(state:browseType, action:PayloadAction<string>) {
      state.filter_string = action.payload;
    },
    setData(state:browseType, action:PayloadAction<kpiTableType>) {
      state.status = 'ok';
      state.row_count = action.payload.row_count;
      state.rows = action.payload.rows;
      state.id = action.payload.id || null;
      state.name = action.payload.name || '';
      state.page_count = Math.ceil(action.payload.row_count / state.page_size) | 1;
    },
  }
});

export const browseActions = browseSlice.actions;
export default browseSlice.reducer;