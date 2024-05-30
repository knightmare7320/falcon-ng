import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Site } from "../util/site.model"

export type SearchState = {
  status: string,
  search_string: string,
  sites: Site[],
  page_size: number,
  page_number: number,
  page_count: number,
  page_sizes: Array<number>,
}

const INITIAL_STATE = {
  status: 'ok',
  search_string: '',
  sites: {} as Site[],
  page_size: 7,
  page_number: 1,
  page_count: 0,
  page_sizes: [7, 15, 30],
}


const searchSlice = createSlice({
  name: 'browse',
  initialState: INITIAL_STATE,
  reducers: {
    setSearchString(state:SearchState) {
      state.status = 'loading';
    },
  }
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;