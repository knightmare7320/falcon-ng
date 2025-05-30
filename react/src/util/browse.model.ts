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
export type RegionGroupType = {
  regionId: number,
  regionName: string,
}
export type L4MarketGroupType = {
  l4MarketId: number,
  l4MarketName: string,
  regionId?: number,
}
export type L5MarketGroupType = {
  l5MarketId: number,
  l5MarketName: string,
  l4MarketId?: number,
}
export type OrgClusterGroupType = {
  orgClusterId: number,
  orgClusterName: string,
  l5MarketId?: number,
}