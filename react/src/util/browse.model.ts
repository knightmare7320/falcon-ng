export type tableRequestType = {
  // signal: AbortSignal,
  type: string,
  id?: number,
  page_number?: number,
  page_size?: number,
  order_by?: string,
  order_dir?: string,
  filter_string?: string,
}

export type kpiRowType = {
  id: number,
  name: string,
  description?: string,
  setup_attempts: number;
  access_failures: number,
  equipment_blocks: number,
  successful_calls: number,
  primary_drops: number,
  primary_erlangs: number,
}

export type kpiTableType = {
  id?: number,
  name?: string,
  parent_id?: number,
  parent_name?: string,
  row_count: number,
  rows: kpiRowType[],
}

export type GroupType = {
  id: number,
  name: string,
  parent_id?: number,
}