import { Site } from "./site.model";

export type SearchResultsType = {
  totalRowCount: number,
  rows: Site[],
}