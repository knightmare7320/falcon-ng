import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { kpiRowType, kpiTableType } from "../util/browse.model";

export type BrowseState = {
  status: string,
  type: string,
  id?: number,
  name: string,
  row_count: number,
  rows: Array<kpiRowType>,
  page_size: number,
  page_number: number,
  page_count: number,
  order_by: string,
  order_dir: string,
  page_sizes: Array<number>,
  filter_string: string,
}

const INITIAL_STATE: BrowseState = {
  status: 'init',
  type: 'national',
  name: '',
  row_count: 0,
  rows: [] as kpiRowType[],
  page_size: 7,
  page_number: 1,
  page_count: 0,
  order_by: 'name',
  order_dir: 'ASC',
  page_sizes: [7, 15, 30],
  filter_string: '',
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
        state.page_number = 1;
      }
      state.type = action.payload.type;
      state.id = action.payload.id;
    },
    setPageNumber(state:BrowseState, action:PayloadAction<number>) {
      state.page_number = action.payload;
    },
    setPageSize(state:BrowseState, action:PayloadAction<number>) {
      const page_size = action.payload;
      const page_count = Math.ceil(state.row_count / page_size)

      state.page_size = page_size;
      state.page_count = page_count;
      // TODO: this just makes sure we have a valid page, 
      //       would rather recalculate to stay near the current data
      //       calculated using previous and current page size
      if (state.page_number > page_count) {
        state.page_number = page_count;
      }
    },
    setOrderBy(state:BrowseState, action:PayloadAction<{order_by: string, order_dir: string}>) {
      state.order_by = action.payload.order_by;
      state.order_dir = action.payload.order_dir;
    },
    setFilterString(state:BrowseState, action:PayloadAction<string>) {
      state.filter_string = action.payload;
    },
    setData(state:BrowseState, action:PayloadAction<kpiTableType>) {
      state.status = 'ok';
      state.row_count = action.payload.row_count;
      state.rows = action.payload.rows;
      state.id = action.payload.id || undefined;
      state.name = action.payload.name || '';
      state.page_count = Math.ceil(action.payload.row_count / state.page_size);
    },
  }
});

export const browseActions = browseSlice.actions;
export default browseSlice.reducer;