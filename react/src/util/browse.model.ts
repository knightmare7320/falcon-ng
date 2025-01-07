export type tableRequestType = {
  // signal: AbortSignal,
  type: string,
  id?: number,
  pageNumber?: number,
  pageSize?: number,
  orderBy?: string,
  orderDir?: string,
  filterString?: string,
}

export type kpiRowType = {
  id: number,
  name: string,
  description?: string,
  setupAttempts: number;
  accessFailures: number,
  equipmentBlocks: number,
  successfulCalls: number,
  primaryDrops: number,
  primaryErlangs: number,
}

export type kpiTableType = {
  id?: number,
  name?: string,
  parentId?: number,
  parentName?: string,
  totalRowCount: number,
  rows: kpiRowType[],
}

export type GroupType = {
  id: number,
  name: string,
  parentId?: number,
}