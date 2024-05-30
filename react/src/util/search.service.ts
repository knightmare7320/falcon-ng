import { SearchResultsType } from "./search.model";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export async function fetchSearchData({ 
  search_string = '',
  page_number   = 1, 
  page_size     = 10, 
}):Promise<SearchResultsType> {

  let url = API_URL + '/search?';

  let params = {
    q: search_string,
    page_number: page_number.toString(),
    page_size: page_size.toString(),
  };

  const response = await fetch(url + new URLSearchParams(params));

  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }

  return await response.json();
}