import { Site } from "./site.model";

export type SearchResultsType = {
  row_count: number,
  rows: Site[],
}